import { ClienteService } from "./clienteService";
import { Fatura } from "../entity/fatura";
import {ItemFatura} from "../entity/ItemFatura";
import { TipoRegime } from "../entity/produto";
import {ProdutoService} from "./produtoService";
import {FaturaDatabase} from "../database/faturaDatabase";
import { InvoiceNumber } from "../entity/invoiceNumber";

export class FaturaService {
  private readonly _faturaDatabase: FaturaDatabase;
  private readonly _produtoService: ProdutoService;
  private readonly _clienteService: ClienteService;

  public constructor(
    faturaDatabase: FaturaDatabase,
    produtoService: ProdutoService,
    clienteService: ClienteService
  ) {
    this._faturaDatabase = faturaDatabase;
    this._produtoService = produtoService;
    this._clienteService = clienteService;
  }

  async criarFatura(idCliente: string, items: ItemInput[]): Promise<FaturaOutput> {
    const clientAlreadyExists = await this._clienteService.encontrarPorId(idCliente);
    if (!clientAlreadyExists) throw new Error("Cliente inexistente");
    const faturas = await this._faturaDatabase.encontrarTodos();
    const numeroFatura = new InvoiceNumber(faturas[faturas.length - 1]?.numeroFatura);
    const fatura = new Fatura({ idCliente, numeroFatura: numeroFatura.value });
    for (const item of items) {
      const produto = await this._produtoService.encontrarPorId(item.idProduto);
      if (!produto) throw new Error("Produto não encontrado");
      if (produto.quantidade < item.quantidade) throw new Error(`Quantidade insuficiente: Quantidadde Disponível ${produto.quantidade} - Quantidade Solicitada ${item.quantidade}`);
      const newItem = new ItemFatura({
        idFatura: fatura.idFatura,
        idProduto: item.idProduto,
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
        imposto: produto.regime == TipoRegime.REGIME_GERAL ? 14 : 0,
      });
      fatura.addItem(newItem);
      produto.quantidade = produto.quantidade - item.quantidade;
      await this._produtoService.actualizarQuantidade(produto.idProduto, produto.quantidade);
    }
    await this._faturaDatabase.criar(fatura);
    return {
      idFatura: fatura.idFatura,
      numeroFatura: fatura.numeroFatura,
      dataEmissao: fatura.dataEmissao,
      dataPago: fatura.dataPago,
      nomeCliente: clientAlreadyExists.nome,
      estado: fatura.estado,
      total: fatura.total(),
      criadoEm: fatura.criadoEm,
      actualizadoEm: fatura.actualizadoEm,
    };
  }

  async encontrarPorId(id: string): Promise<Fatura | undefined> {
    const fatura = await this._faturaDatabase.encontrarPorId(id);
    if (!fatura) return undefined;
    return fatura;
  }

  async encontrarTodas(): Promise<any[]> {
    const faturas = await this._faturaDatabase.encontrarTodos();
    const invoices: any[] = [];
    for (const fatura of faturas) {
      const client = await this._clienteService.encontrarPorId(fatura.idCliente);
      invoices.push({
        idFatura: fatura.idFatura,
        numeroFatura: fatura.numeroFatura,
        dataEmissao: fatura.dataEmissao,
        dataPago: fatura.dataPago,
        nomeCliente: client!.nome,
        estado: fatura.estado,
        total: fatura.total(),
        criadoEm: fatura.criadoEm,
        actualizadoEm: fatura.actualizadoEm,
      })
    }

    return invoices
  }

  async encontrarTodasEmitidas(): Promise<any[]> {
    const faturas = await this._faturaDatabase.encontrarTodos();
    const invoices: any[] = [];
    for (const fatura of faturas) {
      if (fatura.estado == 'Emitida') {
        const client = await this._clienteService.encontrarPorId(fatura.idCliente);
        invoices.push({
          idFatura: fatura.idFatura,
          numeroFatura: fatura.numeroFatura,
          dataEmissao: fatura.dataEmissao,
          dataPago: fatura.dataPago,
          nomeCliente: client!.nome,
          estado: fatura.estado,
          total: fatura.total(),
          criadoEm: fatura.criadoEm,
          actualizadoEm: fatura.actualizadoEm,
        })
      }
    }

    return invoices
  }

  async pagar(id: string): Promise<Fatura> {
    const fatura = await this._faturaDatabase.encontrarPorId(id);
    if (!fatura) throw new Error("Fatura inexistente");
    fatura.pagar()
    this._faturaDatabase.guardar(fatura);
    return fatura;
  }

  async anular(id: string): Promise<Fatura> {
    const fatura = await this._faturaDatabase.encontrarPorId(id);
    if (!fatura) throw new Error("Fatura inexistente");
    fatura.anular()
    this._faturaDatabase.guardar(fatura);
    return fatura;
  }

  //Imprimir PDF
}

type ItemInput = {
  idProduto: string;
  quantidade: number;
  imposto: number;
};

type FaturaOutput = {
  idFatura: string;
  numeroFatura: string;
  dataEmissao: Date;
  dataPago: Date;
  nomeCliente: string;
  estado: string;
  total: number;
  criadoEm: Date;
  actualizadoEm: Date;
};