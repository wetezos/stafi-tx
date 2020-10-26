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
        let gasPrice = 0;
        let exechFis =  0;
        let gasVote = 1;
        let gasExecute = 2;
        let voteCount = 2;
        let executeCount = 3;

        let rpc = new Rpc();

        while (1) {
            try {
                await rpc.getPrice('ETH/USDT').then(async (result: any) => {
                    ethPrice = result.data.ask[0];
                });

                await rpc.getPrice('FIS/USDT').then(async (result: any) => {
                    fisPrice = result.data.bid[0];
                });

                await rpc.getGasPrice().then(async (result: any) => {
                    if  (result.status == 1) {
                        gasPrice = result.result.ProposeGasPrice;
                    }
                    
                });

                console.log("eth price:" + ethPrice);
                console.log("fis price:" + fisPrice);
                console.log("gas price:" + gasPrice);

                if (ethPrice > 0 && fisPrice > 0 && gasPrice > 0) {
                    //exechFis  = (gasPrice * gasVote * voteCount + gasPrice * gasExecute * executeCount) * ethPrice / fisPrice;
                    exechFis = 621000 * gasPrice * ethPrice / fisPrice / 1000000000;
                    //exechFis = Number(exechFis.toPrecision(2));
                    exechFis = Number(exechFis);
                }

                console.log("exechfis:" + exechFis);

            } catch (_) {
                console.log('rpc error');
            }
            

            await this.sleep(1000 * 600);
        }
    }


    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

}
