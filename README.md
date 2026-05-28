# Teste prático para empresa de Marketing

## Escopo do projeto

Criar um sistema para análise de campanhas digitais com integração em tempo real.

### Domínio

- Marketing digital
- Growth marketing
- Campanhas de marketing

### Objetivos

- Consolidação e análise de dados.
- Cálculo de métricas chave (CTR, CPA, ROI, ROAS).
- Geração de relatórios (JSON, CSV).
- Criação de API (com webhook para atualizações em tempo real)

### Tecnologias desejadas

- SQL
- PostgreSQL
- Node.JS
- Typescript
- Express
- Axios

## Instalação

1) Você precisará ter o [Docker](https://www.docker.com/) instalado em seu dispositivo.

2) Verifique se existem outros processos em execução que utilizem as portas `5432`, `3000` ou `3030`. Isso pode causar problemas durante os próximos passos.

3) Na raiz do projeto, há um arquivo chamado `.env.example`. Crie uma cópia dele com o nome `.env`.

4) Para instalar o projeto na versão de **produção**, execute `docker compose up -d api_prod` e aguarde.

5) Para instalar o projeto na versão de **desenvolvimento**, execute `docker compose up -d api_dev` e aguarde.

6) Pronto! Agora leia as instruções de uso.

Atenção: O arquivo `.env` já contém os valores corretos para execução local. Você pode alterá-lo se quiser, mas saiba que isso tem grande efeito sobre a execução do projeto.

## Uso

O projeto cria uma base de dados PostgreSQL e uma API para interação com os dados das campanhas de marketing e suas métricas.

Não é necessário executar qualquer comando específico, pois há uma interface visual que permite uso pelo navegador.
Links para a interface Web:

- [API de produção](http://localhost:3030/openapi).
- [API de desenvolvimento](http://localhost:3000/openapi).

### Base de dados

Por simplicidade e economia de recursos, a aplicação usa a mesma base de dados em ambas as versões.

Caso queira acessar a base de dados diretamente, use os seguintes parâmetros:

- Tipo: PostgreSQL
- Host: `localhost` ou `127.0.0.1`
- Porta: `5432`
- Usuário: `postgres`
- Senha: `postgres`
