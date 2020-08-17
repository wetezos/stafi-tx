import yargs from "yargs";
import Grammer from "./_grammer";

const cmdSend: yargs.CommandModule = {
    builder: (argv: yargs.Argv) => {
        return argv;
    },
    command: "send",
    describe: "send tokens",
    handler: async (args: yargs.Arguments) => {
        const g = await Grammer.new();
        g.run();
    }
}

export default cmdSend;
