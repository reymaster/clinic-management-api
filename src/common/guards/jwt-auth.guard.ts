import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.handleRequest(request);
  }

  async handleRequest(request: Request) {
    const token = request.headers?.authorization?.split(' ')[1] || null;

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.decode(token) as { email: string };

    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    request['user'] = user;

    return true;
  }
}
