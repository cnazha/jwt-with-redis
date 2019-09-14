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

  // Create object if payload is a string to support expiry
  public handlePayload(payload) {
    // Is an object and not array
    const isObject =
      typeof payload === "object" &&
      payload !== null &&
      !Array.isArray(payload);

    // Return object
    if (isObject) return payload;

    // Return as transformed object
    return {
      data: payload,
      jwr_objectified: true
    };
  }

  public revertPayload(payload) {
    if (payload.jwr_objectified) return payload.data;
    return payload;
  }

  // JWT sign method
  public sign(rawPayload, jwtConfig: any = {}): Promise<string> {
    const options = {
      ...this.defaultJWTConfig,
      ...jwtConfig
    };
    const payload = this.handlePayload(rawPayload);
    return this.jwt.sign(payload, this.SECRET, options);
  }

  // JWT decode method
  public decode(token: string): Promise<string> {
    const payload = this.jwt.decode(token, this.SECRET);
    return this.revertPayload(payload);
  }

  // JWT verify method
  public verify(token: string): Promise<string> {
    const payload = this.jwt.verify(token, this.SECRET);
    return this.revertPayload(payload);
  }
}
