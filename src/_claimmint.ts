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
export default class ClaimMint {
    /**
     * Async init grammer service
     */
    static async new(): Promise<ClaimMint> {
        // Generate API
        const api = await autoAPI();
        const config = new Config();
        return new ClaimMint({ api, config });
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

        let preday = '';
        let day = '';

        let rpc = new Rpc();

        while (1) {
            
            let lastId = 0;
            let pageSize = 100;
            let lastPage = 2;

            let totalCount = 0;
            let totalAmount = 0;

            let map = new Map();

            while (lastPage == 2) {
                try {
                    await rpc.fetchClaimList({ isToast: false, lastId: lastId, pageSize: pageSize }).then(async (result: any) => {
                        if (result.status == '80000') {
                            lastId = result.data.lastId;
                            lastPage = result.data.lastPage;
                            day = time.formatDayDateTime(result.data.timestamp);

                            let date = new Date();
                            date.setTime(result.data.timestamp * 1000);
                            let h = date.getHours();
    
                            if (h < 4 || day != preday) {
                                const list = result.data.list;
                                for (let index = 0; index < list.length; index++) {
                                    let element = list[index];
                                    
                                    if (map.has(element.source)) {
                                        continue;
                                    }

                                    if (element.amount <= 0.01) {
                                        continue;
                                    }

                                    totalCount++;

                                    map.set(element.source, 1);
                                    let amount = Math.round(element.amount * 100000) / 100000;
                                    totalAmount += amount;
                                    console.log(element.source + ": " + amount + ", lastId: " + lastId);
                                    await this.mint(element.source, amount);
                                    await this.sleep(1000);
                                }
                            } else {
                                lastPage = 1;
                            }
                        } else {
                            lastPage = 1;
                        }
                    });

                } catch (_) {
                    lastPage = 1;
                }
                await this.sleep(1000 * 2);
            }

            console.log("Total count:" + totalCount);
            console.log("Total amount:" + totalAmount);

            preday = day;

            await this.sleep(1000 * 600);
        }
    }

    /**
     *
     * @param {String} addr - the target address
     */
    private async mint(addr: string, amount: number): Promise<string> {
        // check if tx failed
        let ex: ExResult | null = null;
        try {
            ex = await this.api.mintClaim(
                addr, Math.round(amount * 1000000000000)
            );
        } catch (_) {
            console.log("failed: " + _);
            return 'failed';
        }

        // return exHash
        if (ex && (ex as ExResult).isOk) {
            return 'succeed';
        } else {
            return 'failed';
        }
    }

    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

}
