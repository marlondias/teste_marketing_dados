import { Controller, Get } from '@nestjs/common';
import { AppWelcomeResponse } from './DTOs/ResponseDTOs';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  get(): AppWelcomeResponse {
    return { message: 'API está funcionando.' };
  }
}
