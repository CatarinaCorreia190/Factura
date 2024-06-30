import {UsuarioService} from "../src/service/usuarioService";
import {UsuarioDatabase} from "../src/database/usuarioDatabase";
import PgPromiseAdapter from "../src/database/pgPromiseAdapter";

let pgDatabaseAdapter: PgPromiseAdapter;
let usuarioDatabase: UsuarioDatabase;

describe('UsuarioService', () => {
    beforeAll(() => {
        pgDatabaseAdapter = new PgPromiseAdapter()
        usuarioDatabase =  new UsuarioDatabase(pgDatabaseAdapter);
    })
    test('Should create a user', async () => {
        const usuarioService = new UsuarioService(usuarioDatabase);
        const input = {
            name: "usuario",
            sobrenome: 'lastname',
            email: `usuario${Math.random()}@email.com`,
            password: "password",
            tipo: 'Admin',
        }
        const usuario = await usuarioService.signup(input.name, input.sobrenome, input.email, input.password, input.tipo);
        expect(usuario).toBeTruthy();
        expect(usuario.nome).toBe(input.name);
        expect(usuario.sobrenome).toBe(input.sobrenome);
        expect(usuario.email).toBe(input.email);
        expect(usuario.tipo).toBe(input.tipo);
    })

    test('Should login a user', async () => {
        const usuarioService = new UsuarioService(usuarioDatabase);
        const input = {
            name: "usuario",
            sobrenome: 'lastname',
            email: `usuario${Math.random()}@email.com`,
            password: "password",
            tipo: 'Admin',
        }
        const usuario = await usuarioService.signup(input.name, input.sobrenome, input.email, input.password, input.tipo);
        const token = await usuarioService.login(input.email, input.password)
        const [id, tipo, nome] = token.split('_')
        expect(token).toBeTruthy();
        expect(id).toBeTruthy();
        expect(tipo).toBe(input.tipo);
        expect(nome).toBe(usuario.nome);
    })

    afterAll(() => {
        pgDatabaseAdapter.close()
    })
})