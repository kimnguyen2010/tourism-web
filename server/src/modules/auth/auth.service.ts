import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service.js";
import { createSessionToken, extractBearerToken, hashPassword, normalizeEmail, verifyPassword } from "../../utils/auth.js";
import { LoginInput } from "./dto/login.input.js";
import { RegisterInput } from "./dto/register.input.js";
import { UserModel, UserRole } from "./models/user.model.js";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentUser(authHeader: string): Promise<UserModel | null> {
    const token = extractBearerToken(authHeader);

    if (!token) {
      return null;
    }

    const session = await this.prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      return null;
    }

    return this.mapUser(session.user);
  }

  async register(input: RegisterInput): Promise<{ token: string; user: UserModel }> {
    const name = input.name.trim();
    const email = normalizeEmail(input.email);
    const password = input.password.trim();

    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error("Email đã được sử dụng.");
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
        role: "USER"
      }
    });

    const token = createSessionToken();

    await this.prisma.session.create({
      data: {
        token,
        userId: user.id
      }
    });

    return {
      token,
      user: this.mapUser(user)
    };
  }

  async login(input: LoginInput): Promise<{ token: string; user: UserModel }> {
    const email = normalizeEmail(input.email);
    const password = input.password.trim();

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw new Error("Email hoặc mật khẩu không đúng.");
    }

    const token = createSessionToken();

    await this.prisma.session.create({
      data: {
        token,
        userId: user.id
      }
    });

    return {
      token,
      user: this.mapUser(user)
    };
  }

  async logout(authHeader: string): Promise<boolean> {
    const token = extractBearerToken(authHeader);

    if (!token) {
      return false;
    }

    await this.prisma.session.deleteMany({
      where: { token }
    });

    return true;
  }

  private mapUser(user: { id: string | number; name: string; email: string; role: string; createdAt: Date }): UserModel {
    return {
      id: String(user.id),
      name: user.name,
      email: user.email,
      role: user.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
      createdAt: user.createdAt.toISOString()
    };
  }
}
