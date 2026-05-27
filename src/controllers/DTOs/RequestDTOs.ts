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
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  campanha_id!: number;

  @ApiProperty({
    description: 'Data em que a métrica foi calculada.',
    format: 'date',
  })
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  data_metrica!: string;

  @ApiProperty({ description: 'Quantidade de impressões recebidas.' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  impressoes!: number;

  @ApiProperty({ description: 'Quantidade de cliques recebidos.' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  cliques!: number;

  @ApiProperty({ description: 'Quantidade de conversões feitas.' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  conversoes!: number;

  @ApiProperty({
    description:
      'Custo financeiro de cada clique. Arredondado a 2 casas decimais.',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive()
  custo_por_clique!: number;
}
