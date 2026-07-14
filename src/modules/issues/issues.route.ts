import express from "express"
import auth from "../../middleware/auth.middleware";
import { issueController } from "./issues.controller";


const router  = express.Router();


router.post("/",auth(),issueController.createIssue)

router.get("/", issueController.getAllIssues);

router.get("/:id",issueController.getSingleIssue)

router.patch("/:id",auth(),issueController.updateIssue)
router.delete("/:id", auth(), issueController.deleteIssue);
export const issueRoutes = router;