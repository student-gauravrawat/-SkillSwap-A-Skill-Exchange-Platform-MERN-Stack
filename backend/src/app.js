import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import errorHandler from "./middlewares/error.middleware.js"

const app = express()

app.use(helmet({
    crossOriginResourcePolicy: {policy: "cross-origin"}
}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"})); //* for sending data by form
app.use(express.urlencoded({extended: true, limit: "16kb"})); //* for sending data by URL
app.use(express.static("public"));
app.use(cookieParser());


//? routes import
import userRouter from "./routes/user.route.js";
import offerSkillRouter from "./routes/offerskill.route.js";
import learningSkillRouter from "./routes/learnskill.route.js";  
import messageRouter from "./routes/message.route.js";


//? routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/offerskills", offerSkillRouter)
app.use("/api/v1/learningskills", learningSkillRouter)
app.use("/api/v1/messages", messageRouter)


//* http://localhost:5000/api/v1/users/register

app.use(errorHandler)
export {app}