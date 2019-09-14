import * as jwt from "jsonwebtoken";
import { IConfig } from "./interface";

export default class JWT {
  private readonly jwt: any;
  protected readonly config: IConfig;
  protected readonly defaultJWTConfig: any;
  protected readonly SECRET: string;

  constructor(config: IConfig) {
    this.config = config;
    this.SECRET = config.secret;
    this.jwt = jwt;
    this.defaultJWTConfig = { expiresIn: 60 * 60 * 24 };
  }

  // JWT sign method
  public sign(payload, jwtConfig?: any): Promise<string> {
    return this.jwt.sign(payload, this.SECRET, {
      ...this.defaultJWTConfig,
      ...jwtConfig
    });
  }

  // JWT decode method
  public decode(token: string): Promise<string> {
    return this.jwt.decode(token, this.SECRET);
  }

  // JWT verify method
  public verify(token: string): Promise<string> {
    return this.jwt.verify(token, this.SECRET);
  }
}
