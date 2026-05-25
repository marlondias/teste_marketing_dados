# TO-DO List

## Essenciais

- Escrever uma query SQL que:
  - Calcule o CTR (Click-Through Rate) e o CPA (Custo por Aquisição) por campanha.
  - Identifique a campanha com o melhor ROI (considerando orçamento vs. conversões).

- Crie um script (Python ou JavaScript) que:
  1. Gere dados fictícios de métricas (ex: usando faker.js ou mockaroo).
  2. Calcule automaticamente:
  - Taxa de Conversão: (conversoes / cliques) * 100.
  - ROAS (Return on Ad Spend): (receita_gerada / orcamento) * 100 (assuma receita = conversoes * 100).
  3) Gere um relatório resumido em JSON ou CSV.

- Desenvolva uma API simples em Node.js (usando Express) com:
  - POST /webhook: Recebe dados de um webhook fictício (ex: simulando o Facebook Ads) e atualiza a tabela metricas.
  - GET /campanhas/:id/metricas: Retorna as métricas consolidadas em JSON (incluindo cálculos de CTR/CPA).

- Terminar o docker compose para também incluir o NodeJS.

## Opcionais

- Bônus (opcional): use Axios para consumir uma API externa fictícia (ex: https://api.ads-fake.com/data).

- Crie um script em Python que:
  1. Use Regressão Linear (scikit-learn) para prever conversões futuras com base nos dados históricos.
  2. Automatize o envio de um relatório por e-mail (usando smtplib).
