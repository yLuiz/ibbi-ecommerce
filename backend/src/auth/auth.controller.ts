import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthDTO } from "src/shared/dtos/input/AuthDTO";
import { HandleError } from "src/shared/errors/handleError";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { Public } from "./public";
import { IAuthResponse } from "src/shared/interfaces/IAuthResponse";

@ApiTags('Auth')
@Controller('v1')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @Post("auth")
  async signIn(@Body() signInDto: AuthDTO) {

   try {
    const isAuthenticated = await this._authService.signIn(signInDto.email, signInDto.password);

    return isAuthenticated;
    
   } catch (error) {
    throw new HandleError(error);
   }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Req() req: IAuthResponse) {
    return req.user;
  }
}