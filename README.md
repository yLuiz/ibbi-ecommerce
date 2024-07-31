# IBBI E-commerce

Sistema com fluxo de E-commerce, sugerido como teste técnico pelo IBBI

# 🗃 Baixando o repositório
Para baixar e executar o sistema, faça download com os seguintes comandos:

``` bash
    git clone -b main https://github.com/yLuiz/ibbi-ecommerce.git
    cd ./ibbi-ecommerce
```

# 🖼 Front-end

## 💻 Tecnologias
* Angular (v17+)
* PrimeNG (v17)
* Node.js (v20.16.0)
* Typescript (v5.4.2)

## ⚙ Configuração
Para conseguir rodar o Front-end, você precisa ter instalado o Node.js e Angular 17.x.
Após isso, clone o repositório e entre na pasta `./frontend` e execute o seguinte comando para instalar as dependências do projeto:

``` bash
$ npm install
```
* Obs: Vale lembrar que o Backend precisa está configurado e ligado para a aplicação funcionar

## 🚀 Executando (Sem o Docker)
Após a instalação das dependências, execute o seguinte comando:

``` bash
$ npm start
```

## 🚀 Executando (Com o Docker)
Caso não queira ter problemas com ambiente, rode os seguintes comando docker:

``` bash
$ docker-compose build
$ docker-compose up -d
```

Depois é só acessar em sua máquina o seguinte endereço: `http://localhost:4200/`

# 📡 Back-end

# 💻 Tecnologias
* JavaScript
* Node.js (v20.16.0)
* Nest.js (v10)
* PrismaORM (v5.17.0)
* MySQL 8

## ⚙ Configuração
Para conseguir rodar o Backe-end, você precisa ter instalado o Node.js na versão 20.16.0 em sua máquina.
Após isso, clone o repositório e entre na pasta `./backend` e execute os seguintes passos:

- Primeiramente, verifique o arquivo .env da sua aplicação, ele deve contar duas variaveis:
``` bash
    DATABASE_URL="mysql://user:password@localhost:3306/your_databse?createDatabaseIfNotExist=true&schema=public"
    JWT_SECRET="your_secret_key
```

- Rode o comando:
``` bash
    $ npm install
```

- Será necessário executar as entidades via Prisma para que as colunas no banco de dados sejam gerados, para isso rode:
``` bash
    $ npx prisma db push
```

- Após o comando executar com sucesso, execute o próximo comando:
``` bash
$ npx prisma generate
```
- Feito os passos para executar o banco, agora é necessário popular alguns dados de Categoria, então rode o seguinte comando:
 ``` bash
$ npm run seed
```

## 🚀 Executando (Sem o Docker)
Após a configurção, execute o seguinte comando:

``` bash
$ npm run start:dev
```

## 🚀 Executando (Com o Docker)
Caso não queira ter problemas com ambiente, rode os seguintes comando docker:

``` bash
$ docker-compose build
$ docker-compose up -d
```

## 🔀 Rotas
Para saber quais as rotas existentes, acesse: `https://localhost:3000/api/`.
- Vale lembrar que o swagger só irá funcionar em ambiente de desenvolvimento.

# Considerações
--
# Observações

* Neste projeto, utilizei no backend um Design Pattern conhecido como IoC (Inversion of Controll) e para sua implementação utilizei a técnica conhecida como Dependency Injection, que representa a letra D do conhecido SOLID.
* Caso haja alguma coisa que eu possa melhorar no sistema, estarei totalmento aberto a criticas. Afinal, assim posso melhorar minhas habilidades no desenvolvimento.
* Qualquer dúvida em relação ao teste, entre em contato via telefone (caso tenha) ou email: luizvictor1231@gmail.com


