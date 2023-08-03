import {javastackstrace, stackstrace} from "../../agent/hook/stacktrace.js"
function main() {
    // 查找模块
    const libc = Process.findModuleByName('libc.so');

    // 枚举模块的符号
    if (libc == null) {
        console.log("lib not found!");
        return;
    }
    const symbols = libc.enumerateSymbols();

    for (let symbol of symbols) {
        var name = symbol.name;
        // console.log('libc ', symbol.name);
        if (name == "send" || name == "sendto" || name == "sendmsg" || name == "sendmmsg") {
            console.log('开始 HOOK libc ', symbol.name);
            Interceptor.attach(symbol.address, {
                onEnter: function (arg) {
                    console.log("onEnter ", symbol.name)
                    if(symbol.name == "sendto") {
                        //@ts-ignore
                        let content = `${ptr(arg[1]).readCString(arg[2].toInt32())}`;
                        console.log(content)
                        //@ts-ignore
                        let mc = Memory.scanSync(ptr(arg[1]), arg[2].toInt32(), "62 75 69 6c 74 69 6e 45 72 72 6f 72 22 3a 22 4d 61 6c 66 6f 72 6d 65 64 4d 65 73 73 61 67 65 22 2c 22 74 79 70 65 22 3a 22 65 72 72 6f 72 22")
                        if(mc.length > 0)
                        {
                            stackstrace(this.context);
                            javastackstrace();
                            return;
                        }

                    }
                    // if (symbol.name == "sendmsg") {
                    //     console.log(hexdump(arg[1]))
                    //     let iovlen = arg[1].add(0x18).readInt();
                    //     let iovs = arg[1].add(0x10).readPointer();
                    //     for(let i = 0; i < iovlen; i++) {
                    //         console.log(iovs.readPointer().readByteArray(iovs.add(8).readInt()))
                    //         iovs = iovs.add(0x10);
                    //     }
                    //     let fcs = arg[1].add(0x20).readPointer();
                    //     let fcslen = arg[1].add(0x28).readInt();
                    //     console.log(fcs);
                    //     console.log(fcs.readByteArray(fcslen));
                    //     // console.log(hexdump(arg[1]))
                    //     //@ts-ignore
                    //     let addr = `${arg[1].readPointer().readByteArray(arg[1].add(8).readInt())}`;
                    //     // console.log("addr ", addr);
                    // }
                },
                onLeave: function (retval) {
                    console.log("onLeave ", symbol.name)
                }
            })
        }
    }
}



main()
