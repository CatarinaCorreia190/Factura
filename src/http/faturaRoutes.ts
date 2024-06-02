import { Request, Response, Router} from "express";
import {FaturaDatabase} from "../database/faturaDatabase";
import {FaturaService} from "../service/faturaService";
import {ClienteDatabase} from "../database/clienteDatabase";
import {ClienteService} from "../service/clienteService";
import {ProdutoDatabase} from "../database/produtoDatabase";
import {ProdutoService} from "../service/produtoService";
import {cors} from "./cors";


const faturaRoutes = Router();
const produtoDatabase = ProdutoDatabase.getInstance()
const produtoService = new ProdutoService(produtoDatabase);
const clienteDatabase = ClienteDatabase.getInstance();
const clienteService = new ClienteService(clienteDatabase);
const faturaDatabase = FaturaDatabase.getInstance();
const faturaService = new FaturaService(faturaDatabase, produtoService, clienteService);

faturaRoutes.get("/", cors, async (req: Request, res: Response) => {
    try {
        const faturas = await faturaService.encontrarTodas();
        res.status(200).json(faturas);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
});

faturaRoutes.get("/:idFatura", cors, async (req: Request, res: Response) => {
    const idFatura = req.params.idFatura;
    try {
        const fatura = await faturaService.encontrarPorId(idFatura);
        res.status(200).json(fatura);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

faturaRoutes.post("/", cors, async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const idFatura = await faturaService.criarFatura(body.idCliente, body.items);
        res.status(200).json(idFatura);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

faturaRoutes.put("/:idFatura", cors, async (req: Request, res: Response) => {
    const idFatura = req.params.idFatura;
    try {
        const fatura = await faturaService.anular(idFatura);
        res.status(200).json(fatura);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

export default faturaRoutes;