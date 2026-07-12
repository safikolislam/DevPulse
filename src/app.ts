import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/auth/users.route";
const app:Application = express()
app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    success: true,
    message:"Express Moduler Server Ready!",
    author : "safikol"
  })
})

app.use("/api/auth",userRoute)

export default app;
