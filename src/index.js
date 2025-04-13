const config = require("../config/config.json");
const { get_time } = require("./utils");
const rclone = require("./rclone");
const chalk = require('chalk');
const log = console.log;

async function run() {
    const folderpairs = config.runs[0].folderpairs;
    
    for (const fp of folderpairs) {
        log(`\n${get_time()} Running folderpair ${fp.name}...`);
        const command = rclone.build_command(fp);
        const res = await rclone.exec_command(command);

        if (res.success) {
            log("\n" + chalk.green("Success!"));
            const stats = rclone.get_stats(res.data);
            log(chalk.bold(stats));
        }
        else {
            log("\n" + chalk.red("Error"));
            log(chalk.bold(res.data));
        }
    }



}

run();