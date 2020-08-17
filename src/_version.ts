import { API, autoAPI, ExResult } from "./api";
import { Config, log } from "./util";
import {
    encodeAddress, decodeAddress
} from '@polkadot/util-crypto';
import { u8aToHex, hexToU8a, arrayFilter } from '@polkadot/util';
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
export default class Version {
    /**
     * Async init grammer service
     */
    static async new(): Promise<Version> {
        // Generate API
        const api = await autoAPI();
        const config = new Config();
        return new Version({ api, config });
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
    // public async run() {
    //     console.log('begin!');

    //     const addrs = this.config.addrs;

    //     const home = os.homedir();
    //     const root = path.resolve(home, ".stafi");
    //     const output = path.resolve(root, "output-upgrade.json");

    //     const version = path.resolve(root, "version.json");

    //     const versions = JSON.parse(fs.readFileSync(version, "utf8"));

    //     let publicAddrs = [];
    //     let map = new Map();

    //     for (let k in versions) {
    //         let s = versions[k];
    //         let peer_version = s["peer_version"];
    //         if (peer_version.indexOf("v0.2.1") !== -1) {
    //             let arr = peer_version.split("|");
    //             if (arr.length >= 2) {
    //                 let address = arr[1].trim().substr(0, 10).trim();
    //                 if (map.has(address)) {
    //                     console.log(222, address);
    //                     continue;
    //                 }
    //                 console.log(111, address);
    //                 for (let index = 0; index < addrs.length; index++) {
    //                     let addr = addrs[index];
    //                     if (addr.indexOf(address) !== -1) {
    //                         publicAddrs.push(addr);
    //                         map.set(address, 1);
    //                     }
    //                 }
    //             }
    //         }
    //     }


    //     fs.writeFileSync(output, JSON.stringify(publicAddrs));

    //     console.log('finish!');
    // }

    public async run() {
        console.log('begin!');

        const addrs = this.config.addrs;

        const home = os.homedir();
        const root = path.resolve(home, ".stafi");
        const output = path.resolve(root, "output-uptime.json");

        const uptime = path.resolve(root, "uptime.json");

        const uptimes = JSON.parse(fs.readFileSync(uptime, "utf8"));

        let publicAddrs = [];
        let map = new Map();

        for (let k in uptimes) {
            let s = uptimes[k];
            let peer_version = s["peer_version"];
            let arr = peer_version.split("|");
            if (arr.length >= 2) {
                let address = arr[1].trim().substr(0, 10).trim();
                if (map.has(address)) {
                    console.log(222, address);
                    continue;
                }
                console.log(111, address);
                for (let index = 0; index < addrs.length; index++) {
                    let addr = addrs[index];
                    if (addr.indexOf(address) !== -1) {
                        publicAddrs.push(addr);
                        map.set(address, 1);
                    }
                }
            }
        }


        fs.writeFileSync(output, JSON.stringify(publicAddrs));

        console.log('finish!');
    }

}
