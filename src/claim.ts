import yargs from "yargs";
import ClaimMint from "./_claimmint";

const cmdClaim: yargs.CommandModule = {
    builder: (argv: yargs.Argv) => {
        return argv;
    },
    command: "mintclaim",
    describe: "mint claim",
    handler: async () => {
        const g = await ClaimMint.new();
        g.run();
    }
}

export default cmdClaim;
