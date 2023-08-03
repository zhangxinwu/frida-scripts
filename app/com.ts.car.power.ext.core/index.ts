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
                    // 打印调用栈
                    stackstrace(this.context);
                    javastackstrace();
                    console.log("onEnter ", symbol.name)
                    //@ts-ignore
                    console.log(ptr(arg[1]).readCString(arg[2].toInt32()));
                },
                onLeave: function (retval) {
                    console.log("onLeave ", symbol.name)
                }
            })
        }
    }
    
}



main()

import "../../agent/dump/dump_dex.js"
import "../../agent/dump/dump_dex_class.js"
import { dumpso } from "../../agent/dump/dump_so.js";

// com.ts.car.power.ext.adapter.PowermodeEmulator$DataReceiver.run
const s = "50 6f 77 65 72 6d 6f 64 65 45 6d 75 6c 61 74 6f 72"
let modules = Process.enumerateModules();
for(let m of modules) {
    let l = `${JSON.stringify(m)}`;
    Memory.scan(m.base, m.size, s, {
        onMatch: (address, size) => {
          console.log('found match at ',m.name, m.path, address);
          console.log(l)
        }
      });
}

