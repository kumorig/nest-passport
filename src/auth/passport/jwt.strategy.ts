import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(
    private readonly authService: AuthService
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.SECRET_KEY,
      },
      async (req, payload, next) => await this.authService.verify(req, payload, next)
    )
    use(this)
  }

}