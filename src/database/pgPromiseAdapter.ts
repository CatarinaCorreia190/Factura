import pgp from "pg-promise";
import Connection from "./connection";


export default class PgPromiseAdapter implements Connection {
    connection: any;

    constructor() {
        pgp({

        })
        this.connection = pgp()("postgresql://invoice_owner:8crxspRAGf0U@ep-muddy-smoke-a58jz4ig.us-east-2.aws.neon.tech/invoice?sslmode=require");
    }

    async query(statement: string, data: any): Promise<any> {
        return await this.connection.query(statement, data);
    }

    async close(): Promise<void> {
        await this.connection.$pool.end();
    }
}