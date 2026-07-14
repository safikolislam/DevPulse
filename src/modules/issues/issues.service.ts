import type { IIssue, TIssueType } from "./issues.interface";
import { pool } from "../../db";





export const createIssueIntoDB = async (payload:IIssue)=>{
    const {title,description,type,reporter_id} = payload;
     const result = await pool.query(
       `
       INSERT INTO issues (title,description,type,reporter_id)

       VALUES ($1, $2, $3, $4) RETURNING *
       
       
       
       `,
       [title,description,type,reporter_id]


     );
     return result.rows[0]


}


export const getAllIssueFromDB = async (query:{
  sort?:string;
  type?:string;
  status?:string;
}) =>{
  const {sort = "newest" ,type,status} = query;

  const conditions:string[] = [];
  const params:any[] = [];
  if(type){
    params.push(type);
    conditions.push(`type = $${params.length}`)
  }

  if(status){
    params.push(status);
    conditions.push(`status = $${params.length}`)
  }

  let whereClause = "";
  if (conditions.length > 0) {
    whereClause = "WHERE " + conditions.join(" AND ");
  }

  let orderClause = "ORDER BY created_at DESC";
  if (sort === "oldest") {
    orderClause = "ORDER BY created_at ASC";
  }

  const issuesResult = await pool.query(
    `SELECT * FROM issues ${whereClause} ${orderClause}`,
    params
  );

  const issues = issuesResult.rows;

  if (issues.length === 0) {
    return [];
  }

  
  const reporterIds: number[] = [];
  for (const issue of issues) {
    if (!reporterIds.includes(issue.reporter_id)) {
      reporterIds.push(issue.reporter_id);
    }
  }

  const reportersResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1::int[])`,
    [reporterIds]
  );

  const reporters = reportersResult.rows;

 
  const finalData = [];

  for (const issue of issues) {
    let matchedReporter = null;

    for (const reporter of reporters) {
      if (reporter.id === issue.reporter_id) {
        matchedReporter = {
          id: reporter.id,
          name: reporter.name,
          role: reporter.role,
        };
        break;
      }
    }

    finalData.push({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: matchedReporter,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    });
  }

  return finalData;

  
} 




export const getSingleIssueFromDB = async (id: number) => {
  const issueResult = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    const error = new Error("Issue not found!") as any;
    error.statusCode = 404;
    throw error;
  }

  const reporterResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id]
  );

  const reporter = reporterResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: {
      id: reporter.id,
      name: reporter.name,
      role: reporter.role,
    },
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};





export const updateIssueIntoDB = async (
  id: number,
  payload: Partial<Pick<IIssue, "title" | "description" | "type">>,
  requestUser: { id: number; role: string }
) => {
  const issueResult = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );

  const issue: IIssue = issueResult.rows[0];

  if (!issue) {
    const error = new Error("Issue not found!") as any;
    error.statusCode = 404;
    throw error;
  }

  const isMaintainer = requestUser.role === "maintainer";
  const isOwner = issue.reporter_id === requestUser.id;

  if (!isMaintainer) {
    if (!isOwner) {
      const error = new Error("You are not allowed to update this issue!") as any;
      error.statusCode = 403;
      throw error;
    }

    if (issue.status !== "open") {
      const error = new Error("You can only update issues that are still open!") as any;
      error.statusCode = 403;
      throw error;
    }
  }

  const title = payload.title !== undefined ? payload.title : issue.title;
  const description = payload.description !== undefined ? payload.description : issue.description;
  const type: TIssueType = payload.type !== undefined ? payload.type : issue.type;

  let status = issue.status;
  if (status === "open") {
    status = "in_progress";
  }

  const updateResult = await pool.query(
    `
    UPDATE issues
    SET title = $1, description = $2, type = $3, status = $4, updated_at = NOW()
    WHERE id = $5
    RETURNING *
    `,
    [title, description, type, status, id]
  );

  return updateResult.rows[0];
};



export const deleteIssueFromDB = async (
  id: number,
  requestUser: { id: number; role: string }
) => {
  const issueResult = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    const error = new Error("Issue not found!") as any;
    error.statusCode = 404;
    throw error;
  }

  if (requestUser.role !== "maintainer") {
    const error = new Error("Only maintainers can delete issues!") as any;
    error.statusCode = 403;
    throw error;
  }

  await pool.query(`DELETE FROM issues WHERE id = $1`, [id]);

  return null;
};