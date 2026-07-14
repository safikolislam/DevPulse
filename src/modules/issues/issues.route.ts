import express from "express"
import auth from "../../middleware/auth.middleware";


const router  = express.Router();


router.post("/",auth(),)





export const issueRoutes = router;