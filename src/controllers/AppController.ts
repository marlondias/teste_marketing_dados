import { Controller, Get } from '@nestjs/common';
import { AppWelcomeResponse } from './DTOs/ResponseDTOs';

@Controller()
export class AppController {
  @Get()
  get(): AppWelcomeResponse {
    return { message: 'API está funcionando.' };
  }
}
