import { saveMaps } from "../../agent/hook/show.js";
import { printStack, stackstrace, javastackstrace } from "../../agent/hook/stacktrace.js"

let lastDrif = ptr(0);
let lastContext: CpuContext;

let isFirst = true
// if(0)
setTimeout(() => {

    Process.setExceptionHandler((e) => {
        saveMaps("/data/data/com.miHoYo.Yuanshen/maps")
        if (!isFirst) return
        isFirst = false
        console.log("exception=>", JSON.stringify(e))
        if (e.type == "abort") {
            stackstrace(e.context)
            // Java.perform(() => {
            //     printStack("Abort->!")
            //     javastackstrace()
            // })
            {
                stackstrace(lastContext)
                console.log(JSON.stringify(lastContext))
                console.log(hexdump(lastContext.sp))
                console.log(hexdump(lastContext.sp.add(0xf0)))
                console.log(hexdump(lastContext.sp.add(0xf0).add(0xf0)))
                // for (let i = 0; i < 0x100; i++) {
                //     lastContext.sp = lastContext.sp.add(0x08)
                //     try {
                //         stackstrace(lastContext)
                //     } catch (exception) { }
                // }
            }
            console.log('=========')
            console.log(hexdump(e.context.sp))
            console.log(hexdump(e.context.sp.add(0xe0).readPointer()))
            console.log(hexdump(e.context.sp.add(0xe0).readPointer().sub(0xf0)))
            console.log(hexdump(lastDrif.sub(0xf0)))
            console.log(hexdump(lastDrif))
            console.log('-=-')
            let vecStart = lastDrif.add(0xa8).readPointer()
            let vecEnd = lastDrif.add(0xb0).readPointer()
            let i = 0;
            // while (!vecEnd.equals(vecStart)) {
            //     try {
            //         console.log("free -", i)
            //         i += 1
            //         console.log(hexdump(vecEnd))
            //         // let namePtr = vecEnd.add(0x20).readPointer()
            //         // if(!namePtr.equals(ptr(0)))
            //         // {
            //         //     console.log("name->")
            //         //     console.log(hexdump(namePtr))
            //         // }
            //         vecEnd = vecEnd.sub(0x70)
            //     } catch (ee) { }
            // }

            // for (let i = 0 ; i < 8; i++) {
            //     console.log(i, "====>")
            //     console.log(hexdump(lastDrif.add(0x90+0x8*i).readPointer()))
            // }
            for (let i = 0; i < 0x100; i++) {
                try {
                    e.context.sp = e.context.sp.add(0x08)
                    console.log("hack!")
                    stackstrace(e.context)
                } catch (exception) { }
            }
            debugger;
            while (1) { }
        }
        if (e.type == "access-violation") {

            console.log(hexdump(e.context.sp))
            console.log(hexdump(e.context.sp.add(0xf0)))
            console.log(hexdump(e.context.sp.add(0xf0).add(0xf0)))

            stackstrace(e.context)
            for (let i = 0; i < 0x100; i++) {
                e.context.sp = e.context.sp.add(0x08)
                stackstrace(e.context)
            }
            Java.perform(() => {
                printStack("access-violation->!")
            })
            while (1) { }
        }
    })
    for (let m of Process.enumerateModules()) {
        if (m.path == "/apex/com.android.runtime/lib64/bionic/libc.so") {
            console.log(JSON.stringify(m))
            Interceptor.attach(m.base.add(0x0485F0), {
                onEnter(args) {
                    stackstrace(this.context)
                    Java.perform(() => {
                        printStack("could->!")
                    })
                }
            })
        }
    }
    Interceptor.attach(Process.getModuleByName("libOpenglSystemCommon.so")!.base.add(0x29820), {
        onEnter(args) {
            console.log("ProgramData::~ProgramData ", args[0])
            //@ts-ignore
            // lastDrif = this.context.rdi
            lastContext = this.context
        }
    })
    Interceptor.attach(Process.getModuleByName("libOpenglSystemCommon.so")!.base.add(0x21D60), {
        onEnter(args) {
            //@ts-ignore
            console.log("ProgramData::initProgramWithDataStream ", this.context.rdi)
            // stackstrace(this.context)
            // Java.perform(() => {
            //     printStack("initProgramWithDataStream->!")
            // })
        }
    })

    Interceptor.attach(Process.getModuleByName("libc.so")!.base.add(0x48CA0), {
        onEnter() {
            console.log("scudo::reportHeaderCorruption ")
            console.log(JSON.stringify(this.context))
            //@ts-ignore
            lastDrif = this.context.rdi
            stackstrace(this.context)
            console.log('cc Stackstrace called from:\n' + Thread.backtrace(this.context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\n') + '\n');

            Java.perform(() => {
                printStack("scudo::reportHeaderCorruption->!")
            })
        }
    })


}, 1000)
