import {ClienteService} from "../src/service/clienteService";
import {ClienteDatabase} from "../src/database/clienteDatabase";
import PgPromiseAdapter from "../src/database/pgPromiseAdapter";

describe('ClienteService Unit Tests', () => {
    test('Deve criar um cliente', async () => {
        const pgDatabaseAdapter = new PgPromiseAdapter()
        const clienteDatabase = new ClienteDatabase(pgDatabaseAdapter)
        const clienteService = new ClienteService(clienteDatabase);
        const nome = "qualquer_nome";
        const nif = `123456789LJ098${Math.random()}`;
        const email = `test${Math.random()}@test.com`;
        const endereco = "Bloco 20, Centralidade do Kilamba";
        const cliente = await clienteService.criarCliente(nome, nif, email, endereco);
        const clienteCriado = await clienteDatabase.encontrarPorCampo('idcliente', cliente.idCliente);
        expect(clienteCriado?.idCliente).toBe(cliente.idCliente);
        expect(clienteCriado?.nome).toBe(nome);
        expect(clienteCriado?.nif).toBe(nif);
        expect(clienteCriado?.email).toBe(email);
        expect(clienteCriado?.endereco).toBe(endereco);
        await pgDatabaseAdapter.close()
    });

    test('Deve retornar um erro se tentar criar um cliente com nif já existente', async () => {
        const pgDatabaseAdapter = new PgPromiseAdapter()
        const clienteDatabase = new ClienteDatabase(pgDatabaseAdapter)
        const clienteService = new ClienteService(clienteDatabase);
        const nome = "qualquer_nome";
        const nif = `123456789LJ098${Math.random()}`;
        const email = `test${Math.random()}@test.com`;
        const endereco = "Bloco 20, Centralidade do Kilamba";
        await clienteService.criarCliente(nome, nif, email, endereco);
        await expect(() => clienteService.criarCliente(nome, nif, email, endereco)).rejects.toThrowError("Cliente já existe, NIF fornecido já existente");
        await pgDatabaseAdapter.close()
    })
})