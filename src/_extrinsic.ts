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
    public async run(startBlock: string, endBlock: string) {
        console.log('begin!');

        let blockNum = parseInt(startBlock);
        let endBlockNum = parseInt(endBlock);

        let rpc = new Rpc();

        while (1) {
            try {
                console.log(blockNum);
                await this.api.getBlock(blockNum).then(async (signedBlock) => {
                    // the information for each of the contained extrinsics
                    signedBlock.block.extrinsics.forEach(async (ex, index) => {
                        // the extrinsics are decoded by the API
                        if (ex.method.section == 'balances' && ex.method.method == 'transfer') {
                            console.log("From: " +  ex.signer);
                            console.log("To: " + ex.method.args[0]);
                            console.log("Amount: " + ex.method.args[1]);
                            try {
                                await rpc.fetchTx({
                                    isToast: false,
                                    source: ex.signer,
                                    destination: ex.method.args[0],
                                    amount: ex.method.args[1],
                                    block: blockNum
                                }).then(async (result: any) => {
                                    if (result.status == '80000') {
                                        console.log(blockNum + " - success");
                                    }
                                });

                            } catch (_) {}

                        }
                    });
                })
                blockNum++;
                if (blockNum > endBlockNum) {
                    break;
                }
                await this.sleep(10);
            } catch (_) {
                console.log("failed: " + _);
                return 'failed';
            }
        }
    }

    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

}
