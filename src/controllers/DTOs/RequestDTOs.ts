import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CampanhaCreateMocksRequest {
  @ApiProperty({ description: 'Quantidade de registros ficticios a criar.' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  amount!: number;
}

export class WebhookAddExternalMetricRequest {
  @ApiProperty({ description: 'ID da campanha a qual essa métrica se refere.' })
  @IsInt()
  @IsPositive()
  campanha_id!: number;

  @ApiProperty({
    description: 'Data em que a métrica foi calculada.',
    format: 'date',
  })
  @IsISO8601({ strict: true })
  data_metrica!: string;

  @ApiProperty({ description: 'Quantidade de impressões recebidas.' })
  @IsInt()
  @IsPositive()
  impressoes!: number;

  @ApiProperty({ description: 'Quantidade de cliques recebidos.' })
  @IsInt()
  @IsPositive()
  cliques!: number;

  @ApiProperty({ description: 'Quantidade de conversões feitas.' })
  @IsInt()
  @IsPositive()
  conversoes!: number;

  @ApiProperty({
    description:
      'Custo financeiro de cada clique. Arredondado a 2 casas decimais.',
  })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  custo_por_clique!: number;
}
