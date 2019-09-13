import * as jwt from "jsonwebtoken";
import Redis from "ioredis"
import {IConfig} from "./interface";


class JWTR {
    private readonly config: IConfig;
    private readonly jwt: any;
    private readonly redis;

    constructor(config: IConfig, redisConfig?: any) {
        this.config = config;
        this.jwt = jwt;
        this.redis = new Redis(redisConfig);
    }

    // JWT sign method
    public sign(payload, jwtConfig?: any): Promise<string> {
        return this.jwt.sign(payload, this.config.secret, {expiresIn: '1y', ...jwtConfig});
    }

    // JWT decode method
    public decode(token: string): Promise<string> {
        return this.jwt.decode(token, this.config.secret);
    }

    // JWT verify method
    public verify(token: string): Promise<string> {
        return this.jwt.verify(token, this.config.secret);
    }

    // Set token in Redis with prefix
    private async setToken(token: string, payload) {
        const {prefix = ''} = this.config;
        const key = prefix + token;
        this.redis.set(key, JSON.stringify(payload));
    }

    // Set token then return it
    public async addToken(payload, jwtConfig?: any) {
        const token = await this.sign(payload, jwtConfig);
        this.setToken(token, payload);
        return token;
    }

}

export default JWTR;
