import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { REFRESH_TOKEN_EXPIRE_IN } from 'src/configs/constants';
import { generateOpaqueToken } from 'src/common/helpers/token.helper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  createToken({ userId }: { userId: string }) {
    return this.jwtService.sign({ userId: userId });
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
