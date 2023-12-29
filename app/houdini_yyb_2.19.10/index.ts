function run() {
    let m = Process.findModuleByName("libhoudini.so")
    if (m) {
        let x_fetch_inst_func = m.base.add(0x1E0DF0);
        console.log(hexdump(m.base.add(0x11ad7d)))
        if(false)
        //@ts-ignore
        Interceptor.attach(m.base.add(0x11ad7d), {
            onEnter() {
                //@ts-ignore
                let r13 = this.context.r13;
                console.log("ldr ", r13, ">>", r13.readCString());
            }
        })
        Interceptor.attach(m.base.add(0x11acd0), {
            //@ts-ignore
            onEnter(arg0, arg1, arg2){
                console.log(arg0, arg1, arg2)
            }
        })
        if(false)
        //print vm_pc vm_insn
        //@ts-ignore
        Interceptor.attach(m.base.add(0x01E0E7E), {
            onEnter() {
                //@ts-ignore
                let vm_pc = this.context.rbp;
                //@ts-ignore
                let vm_insn = this.context.rdx;
                console.log("run vm >> ", vm_pc, vm_insn)
            }
        })
        if(false)
        //print vm_reg vm_param
        //@ts-ignore
        Interceptor.attach(m.base.add(0x01E0EE9), {
            onEnter() {
                //@ts-ignore
                let vm_regs: NativePointer = this.context.rsi;
                //@ts-ignore
                let vm_param: NativePointer = this.context.rdi;
                console.log(hexdump(vm_regs.readByteArray(256)!))
                console.log(hexdump(vm_param.readByteArray(256)!))
            }
        })
    }
}

setImmediate(run)
