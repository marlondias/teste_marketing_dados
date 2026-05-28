import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

type ValidQueryNames = 'getCampaignsStats';

function getQueryFilePath(queryName: ValidQueryNames): string {
  return path.join(__dirname, 'queries', `${queryName}.sql`);
}

export async function getQueryContents(
  queryName: ValidQueryNames,
): Promise<string> {
  const filePath = getQueryFilePath(queryName);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    throw new InternalServerErrorException(
      `Could not load SQL query (${filePath}).`,
    );
  }
}
