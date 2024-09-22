import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }
    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Senha inválida');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Salting rounds = 10
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'createdAt', 'updatedAt'],
    });
  }

  // Criar um novo usuário
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Criptografa a senha
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // Armazena a senha criptografada
    });
    return this.userRepository.save(user); // Salva no banco de dados
  }

  // Listar todos os usuários
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Buscar um usuário por ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  // Atualizar um usuário
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10); // Criptografar nova senha se fornecida
    }
    Object.assign(user, updateUserDto); // Atualizar os campos
    return this.userRepository.save(user); // Salvar alterações no banco de dados
  }

  // Remover um usuário
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
}
