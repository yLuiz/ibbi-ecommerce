import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/http/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { MESSAGE } from 'src/shared/messages';

@Injectable()
export class AuthService {
    constructor(
        private _jwtService: JwtService,
        private _userRepository: UserService,
      ) {}
    
      async signIn(
        email: string,
        password: string,
      ): Promise<{ access_token: string } | null> {
        const user = await this._userRepository.findByEmail(email);

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