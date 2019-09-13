import * as jwt from "jsonwebtoken";

import {IConfig} from "./interface";



class JWTR {
    private readonly config: IConfig;
    private readonly jwt;
    constructor(config: IConfig) {
        this.config = config;
        this.jwt = jwt;
    }

}


export default JWTR;
