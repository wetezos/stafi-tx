import child_process from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import prompts from "prompts";
import { log } from "./log";
import rawCj from "./static/config.json";
import rawTj from "./static/types.json";

// constants
export const TYPES_URL = ""

// interfaces
export interface IConfig {
    node: string;
    seed: string;
    shadow: string;
}

export interface IConfigPath {
    conf: string;
    root: string;
    types: string;
    addrs: string;
}

/**
 * stafi.js config
 *
 * @property {IConfigPath} path - stafi config paths
 * @property {String} node - stafi node address
 * @property {String} seed - stafi account seed
 */
export class Config {
    static warn(config: Config) {
        if (config.node === "") {
            log.ex("stafi node has not been configured");
        }
    }

    public node: string;
    public path: IConfigPath;
    public shadow: string;
    public types: Record<string, any>;
    public addrs: Array<string>;
    private seed: string;

    constructor() {
        const home = os.homedir();
        const root = path.resolve(home, ".stafi2");
        const conf = path.resolve(root, "config.json");
        const types = path.resolve(root, "types.json");
        const addrs = path.resolve(root, "addrs.json");

        // init pathes
        this.path = {
            conf,
            root,
            types,
            addrs
        };

        // check root
        if (!fs.existsSync(root)) {
            fs.mkdirSync(root, { recursive: true });
        }

        // load config.json
        let cj: IConfig = rawCj;
        if (!fs.existsSync(conf)) {
            fs.writeFileSync(conf, JSON.stringify(cj, null, 2));
        } else {
            const curConfig = JSON.parse(fs.readFileSync(conf, "utf8"));
            const mergeConfig = Object.assign(rawCj, curConfig);
            if (mergeConfig !== curConfig) {
                fs.writeFileSync(conf, JSON.stringify(mergeConfig, null, 2));
            }

            // assign cj
            cj = mergeConfig;
        }

        // load types.json
        let tj: Record<string, any> = rawTj;
        if (!fs.existsSync(types)) {
            fs.writeFileSync(types, JSON.stringify(tj, null, 2));
        } else {
            tj = JSON.parse(fs.readFileSync(types, "utf8"));
        }

        // load addrs.json
        let ar: Array<string> = new Array();
        if (!fs.existsSync(addrs)) {
            fs.writeFileSync(addrs, JSON.stringify(ar, null, 2));
        } else {
            ar = JSON.parse(fs.readFileSync(addrs, "utf8"));
        }

        this.node = cj.node;
        this.seed = cj.seed;
        this.shadow = cj.shadow;
        this.types = tj;
        this.addrs = ar;

        // Warn config
        Config.warn(this);
    }

    /**
     * Raise a prompt if seed not exists
     */
    public async checkSeed(): Promise<string> {
        if (this.seed !== "") {
            return this.seed;
        }

        const ans = await prompts({
            type: "text",
            name: "seed",
            message: "Please input your stafi seed:",
        }, {
            onCancel: () => {
                log.ex("You can fill the seed field in `~/.stafi2/config.json` manually");
            }
        });

        const curConfig: IConfig = JSON.parse(fs.readFileSync(this.path.conf, "utf8"));
        const seed = String(ans.seed).trim();
        curConfig.seed = seed;
        this.seed = seed;
        fs.writeFileSync(
            this.path.conf,
            JSON.stringify(curConfig, null, 2)
        );

        return seed;
    }

    /**
     * edit dj.json
     */
    public async edit(): Promise<void> {
        child_process.spawnSync("vi", [this.path.conf], {
            stdio: "inherit",
        });
    }

    /**
     * update types.json
     */
    public async updateTypes(): Promise<void> {
        // await download(this.path.root, TYPES_URL, "types.json");
    }

    /**
     * print config to string
     */
    public toString(): string {
        return JSON.stringify(
            fs.readFileSync(this.path.conf, "utf8"),
            null,
            2
        );
    }
}
