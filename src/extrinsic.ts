import yargs from "yargs";
import Extrinsic from "./_extrinsic";

const cmdExtrinsic: yargs.CommandModule = {
    builder: (argv: yargs.Argv) => {
        return argv;
    },
    command: "extrinsic <block> <endBlock>",
    describe: "parse extrinsic",
    handler: async (args: yargs.Arguments) => {
        const g = await Extrinsic.new();
        g.run((args.block as string), (args.endBlock as string));
    }
}

export default cmdExtrinsic;
