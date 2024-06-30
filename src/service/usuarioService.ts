import {UsuarioDatabase} from "../database/usuarioDatabase";
import {Usuario} from "../entity/usuario";

export class UsuarioService {
    private readonly _usuarioDatabase: UsuarioDatabase;
    constructor(usuarioDatabase: UsuarioDatabase) {
        this._usuarioDatabase = usuarioDatabase;
    }

    async signup(nome: string, sobrenome: string, email: string, password: string, tipo: string): Promise<any> {
        const usuarioExistente = await this._usuarioDatabase.encontrarPorEmail(email);
        if (usuarioExistente) {
            throw new Error('Email já cadastrado');
        }
        const usuario = new Usuario({nome, sobrenome, email, password, tipo});
        await this._usuarioDatabase.criar(usuario);
        return {
            nome,
            sobrenome,
            email,
            tipo
        }
    }

    async login(email: string, password: string): Promise<string> {
        const usuario = await this._usuarioDatabase.encontrarPorEmail(email);
        if (!usuario) {
            throw new Error('Usuario ou senha incorrecta');
        }
        if (password !== usuario.password) {
            throw new Error('Usuario ou senha incorrecta');
        }
        return `${usuario.idUsuario}_${usuario.tipoUsuario}_${usuario.nome}`;
    }

    async updatePassword(userId: string, password: string): Promise<Usuario> {
        const usuario = await this._usuarioDatabase.encontrarPorId(userId)
        if (!usuario) {
            throw new Error('Usuario inexistente');
        }
        usuario.password = password
        await this._usuarioDatabase.guardar(usuario);
        return usuario
    }

    async encontrarPorId(id: string): Promise<Usuario | undefined> {
        const usuario = await this._usuarioDatabase.encontrarPorId(id);
        if (!usuario) {
            return undefined;
        }
        return usuario
    }

    async encontrarTodos(): Promise<Usuario[]> {
        return await this._usuarioDatabase.encontrarTodos();
    }
}