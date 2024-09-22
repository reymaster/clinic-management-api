import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Método para deslogar o usuário
  async logout() {
    return { access_token: null };
  }

  // Método para renovar o token de acesso a partir do token JWT válido
  async renewToken(body: any) {
    const payload = this.jwtService.decode(body.token) as JwtPayload;

    if (!payload) {
      return { access_token: null };
    }

    // Se o usuário não existir, retornar null
    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      return { access_token: null };
    }

    return {
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user || !this.userService.validatePassword(password, user.password)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
