import { Usuario } from "../entity/usuario";
import pgPromise from "pg-promise";
import Connection from "./connection";

const pgp = pgPromise();

export class UsuarioDatabase {

    public constructor(private readonly connection: Connection) {}

    async criar(user: Usuario): Promise<void> {
        const query = `
            INSERT INTO Usuario (idUsuario, email, nome, sobrenome, password, tipo)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [user.idUsuario, user.email, user.nome, user.sobrenome, user.password, user.tipoUsuario];
        await this.connection.query(query, values);
    }

    async encontrarPorId(id: string): Promise<Usuario | undefined> {
        const query = `SELECT * FROM Usuario WHERE idUsuario = $1`;
        const result = await this.connection.query(query, [id]);
        if (result.length === 0) {
            return undefined;
        }
        const usuario = result[0];
        return new Usuario({
            idUsuario: usuario.idusuario,
            email: usuario.email,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            password: usuario.password,
            tipo: usuario.tipo,
            criadoEm: usuario.criadoem,
            actualizadoEm: usuario.actualizadoem,
        });
    }

    async encontrarPorEmail(email: string): Promise<Usuario | undefined> {
        const query = `SELECT * FROM Usuario WHERE email = $1`;
        const result = await this.connection.query(query, [email]);
        if (result.length === 0) {
            return undefined;
        }
        const usuario = result[0];
        return new Usuario({
            idUsuario: usuario.idusuario,
            email: usuario.email,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            password: usuario.password,
            tipo: usuario.tipo,
            criadoEm: usuario.criadoem,
            actualizadoEm: usuario.actualizadoem,
        });
    }

    async encontrarTodos(): Promise<Usuario[]> {
        const query = `SELECT * FROM Usuario`;
        const result = await this.connection.query(query, undefined);
        return result.map((usuario: any) => {
            return new Usuario({
                idUsuario: usuario.idusuario,
                email: usuario.email,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                password: usuario.password,
                tipo: usuario.tipo,
                criadoEm: usuario.criadoem,
                actualizadoEm: usuario.actualizadoem,
            });
        });
    }

    async guardar(usuario: Usuario): Promise<void> {
        const query = `
            UPDATE Usuario
            SET email = $1, nome = $2, sobrenome = $3, password = $4, tipo = $5, actualizadoEm = CURRENT_TIMESTAMP
            WHERE idUsuario = $6
        `;
        const values = [usuario.email, usuario.nome, usuario.sobrenome, usuario.password, usuario.tipoUsuario, usuario.idUsuario];
        await this.connection.query(query, values);
    }
}
