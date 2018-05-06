import { use } from 'passport';
import { Strategy } from 'passport-local';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passReqToCallback: false
      },
      async (email, password, done) => {
        await this.authService.logIn(email, password, done)
      }
    );
    use(this);
  }

}