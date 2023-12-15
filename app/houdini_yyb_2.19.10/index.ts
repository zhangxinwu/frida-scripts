function run() {
    let m = Process.findModuleByName("libhoudini.so")
    if (m) {
        let x_fetch_inst_func = m.base.add(0x1E0DF0);
        //print vm_pc vm_insn
        Interceptor.attach(m.base.add(0x01E0E7E), {
            onEnter() {
                //@ts-ignore
                let vm_pc = this.context.rbp;
                //@ts-ignore
                let vm_insn = this.context.rdx;
                console.log("run vm >> ", vm_pc, vm_insn)
            }
        })
        //print vm_reg vm_param
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
