CREATE DATABASE IF NOT EXISTS invoice;

CREATE TABLE Cliente (
    idCliente VARCHAR(36) PRIMARY KEY,
    nif VARCHAR(50) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Fatura (
    idFatura VARCHAR(36) PRIMARY KEY,
    numeroFatura VARCHAR(50) NOT NULL,
    dataEmissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dataPago TIMESTAMP NULL,
    idCliente VARCHAR(36) NOT NULL,
    estado VARCHAR(50),
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
);

CREATE TABLE Produto (
    idProduto VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    regime VARCHAR(50) NOT NULL,
    quantidade INT DEFAULT 0,
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ItemFatura (
    idItemFatura VARCHAR(36) PRIMARY KEY,
    idFatura VARCHAR(36) NOT NULL,
    idProduto VARCHAR(36) NOT NULL,
    nomeProduto VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    precoUnitario DECIMAL(10, 2) NOT NULL,
    imposto DECIMAL(10, 2) NOT NULL,
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idFatura) REFERENCES Fatura(idFatura),
    FOREIGN KEY (idProduto) REFERENCES Produto(idProduto)
);

CREATE TABLE Pagamento (
    idPagamento VARCHAR(36) PRIMARY KEY,
    idFatura VARCHAR(36) NOT NULL,
    dataDePagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    montantePago DECIMAL(10, 2) NOT NULL,
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idFatura) REFERENCES Fatura(idFatura)
);

CREATE TABLE Usuario (
    idUsuario VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION create_fatura_with_items(
    fatura_id VARCHAR(36),
    numero_fatura VARCHAR(50),
    id_cliente VARCHAR(36),
    estado VARCHAR(50),
    items JSONB
)
RETURNS VOID AS $$
DECLARE
    item JSONB;
BEGIN
    -- Insert into Fatura table
    INSERT INTO Fatura (idFatura, numeroFatura, dataEmissao, idCliente, estado)
    VALUES (fatura_id, numero_fatura, CURRENT_TIMESTAMP, id_cliente, estado);

    -- Loop through each item in the JSONB array and insert into ItemFatura table
    FOR item IN SELECT * FROM jsonb_array_elements(items)
    LOOP
        INSERT INTO ItemFatura (
            idItemFatura, idFatura, idProduto, nomeProduto, quantidade, precoUnitario, imposto
        )
        VALUES (
            item->>'idItemFatura',
            item->>'idFatura',
            item->>'idProduto',
            item->>'nomeProduto',
            (item->>'quantidade')::INT,
            (item->>'precoUnitario')::DECIMAL,
            (item->>'imposto')::DECIMAL
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql;
