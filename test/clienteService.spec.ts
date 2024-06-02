import {ClienteService} from "../src/service/clienteService";
import {ClienteDatabase} from "../src/database/clienteDatabase";

describe('ClienteService Unit Tests', () => {
    test('Deve criar um cliente', async () => {
        const clienteDatabase = new ClienteDatabase()
        const clienteService = new ClienteService(clienteDatabase);
        const nome = "qualquer_nome";
        const nif = "123456789LJ098";
        const email = "test@test.com";
        const endereco = "Bloco 20, Centralidade do Kilamba";
        const cliente = await clienteService.criarCliente(nome, nif, email, endereco);
        const clienteCriado = await clienteService.encontrarPorId(cliente.idCliente);
        expect(clienteCriado?.idCliente).toBe(cliente.idCliente);
        expect(clienteCriado?.nome).toBe(nome);
        expect(clienteCriado?.nif).toBe(nif);
        expect(clienteCriado?.email).toBe(email);
        expect(clienteCriado?.endereco).toBe(endereco);

    });

    test('Deve retornar um erro se tentar criar um cliente com nif já existente', async () => {
        const clienteDatabase = new ClienteDatabase()
        const clienteService = new ClienteService(clienteDatabase);
        const nome = "qualquer_nome";
        const nif = "123456789LJ098";
        const email = "test@test.com";
        const endereco = "Bloco 20, Centralidade do Kilamba";
        await clienteService.criarCliente(nome, nif, email, endereco);
        await expect(() => clienteService.criarCliente(nome, nif, email, endereco)).rejects.toThrowError("Cliente já existe, NIF fornecido já existente");
    })
})