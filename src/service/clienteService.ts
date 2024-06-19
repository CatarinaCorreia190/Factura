import {Cliente} from "../entity/cliente";
import {ClienteDatabase} from "../database/clienteDatabase";

export class ClienteService {
    private readonly _clienteDatabase: ClienteDatabase;

    constructor(clienteDatabase: ClienteDatabase) {
        this._clienteDatabase = clienteDatabase;
    }

    async criarCliente(nome: string, nif: string, email: string, endereco: string): Promise<Cliente> {
        let clienteExiste;
        clienteExiste = await this._clienteDatabase.encontrarPorNif(nif);
        if (clienteExiste) throw new Error("Cliente já existe, NIF fornecido já existente");
        clienteExiste = await this._clienteDatabase.encontrarPorEmail(email);
        if (clienteExiste) throw new Error("Cliente já existe, Email fornecido já existente");
        const cliente = new Cliente({nome, nif, email, endereco});
        this._clienteDatabase.criar(cliente);
        return cliente;
    }

    async encontrarPorId(id: string): Promise<Cliente | undefined> {
        const cliente = await this._clienteDatabase.encontrarPorId(id);
        if (!cliente) {
            return undefined;
        }
        return cliente;
    }

    async encontrarTodos(): Promise<Cliente[]> {
        return await this._clienteDatabase.encontrarTodos();
    }

    async actualizarCliente(id: string, nome: string, email: string, endereco: string): Promise<Cliente> {
        const cliente = await this._clienteDatabase.encontrarPorId(id);
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }
        cliente.nome = nome;
        cliente.email = email;
        cliente.endereco = endereco;
        cliente.actualizadoEm = new Date();
        await this._clienteDatabase.guardar(cliente);
        return  cliente;
    }
}