import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

type ValidQueryNames = 'getCampaignsStats';

function getQueryFilePath(queryName: ValidQueryNames): string {
  return path.join(process.cwd(), 'typeORM', 'queries', `${queryName}.sql`);
}

export async function getQueryContents(
  queryName: ValidQueryNames,
): Promise<string> {
  try {
    const filePath = getQueryFilePath(queryName);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    throw new InternalServerErrorException(
      `Could not load SQL query (${queryName}).`,
    );
  }
}
