import { Request, Response, Router} from "express";
import {UsuarioDatabase} from "../database/usuarioDatabase";
import {UsuarioService} from "../service/usuarioService";
import PgPromiseAdapter from "../database/pgPromiseAdapter";

const UsuarioRouter = Router();
const pgDatabaseAdapter = new PgPromiseAdapter()
const usuarioDatabase =  new UsuarioDatabase(pgDatabaseAdapter);
const usuarioService = new UsuarioService(usuarioDatabase);

UsuarioRouter.get("/", async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.encontrarTodos();
        res.status(200).json(usuarios);
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
})

UsuarioRouter.get("/:idUsuario", async (req: Request, res: Response) => {
    const idUsuario = req.params.idUsuario;
    try {
        const usuario = await usuarioService.encontrarPorId(idUsuario);
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
})

UsuarioRouter.post("/",  async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const usuario = await usuarioService.signup(body.name, body.sobrenome, body.email, body.password, body.tipo);
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

UsuarioRouter.patch("/:idUsuario",  async (req: Request, res: Response) => {
    const idUsuario = req.params.idUsuario;
    const body = req.body;
    try {
        const usuario = await usuarioService.updatePassword(idUsuario, body.password);
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(400).json({ "error": error.message });
    }
})

export default UsuarioRouter;