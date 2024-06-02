import express from 'express';
import produtoRoutes from "./produtoRoutes";
import clienteRoutes from "./clienteRoutes";
import faturaRoutes from "./faturaRoutes";
import pagamentoRoutes from "./pagamentoRoutes";
import {cors} from "./cors";

const app = express();
app.use(express.json());
app.use(cors)
app.use('/api/produto', produtoRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/fatura', faturaRoutes);
app.use('/api/pagamento', pagamentoRoutes);

export default app;