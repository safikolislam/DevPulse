import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/users/users.route";
import { authRoutes } from "./modules/auth/auth.route";
import errorHandler from "./utils/errorHandler";
import { issueRoutes } from "./modules/issues/issues.route";
const app:Application = express()
app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    success: true,
    message:"Express Moduler Server Ready!",
    author : "safikol"
  })
})

app.use("/api/auth",userRoute);
app.use("/api/auth",authRoutes);

app.use("/api/issues",issueRoutes)


app.use(errorHandler)

export default app;
