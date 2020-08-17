import { API, autoAPI, ExResult } from "./api";
import { Config, log } from "./util";


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
export default class Grammer {
    /**
     * Async init grammer service
     */
    static async new(): Promise<Grammer> {
        // Generate API
        const api = await autoAPI();
        const config = new Config();
        return new Grammer({ api, config });
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
        const amount = 1000;

        for (let index = 0; index < addrs.length; index++) {
            let addr = addrs[index];
            console.log(addr, amount);
            await this.transfer(addr, amount);
        }

        console.log('finish!');
    }

    /**
     * Transfer
     *
     * @param {String} addr - the target address
     */
    private async transfer(addr: string, amount: number): Promise<string> {
        // check if tx failed
        let ex: ExResult | null = null;
        try {
            ex = await this.api.transfer(
                addr, amount * 1000000000000
            );
        } catch (_) {
            return 'failed';
        }

        // return exHash
        if (ex && (ex as ExResult).isOk) {
            return 'succeed';
        } else {
            return 'failed';
        }
    }

}
