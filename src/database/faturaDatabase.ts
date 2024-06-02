import {Produto} from "../entity/produto";
import {Fatura} from "../entity/fatura";

export class FaturaDatabase {
    private static instance: FaturaDatabase;
    private _faturas: Fatura[] = [];

    static getInstance() {
        if (!FaturaDatabase.instance) {
            FaturaDatabase.instance = new FaturaDatabase();
        }
        return FaturaDatabase.instance;
    }

    async criar(fatura: Fatura): Promise<void> {
        this._faturas.push(fatura)
    }

    async encontrarPorId(id: string): Promise<Fatura | undefined> {
        const faturaEncontrado = this._faturas.filter((fatura) => fatura.idFatura === id)[0];
        if (!faturaEncontrado) {
            return undefined;
        }
        return faturaEncontrado;
    }

    async encontrarTodos(): Promise<Fatura[]> {
        return this._faturas;
    }

    async guardar(fatura: Fatura): Promise<void> {
        const faturaIndex = this._faturas.findIndex((currentFatura) => currentFatura.idFatura === fatura.idFatura);
        if (faturaIndex === -1) return undefined;
        this._faturas[faturaIndex] = fatura;
    }
}