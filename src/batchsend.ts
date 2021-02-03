import yargs from "yargs";
import Batchsend from "./_batchsend";
import Ethexchfis from "./_batchsend";

const cmdBatchsend: yargs.CommandModule = {
    builder: (argv: yargs.Argv) => {
        return argv;
    },
    command: "batchsend",
    describe: "batch send",
    handler: async () => {
        const g = await Batchsend.new();
        g.run();
    }
}

export default cmdBatchsend;
