import yargs from "yargs";
import Ethexchfis from "./_ethexchfis";

const cmdEthexchfis: yargs.CommandModule = {
    builder: (argv: yargs.Argv) => {
        return argv;
    },
    command: "ethexchfis",
    describe: "Calculate the eth handling fee required by the bridge and exchange it to fis according to the current price",
    handler: async () => {
        const g = await Ethexchfis.new();
        g.run();
    }
}

export default cmdEthexchfis;
