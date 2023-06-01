import { hook_native_register, hook_ArtMethodRegister, hook_RegisterNatives } from "../../agent/hook_native_register.js";
import { vm_run } from "../../agent/QBDI/qbdi.js"
import { getfilesdir } from "../../agent/tools.js";
import { hook_art } from "../../agent/hook/hook_art.js";
import { javastackstrace } from "../../agent/hook/stacktrace.js";

var context: CpuContext;
var vm_enter_ptr: NativePointer;
var argsP: any[3] = []

setImmediate(() => {
    Java.perform(() => {

        hook_ArtMethodRegister();
        hook_RegisterNatives();

        // hook_art();

        console.log('hello!');
        // warp_vm_run("libdexjni1682067940.so", 0x16078, []);
        var module_name = "libnative-lib.so"
        let offset = 0xF5D4
        let baselibEncryptor = Module.findBaseAddress(module_name);
        if (baselibEncryptor) {
            let a = baselibEncryptor.add(offset)
            if (a)
                vm_enter_ptr = a;
        }
        if (vm_enter_ptr) {
            console.log('hook enter point', vm_enter_ptr);
            Interceptor.attach(vm_enter_ptr, {
                onEnter: function (args) {
                    console.log('enter hook!!!!!');
                    context = this.context
                    let cs = JSON.stringify(this.context)
                    console.log("context: ", cs);
                    javastackstrace();
                    console.log('args 0:', JSON.stringify(args[0]));
                    argsP[0] = args[0];
                    console.log(hexdump(args[0].readPointer()))
                    console.log('args 1:', JSON.stringify(args[1]));
                    argsP[1] = args[1];
                    console.log(hexdump(args[1]))
                    console.log('args 2:', JSON.stringify(args[2]));
                    let javastring = Java.use("java.lang.String");
                    let a2 = Java.cast(args[2], javastring);
                    argsP[2] = args[2];
                    console.log('args 2:', a2);
                    console.log('args ', JSON.stringify([args[0], args[1], args[2]]));
                    
                    
                    // getfilesdir().then((filesdir) => {
                    //     console.log('start trace!~');
                    //     this.ret = vm_run(vm_enter_ptr, args, filesdir + "/trace.log", this.context)
                    //     console.log(this.ret);
                    // })
                },
                onLeave: function (retval) {
                }
            })

            //@ts-ignore 
            if(false)
            getfilesdir().then((filesdir) => {
                console.log('hook cV');
                let cV = new NativeFunction(vm_enter_ptr, 'void', ['pointer', 'pointer', 'pointer'])
                Interceptor.replace(vm_enter_ptr, new NativeCallback((env, jclszz, arr) => {
                    console.log('=-=')
                    console.log(JSON.stringify(env))
                    console.log(JSON.stringify(jclszz))
                    console.log(JSON.stringify(arr))
                    //@ts-ignore 
                    var firstArg = arr.getObjectArrayElement(0);
            
                    // 打印第一个参数的类型和值
                    console.log("First argument type: " + firstArg.getClass().getName());
                    console.log("First argument value: " + firstArg.toString());
                    console.log('=+=')
                    vm_run(cV, [env, jclszz, arr], filesdir + "/trace.log", context)
                    // cV(env, jobject, arr)
                    return
                }, 'void', ['pointer', 'pointer', 'pointer']))
            })
        }
    })
}, 1000);
var run11 = async function () {
    Interceptor.detachAll()
    Interceptor.revert(vm_enter_ptr)
    Interceptor.flush()
    let filesdir = await getfilesdir();
    console.log('start trace!~');
    var env = Java.vm.tryGetEnv();
    if(env)
    {
        console.log('env ok');
        let nativeStr = env.newStringUtf("flag{01234567890123456789012345678901}");
        argsP[0] = env.handle;
        argsP[2] = nativeStr;
        console.log('argsP ', JSON.stringify(argsP));
        let ret = vm_run(vm_enter_ptr, argsP, filesdir + "/trace.log", context);
        let javastring = Java.use('java.lang.String');
        let r = Java.cast(ret, javastring);
        console.log('return ', r);
        console.log(ret);
    }
}
//@ts-ignore 
rpc.exports = { run11: run11 }
/*
flag{01234567890123456789012345678901}
*/