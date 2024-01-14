import { saveMaps } from "../../agent/hook/show.js";
import { printStack, stackstrace, javastackstrace } from "../../agent/hook/stacktrace.js"
import { printArmStack } from "./index.js"

let lastDrif = ptr(0);
let lastContext: CpuContext;

let isFirst = true
//@ts-ignore
var get_callstack = null;
//@ts-ignore
var callback_size = null;
//@ts-ignore
let getReg = null;
//@ts-ignore
let getArmReg = null;
// if(0)

function showArmStack0(regs: NativePointer) {
    //@ts-ignore
    let pcs = []
    let opcs = []
    if (!regs.equals(0)) {
        console.log("this-thread", regs)
        for (let i = 0; i < 32; i++) {
            // console.log('x'+i, regs.add(0x8*i).readPointer())
        }
        let fp = regs.add(0x8 * 29)
        pcs.push(regs.add(0x8 * 30).readPointer())
        opcs.push(regs.add(0x8 * 30).readPointer())
        {
            let fp0 = fp
            while (fp0.compare(0) > 0) {
                try {
                    opcs.push(fp0.add(0x8).readPointer())
                    fp0 = fp0.readPointer()
                } catch (e) {
                    break
                }
            }
            console.log("acc", opcs)
        }
        for (let i = 0; i < 0x1000; i++) {
            fp = fp.add(0x8)
            try {

                //@ts-ignore
                for (let r of ranges) {
                    let pc = fp.readPointer()
                    if (pc >= r.start && pc < r.end) {
                        pcs.push(pc)
                        break
                    }
                }
            } catch (e) {
                break
            }
        }
        console.log('fuz', pcs)
        // console.log(hexdump(sp))
    }
}
setTimeout(() => {
    let m = Process.findModuleByName("libhack.so");
    if (m == null) {
        m = Module.load("/data/local/tmp/libhack.so")
        let run = new NativeFunction(m.findExportByName("Java_com_example_xhs_MainActivity_runHook")!, "void", ["pointer", 'pointer'])
        run(ptr(0), ptr(0));
        //@ts-ignore
        let runs = new NativeFunction(m.findExportByName("_Z3runv"), 'void', [])
        runs();
    }
    // for(let s of m.enumerateExports()) {
    //     console.log(JSON.stringify(s))
    // }
    if (m) {
        let f = m.findExportByName("_Z7getRegsi")
        if (f)
            getReg = new NativeFunction(f, 'pointer', ['int'])
    }

    let mh = Process.findModuleByName("libhoudini.so")
    //@ts-ignore
    getArmReg = new NativeFunction(mh.base.add(0x2F75A0), 'pointer', [])


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
                // stackstrace(lastContext)
                // console.log(JSON.stringify(lastContext))
                // console.log(hexdump(lastContext.sp))
                // console.log(hexdump(lastContext.sp.add(0xf0)))
                // console.log(hexdump(lastContext.sp.add(0xf0).add(0xf0)))
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
            console.log(hexdump(lastDrif.sub(0xf0).sub(0xf0)))
            console.log(hexdump(lastDrif.sub(0xf0)))
            console.log(hexdump(lastDrif))
            //@ts-ignore
            if (get_callstack) {
                for (let i = 0; i < 0xf0 + 0xf0; i++) {
                    console.log("===> stackcall", lastDrif.sub(i));
                    //@ts-ignore
                    let ret = get_callstack(lastDrif.sub(i));
                    if (ret.equals(ptr(0)))
                        continue
                    console.log(ret.readCString());
                }
                //@ts-ignore
                console.log(get_callstack(lastDrif).readCString());
            }
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
            //@ts-ignore
            showArmStack0(getArmReg())
            printArmStack();
            // debugger;
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
            //@ts-ignore
            showArmStack0(getArmReg())
            printArmStack();

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
    // Interceptor.attach(Process.getModuleByName("libOpenglSystemCommon.so")!.base.add(0x29820), {
    //     onEnter(args) {
    //         console.log("ProgramData::~ProgramData ", args[0])
    //         //@ts-ignore
    //         // lastDrif = this.context.rdi
    //         lastContext = this.context
    //     }
    // })
    /*
    Interceptor.attach(Process.getModuleByName("libOpenglSystemCommon.so")!.base.add(0x21D60), {
        onEnter(args) {
            //@ts-ignore
            console.log("ProgramData::initProgramWithDataStream ", this.context.rdi)
            // stackstrace(this.context)
            // Java.perform(() => {
            //     printStack("initProgramWithDataStream->!")
            // })
        }
    })*/
    //@ts-ignore
    Interceptor.attach(Process.getModuleByName("libOpenglSystemCommon.so").findExportByName("_ZN13GLSharedGroup15glDeleteProgramEjPNS_15RDRNameReleaserE"), {
        onEnter(args) {
            //@ts-ignore
            console.log("glDeleteProgram ", this.context.rsi)
        }
    })
    //@ts-ignore
    Interceptor.attach(Process.getModuleByName("libOpenglSystemCommon.so").findExportByName("_ZN13GLSharedGroup15glCreateProgramEj"), {
        onEnter(args) {
            //@ts-ignore
            console.log("glCreateProgram ", this.context.rsi)
        }
    })
    //@ts-ignore
    Interceptor.attach(Process.getModuleByName("libOpenglSystemCommon.so").findExportByName("_ZN13GLSharedGroup28initAnyProgramWithDataStreamEjiPKc"), {
        onEnter(args) {
            //@ts-ignore
            console.log("initAnyProgramWithDataStream ", this.context.rsi)
            //@ts-ignore
            if (this.context.rcx)
                //@ts-ignore
                console.log(hexdump(this.context.rcx))
        }
    })

    //@ts-ignore
    Interceptor.attach(Process.getModuleByName("libhoudini.so").base.add(0x2F3EB4), {
        onEnter(args) {
            //@ts-ignore
            let regs:NativePointer = this.context.rax;
            let s = ""
            if(regs.add(0x348).readU32()==98) {
                s = "->"+regs.add(0x8*0).readPointer().readPointer()
            }
            //@ts-ignore
            console.log(Process.getCurrentThreadId(), "syscall", regs.add(0x348).readU32(), ""+regs.add(0x8*0).readPointer()+s, regs.add(0x8*1).readPointer(), regs.add(8*2).readPointer(), regs.add(8*3).readPointer(), regs.add(8*4).readPointer(), regs.add(8*5).readPointer())
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

}, 10000)

rpc.exports = {
    printArmStack: printArmStack
}