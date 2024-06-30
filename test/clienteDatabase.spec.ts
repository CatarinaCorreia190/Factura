import {ClienteDatabase} from "../src/database/clienteDatabase";
import PgPromiseAdapter from "../src/database/pgPromiseAdapter";
import {Cliente} from "../src/entity/cliente";
import {FaturaDatabase} from "../src/database/faturaDatabase";
import {FaturaService} from "../src/service/faturaService";

describe('clienteDatabase', () => {
    test('Should be able to create a cliente', async () => {
        const pgPromiseAdapter = new PgPromiseAdapter()
        const clienteDatabase = new ClienteDatabase(pgPromiseAdapter);
        const cliente = new Cliente({
            nif: `anyNif${Math.random()}`,
            nome: `anyName${Math.random()}`,
            email: `anyemail${Math.random()}@mail.com`,
            endereco: 'cazenga'
        })
        await clienteDatabase.criar(cliente)
        const clienteCriado = await clienteDatabase.encontrarPorCampo('idcliente', cliente.idCliente);
        expect(clienteCriado).toBeDefined();
        expect(clienteCriado?.idCliente).toBe(cliente.idCliente);
    })
})