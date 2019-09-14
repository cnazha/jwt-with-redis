import * as jwt from "jsonwebtoken";
import {IConfig} from "./interface";

export default class JWT {
    private readonly jwt: any;
    protected readonly config: IConfig;
    protected readonly defaultJWTConfig: any;
    protected readonly SECRET: string;

    constructor(config: IConfig) {
        this.config = config;
        this.SECRET = config.secret;
        this.jwt = jwt;
        this.defaultJWTConfig = {expiresIn: 60 * 60 * 24};
    }

    // Create object if payload is a string to support expiry
    protected handlePayload(payload) {
        // Is an object and not array
        const isObject = typeof payload === "object" &&
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
        return this.jwt.decode(token, this.SECRET);
    }

    // JWT verify method
    public verify(token: string): Promise<string> {
        return this.jwt.verify(token, this.SECRET);
    }
}
