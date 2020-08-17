import yargs from "yargs";
import Version from "./_version";

const cmdVersion: yargs.CommandModule = {
    builder: (argv: yargs.Argv) => {
        return argv;
    },
    command: "upgrade",
    describe: "upgrade to the lastest version",
    handler: async (args: yargs.Arguments) => {
        const g = await Version.new();
        g.run();
    }
}

export default cmdVersion;
