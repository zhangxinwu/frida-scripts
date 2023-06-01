
import { vm_run } from "./qbdi.js";
import { getfilesdir } from "../tools.js";

/**
 * warp_vm_run 
 * @param {*} module_name   内存中的so文件名，"libEncryptor.so"
 * @param {*} offset        虚拟机劫持入口，一般为函数地址
 * @param {*} args          传递参数
 * 
 */
export function warp_vm_run(module_name, offset, args) {
    let baselibEncryptor = Module.findBaseAddress(module_name);
    let vm_enter_ptr = baselibEncryptor.add(offset);
    {
        let str0 = "0123456789abcdef";
        let arg0 = Memory.allocUtf8String(str0);
        let ret_len = str0.length + 0x76;
        
        let arg1 = Memory.alloc(ret_len);
        let arg2 = Memory.alloc(16);
        arg2.writeU64(ret_len);
    }
    
    getfilesdir().then((filesdir) => {
        console.log('start trace!~');
        let ret = vm_run(vm_enter_ptr, args, filesdir + "/trace.log", context)
    
        console.log(ret, "\r\n", hexdump(arg1, {
            length: ret_len
        }))
    })
}
