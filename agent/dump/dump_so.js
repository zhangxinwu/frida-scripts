import {exec, pushfile, getfilesdir, pullfile} from "../tools.js";

export async function dumpso(so_name) {
    console.log(Process.getCurrentThreadId())
    var libso = Process.findModuleByName(so_name);
    if (libso == null) {
        console.log(new File('/proc/self/maps', 'r').readText(0xff0000))
        return 'not found ' + so_name;
    }
    console.log('so', JSON.stringify(libso))
    let filesdir = await getfilesdir()

    // dump so
    Memory.protect(ptr(libso.base), libso.size, 'rwx');
    var libso_buffer = ptr(libso.base).readByteArray(libso.size);
    let sofile = `${filesdir}/${so_name}.so`
    let fixsofile = `${filesdir}/${so_name}.dump.so`
    pushfile(sofile, libso_buffer);

    // fix so
    let osfix = 'SoFixer32'
    if(Process.arch.indexOf('64')>=0)
        osfix = 'SoFixer64'
    osfix = `${filesdir}/${osfix}`
    let cmd = `${osfix} -m ${libso.base} -s ${sofile} -o ${fixsofile}`
    await exec(cmd);
    return [sofile, fixsofile];
}

rpc.exports = {
    dumpso: dumpso,
    pullfile: pullfile
}
