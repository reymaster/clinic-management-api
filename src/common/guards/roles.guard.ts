import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../../auth/roles.enum';
import { ROLES_KEY } from '../../auth/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ERole[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true; // Se não houver roles definidas, permite acesso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assumindo que o usuário está na requisição após a autenticação

    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException('Acesso negado');
    }

    return true;
  }
}
