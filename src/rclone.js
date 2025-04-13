const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

function build_command(folderpair) {
    let command = `rclone ${folderpair.operation} "${folderpair.from}" "${folderpair.to}"`;
    (folderpair.excludes||[]).forEach(exc => {
        command += ` --exclude="${exc}"`;
    });
    (folderpair.filters||[]).forEach(filter => {
        command += ` --filter "${filter}"`;
    });
    command += " --verbose";
    return command;
}

async function exec_command(command) {
    try {
        const exex_result = await execAsync(command);
        return {
            success: true,
            data: exex_result.stderr
        }
    } catch (error) {
        console.error('Erro while executing command:', error);
        return {
            success: false,
            data: error
        }
    }
}

function get_stats(_stdout) {
    const info = _stdout
        .split('\n')
        .slice(-4)
        .filter(line => line !== "")

    return info.join('\n');
}

module.exports = {
    build_command,
    exec_command,
    get_stats
}
