import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  ACCESS_TOKEN_EXPIRE_IN,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRE_IN,
} from 'src/configs/constants';
import * as jwt from 'jsonwebtoken';
import { generateOpaqueToken } from 'src/common/helpers/token.helper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  createToken({ userId }: { userId: string }) {
    return jwt.sign({ userId: userId }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE_IN,
    });
  }

  async createRefreshToken({ userId }: { userId: string }) {
    const refreshToken = generateOpaqueToken();
    await this.cacheManager.set(
      `refresh-token:${userId}`,
      refreshToken,
      REFRESH_TOKEN_EXPIRE_IN,
    );
    return refreshToken;
  }

  async checkPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
