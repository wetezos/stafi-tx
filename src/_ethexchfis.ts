import { API, autoAPI, ExResult } from "./api";
import { Config, time } from "./util";
import Rpc from "./http/rpc";

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
export default class Ethexchfis {
    /**
     * Async init grammer service
     */
    static async new(): Promise<Ethexchfis> {
        // Generate API
        const api = await autoAPI();
        const config = new Config();
        return new Ethexchfis({ api, config });
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

        let ethPrice = 0;
        let fisPrice = 0;

        let rpc = new Rpc();

        while (1) {
            try {
                await rpc.getPrice({ symbol: 'BTMX/USDT'}).then(async (result: any) => {
                    console.log(result.data.bid[0]);
                });
            } catch (_) {
                console.log('rpc error');
            }
            console.log("Total count:" + ethPrice);
            console.log("Total amount:" + fisPrice);

            await this.sleep(1000 * 600);
        }
    }


    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

}
