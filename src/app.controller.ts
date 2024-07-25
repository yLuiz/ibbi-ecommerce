import { Controller } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Main')
@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
}
