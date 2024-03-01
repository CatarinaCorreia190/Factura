import {Cliente} from "./cliente";

export class ClienteService {
    private static instance: ClienteService;
    private _clientes: Cliente[] = [];

    static getInstance() {
        if (!ClienteService.instance) {
            ClienteService.instance = new ClienteService();
        }
        return ClienteService.instance;
    }

    criarCliente(nome: string, nif: string, email: string, endereco: string): string {
        let clienteExiste;
        clienteExiste = this._clientes.filter((cliente) => cliente.nif === nif)[0];
        if (clienteExiste) throw new Error("Cliente já existe, NIF fornecido já existente");
        clienteExiste = this._clientes.filter((cliente) => cliente.email === email)[0];
        if (clienteExiste) throw new Error("Cliente já existe, Email fornecido já existente");
        const cliente = new Cliente({nome, nif, email, endereco});
        this._clientes.push(cliente);
        return cliente.idCliente;
    }

    encontrarPorId(id: string): Cliente | undefined {
        const cliente = this._clientes.filter((cliente) => cliente.idCliente === id)[0];
        if (!cliente) {
            return undefined;
        }
        return cliente;
    }

    encontrarTodos(): Cliente[] {
        return this._clientes;
    }

    actualizarCliente(id: string, nome: string, email: string, endereco: string): void {
        const cliente = this._clientes.filter((cliente) => cliente.idCliente === id)[0];
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }
        cliente.nome = nome;
        cliente.email = email;
        cliente.endereco = endereco;
        const clienteInddex = this._clientes.findIndex((cliente) => cliente.idCliente === id);
        this._clientes[clienteInddex] = cliente;
    }
}