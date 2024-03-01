import {ItemFatura} from "./ItemFatura";
import {ProdutoService} from "./produtoService";

export class ItemFaturaService {
    private static instance: ItemFaturaService;
    private _items: ItemFatura[] = [];
    private readonly _produtoService: ProdutoService;

    private constructor(produtoService: ProdutoService) {
        this._produtoService = produtoService;
    }

    static getInstance(produtoService: ProdutoService) {
        if (!ItemFaturaService.instance) {
            ItemFaturaService.instance = new ItemFaturaService(produtoService);
        }
        return ItemFaturaService.instance;
    }

    criarItemFatura (idFatura: string, idProduto: string, quantidade: number): string {
        const produto = this._produtoService.encontrarPorId(idProduto);
        if (!produto) {
            throw new Error("Produto não encontrado");
        }
        const itemFatura = new ItemFatura({
            idFatura,
            nomeProduto: produto.nome,
            quandidateProduto: quantidade,
            precoUnitario: produto.preco,
            imposto: 14,
        });
        this._items.push(itemFatura);
        return itemFatura.idItemFatura;
    }

    encontrarPorIdFatura (idFatura: string): ItemFatura[] | undefined {
        const itemsFatura = this._items.filter((item) => item.idFatura == idFatura);
        if (!itemsFatura) return undefined;
        return itemsFatura;
    }
}