import express from "express"
import { config } from 'dotenv';
import userRoute from "./routes/user.js"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

config()
console.log(`Environment Port: ${process.env.PORT}`);
const app = express()
const PORT = process.env.PORT 
app.use(helmet())
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests, please try again later.'
  });
  

  app.use(limiter);

app.use("/api/user/", userRoute)

app.listen(PORT , () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

export default app