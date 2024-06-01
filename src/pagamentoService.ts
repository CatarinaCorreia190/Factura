import {FaturaService} from "./faturaService";
import {Pagamento} from "./pagamento";

export class PagamentoService {
    private static instance: PagamentoService;
    private _pagamentos: Pagamento[] = [];
    private readonly _faturaService: FaturaService;

    private constructor(faturaService: FaturaService) {
        this._faturaService = faturaService;
    }

    static getInstance(faturaService: FaturaService) {
        if (!PagamentoService.instance) {
            PagamentoService.instance = new PagamentoService(faturaService);
        }
        return PagamentoService.instance;
    }

    criarPagamento(idFatura: string, montantePago: number): string {
        const fatura = this._faturaService.encontrarPorId(idFatura);
        if (!fatura) throw new Error("Fatura inexistente");
        if (montantePago < fatura.total()) throw new Error("Montante entrege é insuficiente");
        const pagamento = new Pagamento({
            idFatura: idFatura,
            montantePago: montantePago,
        });
        fatura.pagar()
        this._faturaService.guardar(fatura);
        this._pagamentos.push(pagamento);
        return pagamento.idPagamento;
    }

    encontrarPorId(id: string): Pagamento | undefined {
        const pagamentoEncontrado = this._pagamentos.filter((pagamento) => pagamento.idPagamento === id)[0];
        if (!pagamentoEncontrado) return undefined;
        return pagamentoEncontrado;
    }
}