import express from 'express';
import cors from 'cors';
import experienceRoutes from './routes/experiences.js'
import projectRoutes from './routes/projects.js'
import usersRoutes from './routes/users.js'

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/experiences", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", usersRoutes);

app.get("/", (_req, res) => {
    res.send("Portolio Server Started Successfully")
})

app.listen(PORT, () => {
    console.log(`Portfolio Server Started Successfully at http://localhost:${PORT}`)
})