import { Controller, Get, Redirect } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller()
@ApiExcludeController()
export class AppController {

    @Get()
    @Redirect('/documentation', 301)
    getDoc() {
        // Nothing here, Nest will redirect to API page.
    }
}