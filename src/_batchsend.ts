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
export default class Batchsend {
    /**
     * Async init grammer service
     */
    static async new(): Promise<Batchsend> {
        // Generate API
        const api = await autoAPI();
        const config = new Config();
        return new Batchsend({ api, config });
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
        
        var accounts = [
            '32aF1qzEXakTf2YSLn7ceHu3NMyxSoP1cMMAPMwVabD2W9vH',
'32hHLx6fMpEjkqF8HJGnKrFipwkVBJ6NLJhf1yD9Sv99pgc4',
'34RmGuYdsPEKegSp2WjK8mzavBZqEeibbiG14z56DuMmtv7f',
'2zkwCidzxytPt2zHuWzZUv7FGzhdrVTXpbhzVc3JL8nBQEDG',
'32vTUEMJUf7NFG8Awu5Wc1cE6kWyrx89gz2mjN5L1h2QpTkE',
'31aTiDFzL64zAyYmP5VPG19jd79mhZTXoHqj2vt1yJS6riBD',
'34CqQCQGfFLSszWm21rm8f4WFWdrrb5AZ1xfEk1fF9dKdptK',
'33kPK1X26H6HJHre6gzaHmzcGdwcaCwrExybBaM5hpLVamMF',
'33UcfL4nctjJVTPgxyR778xak7VfF6JHDVz95cFZXf9ZgoE4',
'32Z8T4ybWa3Mub2g3BsBvATDTs36afu1tGDuPGjvz8vLkrxN',
'31DRi6tKcv3Z74boAJKxghGmanEyF8YPK8n4FMLidzRy26qt',
'34nj3LVH7m8SApPdDgLaFBWfHm7qDC6kdbqoQzumXVeabA6d',
'331sccYxcuujmGN8MHtjsowhjsRGa7qfWhLPe5B36XAQ5pGV',
'32fSTtAgHVtKvYiSBQWdxzqbZFEn8mhXH75T7yY1sDU5r4ve',
'35mnMHQPyYUx84tzdRjM5vhvTckxWnHzX3TYaGTwqyuviYc1',
'31LRg53pEfNE9GP8Sog8futMrwhzafHqn4P9pNwLX1wAB1MY',
'35ucD9R4dy3VpYuittiLwMv3XdTakJAUAcRn72fPWgFsv15J',
'31cLpT3BEhwH2sojrzqZs9kYHEEC6j9qQKWAwSQ6Y54kn4ze',
'2zmQW9k8fyDgaityCVMXoffbrG6sVefD9bNky2siR2ZwuEj3',
'35s9AvRWMdWmorYmFK1Rt2Sq2PUqfRMGufrFTBVoLVZh9A9Q',
'31spxmNaDgYCAZMv9D3QEuC1fKPjnZuC1hyTKiJWtFsJDLqy',
'32ycJN2UkPDZAoJyhfhLzo2hPetWWi1eQeyr2sCcwDMNkUm3'
        ];
        var ammounts = [
            140.9756098,
104.2276423,
99.43089431,
69.91869919,
69.26829268,
66.17886179,
62.15447154,
54.63414634,
53.65853659,
52.96747967,
46.2195122,
41.70731707,
35.93495935,
33.98373984,
28.45528455,
26.42276423,
25.20325203,
22.19512195,
20.32520325,
18.21138211,
14.30894309,
40.6504065
        ];

        console.log('account length:' + accounts.length);
        console.log('ammount length:' + ammounts.length);

        if (accounts.length != ammounts.length) {
            console.log('length not match');

            return '';
        }

        for (var _i = 0; _i < accounts.length; _i++) {
            var accountAddress = accounts[_i];
            var accountAmount = ammounts[_i];
            console.log(accountAddress + ':' + accountAmount);
        }

        console.log('wait 60s.........');
        await this.sleep(1000 * 60);

        for (var _i = 0; _i < accounts.length; _i++) {
            var accountAddress = accounts[_i];
            var accountAmount = Math.round(ammounts[_i] * 1000000000000);
            console.log(accountAddress + ':' + accountAmount);

            try { 
                let ex: ExResult | null = null;
                ex = await this.api.transfer(accountAddress, accountAmount);
                // return exHash
                 if (ex && (ex as ExResult).isOk) {
                    console.log('tx res' + ex + accountAddress + ':' +accountAmount);
                } else {
                    console.log('tx error:' + accountAddress + ':' +accountAmount);
                } 
                
                console.log('执行到：' + _i);

            } catch (_) {
                console.log('send error');
            }
        }

        return '';
    }


    private sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

}
