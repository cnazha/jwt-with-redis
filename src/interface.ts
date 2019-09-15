import {SignOptions} from "jsonwebtoken";


export interface IConfig {
  prefix?: string;
  secret?: string;
  env_key?: string
}

export interface ISignOptions extends SignOptions{
  expiresIn?: number // In seconds, to be compatible with redis
  notBefore?: number // In seconds, to be compatible with redis
}
