import { API, autoAPI, ExResult } from "./api";
import { Config, log } from "./util";
import {
    encodeAddress, decodeAddress
} from '@polkadot/util-crypto';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import fs from "fs";
import os from "os";
import path from "path";


/**
 * this is the interface of Grammer service
 */
export interface IGrammerConfig {
    api: API;
    config: Config;
}

/**
 * Grammer Service
 *
 * @property {Config} config - ~/.stafi/config.json
 * @property {API} api - stafi api
 */
export default class Public {
    /**
     * Async init grammer service
     */
    static async new(): Promise<Public> {
        // Generate API
        const api = await autoAPI();
        const config = new Config();
        return new Public({ api, config });
    }

    protected config: Config;
    private api: API;

    constructor(conf: IGrammerConfig) {
        this.api = conf.api;
        this.config = conf.config;
    }

    /**
     * serve grammer with specfic key
     *
     */
    public async run() {
        console.log('begin!');

        const addrs = this.config.addrs;

        const home = os.homedir();
        const root = path.resolve(home, ".stafi");
        const output = path.resolve(root, "output-public.json");

        let publicAddrs = [];

        for (let index = 0; index < addrs.length; index++) {
            let addr = addrs[index];
            let publicAddr = u8aToHex(decodeAddress(addr, false, 20));

            publicAddrs.push([publicAddr.slice(2), "1000000000000000"]);
        }

        fs.writeFileSync(output, JSON.stringify(publicAddrs));

        console.log('finish!');
    }

}
