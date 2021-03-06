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

        const ethChainId = 2;

        let rpc = new Rpc();

        try {
            await rpc.getPrice('ethusdt').then(async (result: any) => {
                if(result.status == 'ok') {
                    ethPrice = result.tick.ask[0];
                }
            });

            await rpc.getPrice('fisusdt').then(async (result: any) => {
                if(result.status == 'ok') {
                    fisPrice = result.tick.bid[0];
                }
            });

            // await rpc.getGasPrice().then(async (result: any) => {
            //     if  (result.status == 1) {
            //         gasPrice = result.result.ProposeGasPrice;
            //     }
                
            // });

            await rpc.getGasPricePost().then(async (result: any) => {
                gasPrice = parseInt(result.result, 16) / 1000000000 + 10;
            });

            console.log("eth price:" + ethPrice);
            console.log("fis price:" + fisPrice);
            console.log("gas price:" + gasPrice);

            if (ethPrice > 0 && fisPrice > 0 && gasPrice > 0) {
                //exechFis  = (gasPrice * gasVote * voteCount + gasPrice * gasExecute * executeCount) * ethPrice / fisPrice;
                exechFis = 220000 * gasPrice * ethPrice / fisPrice / 1000000000;
                exechFis = Number(exechFis.toFixed(6));

                if(exechFis < 5000 && exechFis > 1) {
                    let fees = Math.round(exechFis * 1000000000000);
                    console.log("exechfis:" + exechFis);
                    console.log("fees:" + fees);
                    // check if tx failed
                    let ex: ExResult | null = null;
                    ex = await this.api.setChainFees(ethChainId, fees);

                    // return exHash
                    if (ex && (ex as ExResult).isOk) {
                        console.log('tx res' + ex);
                    } else {
                        console.log('tx error');
                    }  
                }
            }
            

        } catch (_) {
            console.log('rpc error');
        }
        
        console.log('end');
        await this.sleep(1000*30);
        process.exit();
    }


    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

}
