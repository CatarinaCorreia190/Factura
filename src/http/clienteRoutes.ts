import { Request, Response, Router} from "express";
import {ClienteDatabase} from "../database/clienteDatabase";
import {ClienteService} from "../service/clienteService";


const clienteRoutes = Router();
const clienteDatabase = ClienteDatabase.getInstance();
const clienteService = new ClienteService(clienteDatabase);

clienteRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const clientes = await clienteService.encontrarTodos();
        res.status(200).json(clientes);
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
})

clienteRoutes.get("/:idCliente", async (req: Request, res: Response) => {
    const idCliente = req.params.idCliente;
    try {
        const cliente = await clienteService.encontrarPorId(idCliente);
        res.status(200).json(cliente);
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
})

clienteRoutes.post("/", async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const idCliente = await clienteService.criarCliente(body.nome, body.nif, body.email, body.endereco);
        res.status(200).json(idCliente);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

clienteRoutes.patch("/:idCliente", async (req: Request, res: Response) => {
    const idCliente = req.params.idCliente;
    const body = req.body;
    try {
        const result = await clienteService.actualizarCliente(idCliente, body.nome, body.email, body.endereco);
        res.status(200).json(idCliente);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})