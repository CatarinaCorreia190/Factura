import {ItemFatura} from "./ItemFatura";
import {ProdutoService} from "./produtoService";

export class FaturaService {
    private static instance: FaturaService;
    private _items: ItemFatura[] = [];
    private readonly _produtoService: ProdutoService;

    private constructor(produtoService: ProdutoService) {
        this._produtoService = produtoService;
    }

    static getInstance(produtoService: ProdutoService) {
        if (!FaturaService.instance) {
            FaturaService.instance = new FaturaService(produtoService);
        }
        return FaturaService.instance;
    }

}