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

        const home = os.homedir();
        const root = path.resolve(home, ".stafi");
        const output = path.resolve(root, "output-total.json");

        const output2 = path.resolve(root, "output-total-addr.json");

        const output3 = path.resolve(root, "output-total-address.json");

        const output4 = path.resolve(root, "output-total-amount.json");


        const total1 = path.resolve(root, "total-1.json");
        const total1Data = JSON.parse(fs.readFileSync(total1, "utf8"));

        const total2 = path.resolve(root, "total-2.json");
        const total2Data = JSON.parse(fs.readFileSync(total2, "utf8"));

        const total3 = path.resolve(root, "total-3.json");
        const total3Data = JSON.parse(fs.readFileSync(total3, "utf8"));

        const total4 = path.resolve(root, "total-4.json");
        const total4Data = JSON.parse(fs.readFileSync(total4, "utf8"));

        console.log(total1Data.length, total2Data.length, total3Data.length, total4Data.length);

        let map = new Map();
        for (let index = 0; index < total1Data.length; index++) {
            let t = total1Data[index];
            let address = t[0];
            let amount = t[1];
            if (map.has(address)) {
                map.set(address, map.get(address) + amount);
                continue;
            }
            map.set(address, amount);
        }

        for (let index = 0; index < total2Data.length; index++) {
            let t = total2Data[index];
            let address = t[0];
            let amount = t[1];
            if (map.has(address)) {
                map.set(address, map.get(address) + amount);
                continue;
            }
            map.set(address, amount);
        }

        for (let index = 0; index < total3Data.length; index++) {
            let t = total3Data[index];
            let address = t[0];
            let amount = t[1];
            if (map.has(address)) {
                map.set(address, map.get(address) + amount);
                continue;
            }
            map.set(address, amount);
        }

        for (let index = 0; index < total4Data.length; index++) {
            let t = total4Data[index];
            let address = t[0];
            let amount = t[1];
            if (map.has(address)) {
                map.set(address, map.get(address) + amount);
                continue;
            }
            map.set(address, amount);
        }


        let publicAddrs: any[] = [];

        let publics: any[] = [];

        let publics2: any[] = [];

        let publics3: any[] = [];

        let totalAmount = 0;

        map.forEach(function (value, key) {
            totalAmount += value;
            publics.push([key, value]);

            publics2.push(key);

            publics3.push(value);

            let publicAddr = u8aToHex(decodeAddress(key, false, 20));
            publicAddrs.push([publicAddr.slice(2), Number(value) * 1000000000000]);
        });
        
        console.log(publics.length);
        console.log(totalAmount);

        fs.writeFileSync(output, JSON.stringify(publicAddrs));

        fs.writeFileSync(output2, JSON.stringify(publics));

        fs.writeFileSync(output3, JSON.stringify(publics2));

        fs.writeFileSync(output4, JSON.stringify(publics3));

        console.log('finish!');
    }

}
