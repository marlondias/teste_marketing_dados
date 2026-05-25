# TO-DO List

## Essenciais

- Criar as tabelas "campanhas" e "metricas", segundo instruções.
  - Tabela "campanhas":
    - id SERIAL PRIMARY KEY,
    - nome VARCHAR(100),
    - data_inicio DATE,
    - data_fim DATE,
    - orcamento DECIMAL(10, 2)

  - Tabela "metricas":
    - id SERIAL PRIMARY KEY,
    - campanha_id INTEGER REFERENCES campanhas(id),
    - data_metrica DATE,
    - impressoes INTEGER,
    - cliques INTEGER,
    - conversoes INTEGER,
    - custo_por_clique DECIMAL(10, 2)

- Escrever uma query SQL que:
  - Calcule o CTR (Click-Through Rate) e o CPA (Custo por Aquisição) por campanha.
  - Identifique a campanha com o melhor ROI (considerando orçamento vs. conversões).

## Opcionais

- Nada ainda.
