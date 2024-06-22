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

    async criarPagamento(idFatura: string, montantePago: number): Promise<any> {
        const fatura = await this._faturaService.encontrarPorId(idFatura);
        if (!fatura) throw new Error("Fatura inexistente");
        if (montantePago < fatura.total()) throw new Error("Montante entrege é insuficiente");
        const pagamento = new Pagamento({
            idFatura: idFatura,
            montantePago: montantePago,
        });
        await this._faturaService.pagar(fatura.idFatura);
        await this._pagamentoDatabase.criar(pagamento);
        return {
            idPagamento: pagamento.idPagamento,
            numeroFatura: fatura!.numeroFatura,
            montantePago: pagamento.montantePago,
            emitidoEm: pagamento.criadoEm
        };
    }

    async encontrarPorId(id: string): Promise<Pagamento | undefined> {
        const pagamentoEncontrado = await this._pagamentoDatabase.encontrarPorId(id);
        if (!pagamentoEncontrado) return undefined;
        return pagamentoEncontrado;
    }

    async encontrarTodos(): Promise<any[]> {
        const pagamentos =  await this._pagamentoDatabase.encontrarTodos();
        const payments: any[] = [];
        for (const pagamento of pagamentos) {
            const invoice = await this._faturaService.encontrarPorId(pagamento.idFatura)
            payments.push({
                idPagamento: pagamento.idPagamento,
                numeroFatura: invoice!.numeroFatura,
                montantePago: pagamento.montantePago,
                emitidoEm: pagamento.criadoEm
            })
        }
        return payments
    }
}