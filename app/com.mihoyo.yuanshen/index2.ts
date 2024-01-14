import { get } from "http"

let allRegs = {}
let show = true
function showArmStack0(tid: number, regs: NativePointer) {
    //@ts-ignore
    let pcs = []
    let opcs = []
    if (!regs.equals(0)) {
        console.log(tid, regs)
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

function printArmStack() {
    for (let t in allRegs) {
        //@ts-ignore
        showArmStack0(t, allRegs[t])
    }
}
//@ts-ignore
let getRegs: NativeFunction = null;
setTimeout(() => {
    Process.setExceptionHandler((e) => {
        console.log("exception=>", JSON.stringify(e))
    })
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
            if (!show) return;
            
            //@ts-ignore
            let regs: NativePointer = this.context.rax;
            //@ts-ignore
            allRegs[Process.getCurrentThreadId()] = regs
            Process.enumerateThreads()[0]
            let s = ""
            if (regs.add(0x348).readU32() == 98) {
                s = "->" + regs.add(0x8 * 0).readPointer().readPointer()
            }
            if (regs.add(0x348).readU32() == 167 && regs.add(0x8 * 0).readU32()==0x10) {
                s = "->" + regs.add(0x8 * 1).readPointer().readCString()
            }
            //@ts-ignore
            console.log(Process.getCurrentThreadId(), "syscall", regs.add(0x348).readU32(), "" + regs.add(0x8 * 0).readPointer() + s, regs.add(0x8 * 1).readPointer(), regs.add(8 * 2).readPointer(), regs.add(8 * 3).readPointer(), regs.add(8 * 4).readPointer(), regs.add(8 * 5).readPointer())
        }
    })

    // Interceptor.attach(Process.getModuleByName("libhoudini.so").base.add(0x2F14E0), {
    //     onEnter() {
    //         if (!getRegs)
    //             getRegs = new NativeFunction(Process.getModuleByName("libhoudini.so").base.add(0x2F75A0), "pointer", [])
    //         //@ts-ignore
    //         allRegs[Process.getCurrentThreadId()] = getRegs()
    //     }
    // })

}, 10000)

rpc.exports = {
    printArmStack: printArmStack,
    showy: function () { show = true; },
    showx: function () { show = false; }
}