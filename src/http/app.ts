import express from 'express';
import produtoRoutes from "./produtoRoutes";
import clienteRoutes from "./clienteRoutes";
import faturaRoutes from "./faturaRoutes";
import pagamentoRoutes from "./pagamentoRoutes";
import usuarioRoutes from "./usuarioRoutes";
import {cors} from "./cors";

const app = express();
app.use(express.json());
app.use(cors)
app.use('/api/produto', produtoRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/fatura', faturaRoutes);
app.use('/api/pagamento', pagamentoRoutes);
app.use('/api/usuario', usuarioRoutes);

export default app;