import {Pagamento} from "../entity/pagamento";

export class PagamentoDatabase {
    private static instance: PagamentoDatabase;
    private _pagamento: Pagamento[] = [];

    static getInstance() {
        if (!PagamentoDatabase.instance) {
            PagamentoDatabase.instance = new PagamentoDatabase();
        }
        return PagamentoDatabase.instance;
    }

    async criar(pagamento: Pagamento): Promise<void> {
        this._pagamento.push(pagamento)
    }

    async encontrarPorId(id: string): Promise<Pagamento | undefined> {
        const pagamentoEncontrado = this._pagamento.filter((pagamento) => pagamento.idPagamento === id)[0];
        if (!pagamentoEncontrado) {
            return undefined;
        }
        return pagamentoEncontrado;
    }

    async encontrarPorFatura(idFatura: string): Promise<Pagamento | undefined> {
        const pagamentoEncontrado = this._pagamento.filter((pagamento) => pagamento.idFatura === idFatura)[0];
        if (!pagamentoEncontrado) {
            return undefined;
        }
        return pagamentoEncontrado;
    }

    async encontrarTodos(): Promise<Pagamento[]> {
        return this._pagamento;
    }

    async guardar(pagamento: Pagamento): Promise<void> {
        const pagamentoIndex = this._pagamento.findIndex((currentPagamento) => currentPagamento.idPagamento === pagamento.idPagamento);
        if (pagamentoIndex === -1) return undefined;
        this._pagamento[pagamentoIndex] = pagamento;
    }
}