import express from "express"
import auth from "../../middleware/auth.middleware";
import { issueController } from "./issues.controller";


const router  = express.Router();


router.post("/",auth(),issueController.createIssue)





export const issueRoutes = router;