import express from 'express';
import produtoRoutes from "./produtoRoutes";

const app = express();
app.use(express.json());

app.use('/api/produto', produtoRoutes);

export default app;