import * as jwt from "jsonwebtoken";

import {IConfig} from "./interface";


class JWTR {
    private readonly config: IConfig;
    private readonly jwt: any;

    constructor(config: IConfig) {
        this.config = config;
        this.jwt = jwt;
    }

    public generateToken(payload, jwtConfig?: any):Promise<string>  {
        return this.jwt.sign(payload, this.config.secret, {expiresIn: '1y', ...jwtConfig});
    }

    public verifyToken(token: string): Promise<string>{
        return this.jwt.verify(token, this.config.secret);
    }

}


export default JWTR;
