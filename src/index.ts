import Redis from "ioredis"
import {IConfig} from "./interface";
import JWT from "./JWT";


class JWTR extends JWT {

    private readonly redis;

    constructor(config: IConfig, redisConfig?: any) {
        super(config);
        this.redis = new Redis(redisConfig);
    }

    // Generate redis key
    private generateKey(token) {
        const {prefix = ''} = this.config;
        return prefix + token;
    }

    // Set token in Redis with prefix
    private async setToken(token: string, payload, config) {
        const {expiresIn} = config;
        const key = this.generateKey(token);
        const data = JSON.stringify(payload);
        this.redis.set(key, data, "EX", parseInt(expiresIn));
    }

    // Set token then return it
    public async addToken(payload, jwtConfig?: any) {
        const token = await this.sign(payload, jwtConfig);
        this.setToken(token, payload, jwtConfig = this.defaultJWTConfig);
        return token;
    }

    // Retrieves payload for token
    public async getToken(token) {
        const key = this.generateKey(token);
        return this.redis.get(key);
    }

    public async revokeToken(token) {
        const key = this.generateKey(token);
        return this.redis.del(key);
    }
}

export default JWTR;
