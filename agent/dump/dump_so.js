import {exec, pushfile, getfilesdir, pullfile} from "../tools.js";

export async function dumpso(so_name) {
    var libso = Process.findModuleByName(so_name);
    if (libso == null) {
        return null;
    }
    let filesdir = await getfilesdir()

    // dump so
    Memory.protect(ptr(libso.base), libso.size, 'rwx');
    var libso_buffer = ptr(libso.base).readByteArray(libso.size);
    let sofile = `${filesdir}/${so_name}.so`
    let fixsofile = `${filesdir}/${so_name}.dump.so`
    pushfile(sofile, libso_buffer);

    // fix so
    let osfix = 'SoFixer32'
    if(Process.arch == 'arm64')
        osfix = 'SoFixer64'
    osfix = `${filesdir}/${osfix}`
    let cmd = `${osfix} -m ${libso.base} -s ${sofile} -o ${fixsofile}`
    await exec(cmd);
    return fixsofile;
}

rpc.exports = {
    dumpso: dumpso,
    pullfile: pullfile
}
