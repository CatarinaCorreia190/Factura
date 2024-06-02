import {Cliente} from "../entity/cliente";

export class ClienteDatabase {
    private static instance: ClienteDatabase;
    private _cliente: Cliente[] = [];

    static getInstance() {
        if (!ClienteDatabase.instance) {
            ClienteDatabase.instance = new ClienteDatabase();
        }
        return ClienteDatabase.instance;
    }

    async criar(cliente: Cliente): Promise<void> {
        this._cliente.push(cliente)
    }

    async encontrarPorId(id: string): Promise<Cliente | undefined> {
        const clienteEncontrado = this._cliente.filter((cliente) => cliente.idCliente === id)[0];
        if (!clienteEncontrado) {
            return undefined;
        }
        return clienteEncontrado;
    }

    async encontrarPorNif(nif: string): Promise<Cliente | undefined> {
        const clienteEncontrado = this._cliente.filter((cliente) => cliente.nif === nif)[0];
        if (!clienteEncontrado) {
            return undefined;
        }
        return clienteEncontrado;
    }

    async encontrarPorEmail(email: string): Promise<Cliente | undefined> {
        const clienteEncontrado = this._cliente.filter((cliente) => cliente.email === email)[0];
        if (!clienteEncontrado) {
            return undefined;
        }
        return clienteEncontrado;
    }

    async encontrarTodos(): Promise<Cliente[]> {
        return this._cliente;
    }

    async guardar(cliente: Cliente): Promise<void> {
        const clienteIndex = this._cliente.findIndex((currentCliente) => currentCliente.idCliente === cliente.idCliente);
        if (clienteIndex === -1) return undefined;
        this._cliente[clienteIndex] = cliente;
    }
}