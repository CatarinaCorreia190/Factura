import {FaturaService} from "./faturaService";
import {Pagamento} from "../entity/pagamento";
import {PagamentoDatabase} from "../database/pagamentoDatabase";
import {Cliente} from "../entity/cliente";

export class PagamentoService {
    private readonly _pagamentoDatabase: PagamentoDatabase;
    private readonly _faturaService: FaturaService;

    public constructor(pagamentoDatabase: PagamentoDatabase, faturaService: FaturaService) {
        this._pagamentoDatabase = pagamentoDatabase;
        this._faturaService = faturaService;
    }

    async criarPagamento(idFatura: string, montantePago: number): Promise<string> {
        const fatura = await this._faturaService.encontrarPorId(idFatura);
        if (!fatura) throw new Error("Fatura inexistente");
        if (montantePago < fatura.total()) throw new Error("Montante entrege é insuficiente");
        const pagamento = new Pagamento({
            idFatura: idFatura,
            montantePago: montantePago,
        });
        await this._faturaService.pagar(fatura.idFatura);
        await this._pagamentoDatabase.criar(pagamento);
        return pagamento.idPagamento;
    }

    async encontrarPorId(id: string): Promise<Pagamento | undefined> {
        const pagamentoEncontrado = await this._pagamentoDatabase.encontrarPorId(id);
        if (!pagamentoEncontrado) return undefined;
        return pagamentoEncontrado;
    }

    async encontrarTodos(): Promise<Pagamento[]> {
        return this._pagamentoDatabase.encontrarTodos();
    }
}