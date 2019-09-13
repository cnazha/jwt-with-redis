import * as jwt from "jsonwebtoken";
import * as Redis from "ioredis"
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

    public sign(payload, jwtConfig?: any):Promise<string>  {
        return this.jwt.sign(payload, this.config.secret, {expiresIn: '1y', ...jwtConfig});
    }

    public verify(token: string): Promise<string>{
        return this.jwt.verify(token, this.config.secret);
    }



}

export default JWTR;
