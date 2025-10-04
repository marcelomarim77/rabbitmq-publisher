import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('publish/cat')
    async publishCat(@Body() data: any) {
        const result = await this.appService.publishCreateCat(data);
        Logger.log(`${JSON.stringify(result?.status)}`, this.constructor.name); // Loga o resultado
        return result;
    }
}
