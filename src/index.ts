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


    // Generate token with prefix
    private async generateToken(payload, jwtConfig?: any) {
        const {prefix = ''} = this.config;
        const token = await this.sign(payload, jwtConfig);
        return prefix + token;
    }

}

export default JWTR;
