#!/usr/bin/env node
import yargs from "yargs";
import cmdSend from "./src/send";
import cmdClaim from "./src/claim";
import cmdPublic from "./src/public";
import cmdVersion from "./src/version";
import cmdExtrinsic from "./src/extrinsic";
import cmdEthexchfis from "./src/ethexchfis";
import cmdBatchsend from "./src/batchsend";
import { whereisPj } from "./src/util";

// main
(async () => {
    const pj = whereisPj();

    // enable logger
    if (process.env.LOGGER === undefined) {
        process.env.LOGGER = "INFO";
    }

    // parser
    const _ = yargs
        .usage("stafitx <technical@stafi.io>")
        .help("help").alias("help", "h")
        .version("version", pj.version).alias("version", "V")
        .command(cmdSend)
        .command(cmdClaim)
        .command(cmdPublic)
        .command(cmdVersion)
        .command(cmdExtrinsic)
        .command(cmdEthexchfis)
        .command(cmdBatchsend)
        .argv;

    // show help if no input
    if (process.argv.length < 3) {
        yargs.showHelp();
    }
})();
