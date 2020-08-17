import yargs from "yargs";
import Public from "./_public";

const cmdPublic: yargs.CommandModule = {
    builder: (argv: yargs.Argv) => {
        return argv;
    },
    command: "public",
    describe: "decode address",
    handler: async (args: yargs.Arguments) => {
        const g = await Public.new();
        g.run();
    }
}

export default cmdPublic;
