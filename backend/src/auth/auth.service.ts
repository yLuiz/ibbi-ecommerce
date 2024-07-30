import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/http/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { MESSAGE } from 'src/shared/messages';
import { User } from '@prisma/client';
import { HandleError } from 'src/shared/errors/handleError';

@Injectable()
export class AuthService {
    constructor(
        private _jwtService: JwtService,
        private _userService: UserService,
      ) {}
    
      async signIn(
        email: string,
        password: string,
      ): Promise<{ access_token: string } | null> {

        let user: User | undefined;

        try {
          user = await this._userService.findByEmail(email);
        }
        catch (error) {
          if (error?.status === 404) {
            throw new HttpException(MESSAGE.AUTH.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
          }

          throw new HandleError(error);
        }

        if (!user) return null;

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        
        if (!isCorrectPassword) {
          throw new HttpException(MESSAGE.AUTH.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: user.id, email: user.email, name: user.name };
        
        return {
          access_token: await this._jwtService.signAsync(payload),
        };
      }
}