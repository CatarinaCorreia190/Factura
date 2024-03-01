import {ClienteService} from "../src/clienteService";

describe('ClienteService Unit Tests', () => {
    test('Deve criar um cliente', async () => {
        const clienteService = ClienteService.getInstance();
        const nome = "qualquer_nome";
        const nif = "123456789LJ098";
        const email = "test@test.com";
        const endereco = "Bloco 20, Centralidade do Kilamba";
        const idCLiente = clienteService.criarCliente(nome, nif, email, endereco);
        const clienteCriado = clienteService.encontrarPorId(idCLiente);
        expect(clienteCriado?.idCliente).toBe(idCLiente);
        expect(clienteCriado?.nome).toBe(nome);
        expect(clienteCriado?.nif).toBe(nif);
        expect(clienteCriado?.email).toBe(email);
        expect(clienteCriado?.endereco).toBe(endereco);

    });

    test('Deve retornar um erro se tentar criar um cliente com nif já existente', async () => {
        const clienteService = ClienteService.getInstance();
        const nome = "qualquer_nome";
        const nif = "123456789LJ098";
        const email = "test@test.com";
        const endereco = "Bloco 20, Centralidade do Kilamba";
        clienteService.criarCliente(nome, nif, email, endereco);
        expect(() => clienteService.criarCliente(nome, nif, email, endereco)).toThrowError("Cliente já existe, NIF fornecido já existente");

    })
})