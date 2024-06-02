import { Request, Response, Router} from "express";
import {ProdutoDatabase} from "../database/produtoDatabase";
import {ProdutoService} from "../service/produtoService";
import {cors} from "./cors";


const produtoRoutes = Router();
const produtoDatabase = ProdutoDatabase.getInstance()
const produtoService = new ProdutoService(produtoDatabase);

produtoRoutes.get("/",  async (req: Request, res: Response) => {
    const produtos = await produtoService.encontrarTodos();
    res.status(200).json(produtos);
})

produtoRoutes.post("/",  async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const result = await produtoService.criarProduto(body.nome, body.descricao, body.preco, body.regime);
        res.status(201).json({ "idProduto": result });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
})

produtoRoutes.get("/:idProduto",  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto;
    try {
        const result = await produtoService.encontrarPorId(idProduto);
        res.status(200).json(result);
    }  catch (error: any) {
        res.status(400).json({ error: error.message });
    }
})

produtoRoutes.patch("/atualizar/:idProduto",  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto;
    const body = req.body;
    try {
        const result = await produtoService.actualizarProduto(idProduto, body.nome, body.descricao, body.preco);
        res.status(200).json(result);
    }  catch (error: any) {
        res.status(400).json({ error: error.message });
    }
})

produtoRoutes.patch("/addquantidade/:idProduto",  async (req: Request, res: Response) => {
    const idProduto = req.params.idProduto;
    try {
        const body = req.body;
        const result = await produtoService.addQuantidade(idProduto, body.quantidade);
        res.status(202).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
})



export default produtoRoutes;