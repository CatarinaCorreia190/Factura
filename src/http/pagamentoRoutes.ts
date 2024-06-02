import { Request, Response, Router} from "express";
import {FaturaDatabase} from "../database/faturaDatabase";
import {FaturaService} from "../service/faturaService";
import {ClienteDatabase} from "../database/clienteDatabase";
import {ClienteService} from "../service/clienteService";
import {ProdutoDatabase} from "../database/produtoDatabase";
import {ProdutoService} from "../service/produtoService";
import {PagamentoDatabase} from "../database/pagamentoDatabase";
import {PagamentoService} from "../service/pagamentoService";
import {cors} from "./cors";


const pagamentoRoutes = Router();
const produtoDatabase = ProdutoDatabase.getInstance()
const produtoService = new ProdutoService(produtoDatabase);
const clienteDatabase = ClienteDatabase.getInstance();
const clienteService = new ClienteService(clienteDatabase);
const faturaDatabase = FaturaDatabase.getInstance();
const faturaService = new FaturaService(faturaDatabase, produtoService, clienteService);
const pagamentoDatabase = PagamentoDatabase.getInstance();
const pagamentoService = new PagamentoService(pagamentoDatabase, faturaService);

pagamentoRoutes.get("/", cors, async (req: Request, res: Response) => {
    try {
        const pagamentos = await pagamentoService.encontrarTodos()
        res.status(200).json(pagamentos);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

pagamentoRoutes.get("/:idPagamento", cors, async (req: Request, res: Response) => {
    const idPagamento = req.params.idPagamento;
    try {
        const pagamento = await pagamentoService.encontrarPorId(idPagamento);
        res.status(200).json(pagamento);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

pagamentoRoutes.post("/", cors, async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const pagamento = await pagamentoService.criarPagamento(body.idFatura, body.montantePago);
        res.status(200).json(pagamento);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

export default pagamentoRoutes;