# API REST - Catalogo de E-commerce

API RESTful construida com **Node.js**, **Express** e **MongoDB (Mongoose)** para gerenciar o catalogo de produtos de um e-commerce, suportando produtos com atributos dinamicos por categoria.

## Tecnologias

- Node.js + Express 5
- MongoDB + Mongoose
- dotenv

## Como rodar o projeto

```bash
# 1. instalar dependencias
npm install

# 2. copiar o .env.example para .env e preencher PORT e MONGO_URI
cp .env.example .env

# 3. (opcional) popular o banco com produtos de exemplo
npm run seed

# 4. rodar o servidor
npm run dev   # com reload automatico
# ou
npm start
```

O servidor sobe por padrao em `http://localhost:3000` (ou na porta definida em `PORT`).

## Modelo de Produto

```json
{
  "name": "Liquidificador Turbo 5 Velocidades",
  "category": "eletrodomesticos",
  "price": 259.0,
  "inStock": 18,
  "description": "Liquidificador potente com 5 velocidades",
  "specs": { "voltagem": "127V", "potencia": "700W" }
}
```

O campo `specs` e um objeto livre, permitindo atributos diferentes por categoria (ex: `tamanho`/`cor` para roupas, `voltagem`/`potencia` para eletrodomesticos).

## Endpoints

Base URL: `/api/v1/products`

| Metodo | Rota | Descricao | RF |
|---|---|---|---|
| POST | `/` | Cadastra um novo produto | RF01 |
| GET | `/` | Lista produtos com filtros, paginacao e ordenacao | RF02, RF04 |
| GET | `/search` | Busca textual por nome/descricao | RF03 |
| PATCH | `/:id` | Atualiza dados do produto e/ou incrementa/decrementa estoque | RF05 |
| DELETE | `/:id` | Remove um produto pelo ID | RF06 |

### POST /api/v1/products

Cria um produto. Campos obrigatorios: `name`, `price`, `category`, `inStock`.

```json
{
  "name": "Camiseta Basica",
  "category": "roupas",
  "price": 49.9,
  "inStock": 120,
  "description": "Camiseta de algodao",
  "specs": { "tamanho": "M", "cor": "preta" }
}
```

### GET /api/v1/products

Filtros e opcoes via query string:

- `category` — filtro exato de categoria (`$eq`)
- `priceMin` / `priceMax` — faixa de preco (`$gte` / `$lte`)
- `sort` — `price_asc` ou `price_desc`
- `limit` / `skip` — paginacao (limit maximo de 100)

Exemplo:

```
GET /api/v1/products?category=eletronicos&priceMin=100&priceMax=1000&sort=price_asc&limit=10&skip=0
```

### GET /api/v1/products/search

Busca por texto no nome e na descricao (indice de texto do MongoDB, com fallback para busca parcial via regex).

```
GET /api/v1/products/search?q=liquidificador
```

### PATCH /api/v1/products/:id

Atualiza campos do produto e/ou aplica incremento/decremento atomico no estoque via `inStockDelta`.

```json
{
  "price": 279.9,
  "inStockDelta": -3
}
```

### DELETE /api/v1/products/:id

Remove o produto pelo ID informado na URL.

## Estrutura do projeto

```
src/
  app.js               # configuracao do Express
  config/db.js         # conexao com o MongoDB
  controllers/         # logica das rotas
  models/Product.js    # schema do produto
  routes/v1/           # definicao das rotas da API
  scripts/seed.js       # script de povoamento inicial do banco
server.js               # ponto de entrada da aplicacao
```
