
setImmediate(() => {
    // 32B140
    let m = Process.findModuleByName("libhoudini.so")
    if (m) {
        Interceptor.attach(m.base.add(0x32B140), {
            onEnter(args) {
                console.log("filePath", args[0].readCString(), "flag", args[1], "ns", args[2])
            }
        })
    }
})

setTimeout(() => {
    let m = Process.findModuleByName("libhack.so")
    if (!m) {
        m = Module.load("/data/local/tmp/libhack.so")
        let runptr = m.findExportByName("_Z3runv")
        if (runptr) {
            let run = new NativeFunction(runptr, 'void', [])
            run();
            console.log("run ok!")
        }
    }
}, 15000)

rpc.exports = {
    run: () => {
        let m = Process.findModuleByName("libhoudini.so")
        if (m) {
            let run = new NativeFunction(m.base.add(0x32B140), 'void', ['pointer', 'uint', 'uint'])
            let ss = Memory.allocUtf8String("/data/local/tmp/libarm.so")
            run(ss, 0x2, 0x6);
            console.log("houdini hook ok!")
        }
    }
}