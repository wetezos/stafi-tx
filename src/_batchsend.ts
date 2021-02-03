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
            '35xF6khCcZb6PHKvng5SvGFWQE73YUrzFAkgWg8sutiUihqK',
            '35jhL2ojCWMCsZQAwiCJnyKUWaHPb7EdZDEoXmRZfpNHj3P3',
            '33S1ovfqUcShY3HjV4KFSV4Rz3ptAHhfMEcYYNvEFNDuWqa8',
            '34NrMWQwT9N9j3gEukJZvQ1evfEmwBGdcfhpcEui6t7w1HZm',
            '369F6P3ei9eHg7kUfEVtu7NsCkTSVx3LbiVJni39JstSN8uK',
            '33w1MTqJPh6XZLg8qxuFNPbexMnLpfmU2Ywboq4zsH6b6UzU',
            '2zmKtsQTtd1nQaN3tBz2Q2DsiWGLC948h7v5ErqttppPpaJh',
            '33nMyuEQHpqCHiZd6M3pujWjsrRQuSFeJ4nSDLaKdekstfNX',
            '33hH5nbrygJVb2EJQDJEChAGur4Z2WAS7d9GH1EJ67mU2q3f',
            '34cAWGBePU16YTtP1zGGj2i7DhdgJzBCkGQzJLEAExPa1gYS',
            '34sWh1TteiF5AfH3qDDJoFgeEMGMew9jGfJGqmQvodqaaEpZ',
            '34v1p6gVsjWcAXCjouv5XzUpwNVfC1YBKEzWgtxHmehGRZZu',
            '34pPKN7LY69yGxsTiWAR5kSEA9NokFwG6UTmEVxShp5L9mWg',
            '31PegD6WCmVF2xUgwD4mSLpDBWMWjrRA3eZBB2s46AaCLBQ6',
            '31y9hFgm4ssHALU1xA95Sj3aoqZ1q4ZuZ9pZtDMawVv3TAhb',
            '32PnW2kDtW6cENRauB3jEtdpu9fHEci8TGmCtr4aU5kpSiM1',
            '32JQfHJMDXarvZaHp1na63JpH4SXgdQdCKQzVgaCAtGM9M3v',
            '368QexYmBDgD86YRutwJfwoCqauLBxFGKQgsZN9xaq1H555n',
            '2zkzcfMTrrqe51bwTPUChXBjWgXzwBupdxkc4psjE2R8WnVe',
            '33vXeRnm1JqPQ1kcpGtCN7UcGZJBgUDYEzoJDMwTux5rVzqK',
            '31d9QXVpXQHsjwKMDjrAuNdgSRrUdxP97dLQrsnTPMs1qxkC',
            '34vYcGbLBwHxAtcfNwsDQHC6TfxR3TyUBdpi2nnP97JnsnzN',
            '32brxM2qrZHTuBfKbP3hg1D1usPYGtWK1tasJWuj6jNtLM4M',
            '32jiqaWbP6cStSM2zqyGTFtrZKKGnoxS5ZXtDF4VCYzmsKhr',
            '36VVZK7YUXBi1wXmt4B73GpDjcjd1sKY94hj76VAaSVJXnMf',
            '32vgvTucWn5QL8Uj2Ah9Q1XZGhFPesQAQZ8VYejHBaBHKtcZ',
            '36HDmWH1289PWnDUizsuTwwMh5TjtKynPVkqLyFtLJtwN6bb',
            '32A4VN3szNGDAgXe6hregqbMVNgWEFW1p3JaTncxWagP8bRg',
            '35QRnMke3czH5yS7vCpWcGKTY3FhthENuB5hzaraVMBf5xLs',
            '34vMZPUwB5qaBWxZant6LwSDtz2X3GQnfUDaWD8QLcvHJAp7',
            '34qG2fZRocmf5FwGJC9vF7cahWRC6MkCJXnGz1j8XbgUDKSk',
            '33X6pX6EHU58YwWHnmDC9RsNcMTMkFKH4HtEMJ58Hpp4eNJB',
            '33nMaUGRHz8p1vhwbraKfwqSa5YnnYEf1T3ZKcYS91ckKCy4',
            '33vTCWinKXJtEDiZU5gW9TQFpxEqdGuu3rjfV4r7WPTLjNX7',
            '35YSEzkUbK5T2fnNgPMeaT7h5y7jrvdTo1hN6xwFoP2ewbvX',
            '3448NgYcReh694AChwBKieYKS9bw1FRwBfxJj5HZK99GmqhE',
            '32pyLjqRmUf4oR4VZUUPbspWU2r3DXvfnx5M2c61eu4NHHwx',
            '35bL9GvfXfGM85weGaCjyfQMwoULYWa1hRFFMqF5v8prUAVF',
            '34ZMATja3ZA7MDQW9VidXxFcpYtTJz5ztjR8mrSfCBRX4xEX',
            '33MATwyrrUmkQmopdiyu4tnJ1YJcTQeszyq3KMLfu2A1MHd4',
            '34C5CzxhXD5aWWeKgT15ajpsJirL9mzcNbKzTpzbZmVkX5k7',
            '31DevTRbnhaTmJiKNRyJGsQYSMvKe8n6HEYZQcywdouKnhoG',
            '32RPqe7b3eQcv3BrswEuzt6yDFVjeAzkGvPkhqsTAZREaKnu',
            '35gcUp1qyPuRkmNibPfferGx8Z2gxbRkGSF1MgkbgDwcTd7V',
            '31oK8K1F2csDJgryAkCGHBim1dYDYHSSnZHBxHyYnzqUB884',
            '33RY2Wt38fsNnxVDxj4udQaeU4aW6Rb5q31mz4dgbbcaqWr8',
            '3324dVLgmAcpv15bqFjvg75XLzhQYymG4tbiibViPqZEKcyr',
            '315PbrEtUgNLiSJUMwJwibSrYztcCNbdrqi8bh3xuRgL7QX3',
            '32UrCM2KieUDQ3zb3wtoLmMUJNNoXNKjgcz39LboFYTemVGW',
            '32PBrJgD2XsHj9KpV54FwmZCw1NfDVuXgDnG6aLv78LdFBbh',
            '32JCBPu9Gwvn9ax4g3cgqApYTZD1fRbJRiEDn9Ubm6HAQCmn',
            '32t8teGjot2Mgwaw3qRCmtgpnwDG976XMNkPTA7YHmNTH2T1',
            '32vKFvsoAa9Za2uGyS4Ub2wnvZ396dwNX3b2kxSktN3sTjoZ',
            '35Eo48LSkoE5YgQMe2hcCNPmspWuUaXUcdYTDH3SkibXtPQr',
            '33Rw688dscLv29gvrizLg7r4DVGdSLt5mhY7zS6rDrqJnsG5',
            '35rkofnnosYfQuJKLzKppgG1kvF41aDMWKXCvrQjvCBUnx1D',
            '31LKpGxiT3zX7ZfR6hXPsavg3eyUFzRzetrLDRkfv1iN7Hgv',
            '33e8Cj8cHEUUHNZKXW9pM1avy7MEdHqpQUpgWjWtpkJTNjHx',
            '32AhSoSn2gN1KmjDnrumYSSHeA4W3pueiMo2dh9njQ31ZTYH',
            '349DqipGvthKxGkickq1BC6q6azMh31q3hNoJveKQkeKhivt',
            '32J9Zs4DGfgjhHz1nyuR5VwHjXHY1MSqGQV5LEy1ZwgC5v97',
            '31qsBnUQftnE4cB882ATvuiAcCrydXA3mVhJetQ2b8LiFhri',
            '35DofNcKskXyiuGLGRrTwHCpSYc5H6Xa2EydPX5kweJWuKbW',
            '368cU2A86QcyZA6UdEbYnWsf16eRA9dJvWogeZfjAS3KXqju',
            '339PdRF9y6LwVCuGJKXRLPRfZ8zvLvRMsmX2zPxFDxEiLBJj',
            '32yccwDF8HJcMpykFVeCVAC3E5mjdsYzRM1R98JTDEsuVMS5',
            '335Cdx74gwqrVu18RUi5455Gecx3xfY7cbeKgibPXKQmDgY4',
            '354RQzfyijrNibRy4tp2T2fN5x5iE19geXaT8MKd5Hmd4hpe',
            '3279Y1KVu2CnZYZE4iz5JnU4ihseLmxydhSt3LY838vDNtMb',
            '32hvWXjjSq9qRsD23XQZU4jvVpUXXro5R2KESDNhNdx29eu6',
            '2zkjtwFRJPJPoE9H65fNHGcyzdH3WxJeVKwC9dyTq86vhtuN',
            '312Tgk4UceMQG2XuwRSSdR9iA5AJqgNFq6YLnWvkt2ufgbzq',
            '36BFTWLgCmG7ZhtB6pp9d7oxB7jttpToN6Gj1eWWnRgJnWAb',
            '35xTYWinyCTXu8Yn3DD8rDwNUnxJ8Q6zXW1tgRgX4tk8uVrE',
            '34WArc7HfXckT7TNxFQAQtcV6jf1ogugG6TjgXtsMfh5X5Kz',
            '35jVu3i2fsBdFT5wHxdbUnzhBERHwCSZGJ9HNGjhokeqqktE',
            '34W5B9x7b1RLUEUsufwoM6rCrGyGzNJFBHevwhZoiwtMjKZE',
            '36VXLrhHBKJHPt3ApB16Zc72TrwVuunbWsf2QQsAxeNUEyhg',
            '34uscF3jsHAWXfWZLkeYqCEPDx9D5mvVondrrtP5FK3m58rf',
            '31tbYZMjeTZgaN7h3df7hxdPoBKS2WBbUP3zi5GkDiE6R7Uo',
            '327LpT728L9v8sDanWWuTNAUcsttr7QumjC2ujLeXjQQSVXf',
            '35u9YYWR5x5LxdvNtMfEuFRm98pA6mkGD7G12wZWJvwEybxb',
            '34BotaDmAHYumjtpddBiHcYfEaEgfCwYGCncvWiehtWsPDF5',
            '32PVJ7fnijHZEa89YRFQdnieNYfBbWZercMfwo26Bxa2W9FK',
            '32U1NGXhTqt5dR82K9bT9FJYSAs2H2qxJkFyWCtnYWWAXDAX',
            '31SXGYW64mVHXpULBiN4LC7L6QgbtaKFRKH1BijqqS2QSzB2',
            '312t7REZhWFo5yr8SJcv4YL6vNgeRuUU95dsUgAc24BL3kk6',
            '2ztz7pKu4vxEouKb99A7wrDNu1tKdRkBmGCush12mnPGXwYS',
            '33UdwP3FDseZogg1oqwURQ3BiKnr9GhUR899wnn1BJfvNAy4',
            '31taZ6L85vVpWGHb8jVWFy2FAeu15DsMCMCqtcUqpqLJgW2U',
            '34nSuoNtTiA44WRnbuPGYw5Br6JSGdPsoDbZBzpVhh6RcEDS',
            '31ev4Phxwyoh98EnUHvkD9LhRhnbwA3gPhJ656wT8CwyDhs4',
            '341aMtLq6pKs2pchyEARYbCXbNC8MU4K6KCWPM8FAEtSMd2h',
        ];
        var ammounts = [
            2.04,
            2.75,
            54.729,
            5,
            0.99,
            41.66,
            5.08,
            26.96,
            2.015,
            1.049,
            8.52,
            5.49,
            2.006,
            0.05,
            2.16,
            1.71,
            0.003,
            5.21,
            10.09,
            0.21,
            2.415,
            42.01,
            40.15,
            9,
            9.14,
            7.8,
            1.53,
            0.48,
            2.611,
            9.49,
            4.9,
            0.1,
            0.11,
            272.32,
            0.02,
            0.2,
            0.003,
            6.05,
            0.04,
            0.05006,
            0.002,
            0.22,
            0.9,
            225,
            4,
            0.95,
            5.4,
            2.5,
            16,
            13.76,
            15.65,
            0.33,
            84.753,
            0.21,
            0.66,
            1.0104,
            7.415,
            1.93,
            7.9399,
            0.99,
            13,
            14.3,
            15.99,
            1,
            1.7106,
            97.1869,
            0.85,
            0.99,
            0.02,
            0.7,
            0.7,
            0.01,
            1451.63,
            0.03,
            2.17,
            0.83,
            1,
            54,
            1.25,
            4.24,
            47.7,
            0.1,
            8.84,
            0.1,
            67.8,
            4.35,
            42.02,
            38,
            12,
            0.1,
            6.31,
            8.767,
            113.013,
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
