WITH
campanhas_com_totais AS (
	SELECT
		c.id AS campanha_id, 
		c.orcamento,
		SUM(m.custo_por_clique * m.cliques) AS custo_total,
		SUM(m.conversoes) * ($1)::numeric AS receita,
		COUNT(m.id) AS quant_metricas,
		SUM(m.impressoes) AS total_impressoes,
		SUM(m.cliques) AS total_cliques, 
		SUM(m.conversoes) AS total_conversoes
	FROM campanhas c 
	LEFT JOIN metricas m ON c.id = m.campanha_id
	WHERE ($2 IS NULL) OR ($2)::integer = c.id
	GROUP BY c.id
),
campanhas_com_calculos AS (
	SELECT
		c.campanha_id,
		c.orcamento,
		c.custo_total,
		(c.custo_total / NULLIF(c.orcamento, 0)) * 100 AS taxa_consumo_orcamento,
		(c.total_cliques::numeric / NULLIF(c.total_impressoes, 0)) * 100 AS ctr,
		(c.total_conversoes::numeric / NULLIF(c.total_cliques, 0)) * 100 AS taxa_conversao,
		(c.custo_total / NULLIF(c.total_conversoes, 0)) AS cpa,
		(c.receita / NULLIF(c.custo_total, 0)) * 100 AS roas,
		((c.receita - c.custo_total) / NULLIF(c.custo_total, 0)) * 100 AS roi
	FROM campanhas_com_totais c
)

SELECT
	c.*,
	CASE 
		WHEN ($2 IS NULL) THEN (roi = MAX(roi) OVER())::boolean
    ELSE FALSE 
	END AS is_melhor_roi
FROM campanhas_com_calculos c
