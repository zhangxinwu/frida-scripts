import { VM,InstPosition,VMAction,Options,MemoryAccessType,AnalysisType,RegisterAccessType,OperandType, GPR_NAMES } from "./frida-qbdi.js";

export function vm_run(func_ptr, args, log_file_path, context) {
    let start_time = new Date().getTime();

    let vm = new VM();
    vm.setOptions(Options.OPT_DISABLE_LOCAL_MONITOR | Options.OPT_BYPASS_PAUTH | Options.OPT_ENABLE_BTI)


    console.log("log_file_path: ", log_file_path);
    let file_pointer = new File(log_file_path, "w")

    let module = Process.findModuleByAddress(func_ptr);
    let user_data = {
        "file_pointer": file_pointer,
        "module_base": module.base,
        "module_name": module.name
    }
    vm.allocateVirtualStack(vm.getGPRState(), 0x100000);

    vm.addInstrumentedModuleFromAddr(func_ptr)
    let preinst_callback = vm.newInstCallback(function (vm, gpr, fpr, data) {
        let _user_data = data;
        let inst = vm.getInstAnalysis(AnalysisType.ANALYSIS_INSTRUCTION | AnalysisType.ANALYSIS_DISASSEMBLY | AnalysisType.ANALYSIS_OPERANDS | AnalysisType.ANALYSIS_SYMBOL);

        let i = 0;
        // console.log(inst.instSize, inst.address);
        let insts = '';
        while (i < inst.instSize) {
            i++;
            insts += Memory.readU8(ptr(inst.address+i)).toString(16).padStart(2,'0');
        }
        let log = "0x" + inst.address.toString(16) + " " + insts + " [" + inst.module + "!0x" + (inst.address - _user_data.module_base).toString(16) + "] " + inst.disassembly + "\t";
        let read_regs = "";
        inst.operands.forEach(operand => {
            if (operand.regAccess == RegisterAccessType.REGISTER_READ || operand.regAccess == RegisterAccessType.REGISTER_READ_WRITE) {
                if (operand.regCtxIdx != -1) {
                    if (operand.type == OperandType.OPERAND_GPR) {
                        try {
                            read_regs += operand.regName + "=" + gpr.getRegister(operand.regCtxIdx) + " ";
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            }
        });
        if (read_regs != "") {
            if (read_regs[read_regs.length - 1] === " ") {
                read_regs = read_regs.slice(0, -1);
            }
            log += " r[" + read_regs + "]"
        }

        _user_data.file_pointer.write(log);
        return VMAction.CONTINUE;
    });
    let postinst_callback = vm.newInstCallback(function (vm, gpr, fpr, data) {
        let _user_data = data;
        let inst = vm.getInstAnalysis(AnalysisType.ANALYSIS_INSTRUCTION | AnalysisType.ANALYSIS_DISASSEMBLY | AnalysisType.ANALYSIS_OPERANDS | AnalysisType.ANALYSIS_SYMBOL);
        let write_regs = "";
        inst.operands.forEach(operand => {
            if (operand.regAccess == RegisterAccessType.REGISTER_WRITE || operand.regAccess == RegisterAccessType.REGISTER_READ_WRITE) {
                if (operand.regCtxIdx != -1) {
                    if (operand.type == OperandType.OPERAND_GPR) {
                        try {
                            write_regs += operand.regName + "=" + gpr.getRegister(operand.regCtxIdx) + " ";
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            }
        });
        if (write_regs != "") {
            if (write_regs[write_regs.length - 1] === " ") {
                write_regs = write_regs.slice(0, -1);
            }
            let log = " w[" + write_regs + "]\n"
            _user_data.file_pointer.write(log);
        } else {
            let log = "\n";
            _user_data.file_pointer.write(log);
        }
        return VMAction.CONTINUE;
    });

    let memory_access_callback = vm.newInstCallback(function (vm, gpr, fpr, data) {
        let _user_data = data;
        let array_memory_access = vm.getInstMemoryAccess();
        array_memory_access.forEach(memory_access => {
            if (memory_access.type == MemoryAccessType.MEMORY_READ) {
                let log = "memory read at " + memory_access.accessAddress.toString(16);
                log += ", data size = " + memory_access.size.toString(16);
                log += ", data value = " + memory_access.value.toString(16) + "\n";
                _user_data.file_pointer.write(log);
            } else if (memory_access.type == MemoryAccessType.MEMORY_WRITE) {
                let log = "memory write at " + memory_access.accessAddress.toString(16);
                log += ", data size = " + memory_access.size.toString(16);
                log += ", data value = " + memory_access.value.toString(16) + "\n";
                _user_data.file_pointer.write(log);
            } else {
                let log = "memory read|write at " + memory_access.accessAddress.toString(16);
                log += ", data size = " + memory_access.size.toString(16);
                log += ", data value = " + memory_access.value.toString(16) + "\n";
                _user_data.file_pointer.write(log);
            }

        });
        return VMAction.CONTINUE;
    });

    vm.addCodeCB(InstPosition.PREINST, preinst_callback, user_data);
    vm.addCodeCB(InstPosition.POSTINST, postinst_callback, user_data);
    vm.addMemAccessCB(MemoryAccessType.MEMORY_READ_WRITE, memory_access_callback, user_data);
    // console.log("start vm.call");
    // let gprstate = vm.getGPRState();
    // console.log(">>>", GPR_NAMES)
    // for(let r of GPR_NAMES) {
    //     console.log(r, context[r.toLowerCase()])
    //     gprstate.setRegister(r, context[r.toLowerCase()]);
    // }
    // vm.setGPRState(gprstate);
    console.log("start call!");
    let ret = vm.call(func_ptr, args);
    // let ret = vm.run(func_ptr, module.base + module.size);
    file_pointer.close();
    let end_time = new Date().getTime();
    console.log('cost is', `${(end_time - start_time)/1e3}s`)
    console.log('ret ', ret);
    return ret;
    // return vm.getGPRState('X0');
}


rpc.exports = {
    vmrun: vm_run
}