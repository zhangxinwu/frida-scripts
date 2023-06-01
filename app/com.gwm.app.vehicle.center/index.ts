import { hook_native_register, hook_ArtMethodRegister, hook_RegisterNatives } from "../../agent/hook_native_register.js";
import { vm_run } from "../../agent/QBDI/qbdi.js"
import { getfilesdir } from "../../agent/tools.js";
import { hook_art } from "../../agent/hook/hook_art.js";
import { javastackstrace } from "../../agent/hook/stacktrace.js";

var context: CpuContext;
var vm_enter_ptr: NativePointer;

setImmediate(() => {
    Java.perform(() => {

        hook_ArtMethodRegister();
        hook_RegisterNatives();

        // hook_art();

        console.log('hello!');
        // warp_vm_run("libdexjni1682067940.so", 0x16078, []);
        var module_name = "libdexjni1682067940.so"
        let offset = 0x16078
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
                    // context = this.context
                    // let cs = JSON.stringify(this.context)
                    // console.log("context: ", cs);
                    javastackstrace();
                    console.log('args 0:', JSON.stringify(args[0]));
                    console.log(hexdump(args[0].readPointer()))
                    console.log('args 1:', JSON.stringify(args[1]));
                    console.log(hexdump(args[1]))
                    console.log('args 2:', JSON.stringify(args[2]));
                    console.log(hexdump(args[3].readPointer()))
                    
                    
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
    let func = new NativeFunction(vm_enter_ptr, 'uint64', [])
    let filesdir = await getfilesdir();
    console.log('start trace!~');
    let ret = vm_run(vm_enter_ptr, [], filesdir + "/trace.log", context)
    console.log(ret);
}
//@ts-ignore 
rpc.exports = { run11: run11 }

let cr = { "pc": "0x7d50dd6078", "sp": "0x7ffbd9e050", "nzcv": 536870912, "x0": "0x7d6b4e8540", "x1": "0x7ffbd9e064", "x2": "0x7ffbd9e068", "x3": "0x6fef59e8", "x4": "0x12c20878", "x5": "0x1567", "x6": "0x12c20888", "x7": "0x10", "x8": "0xad07c20f8e86d47e", "x9": "0xad07c20f8e86d47e", "x10": "0x430000", "x11": "0xfbd9d801", "x12": "0xfbd9d861", "x13": "0x1", "x14": "0x7ffbd9d821", "x15": "0x7ffbd9da49", "x16": "0x7df01b2000", "x17": "0x7d614c9000", "x18": "0x7ffbd9d9b9", "x19": "0x7d6b414c00", "x20": "0x7d50dd6078", "x21": "0x12c20878", "x22": "0x3", "x23": "0x1", "x24": "0x80", "x25": "0x12c20858", "x26": "0x4", "x27": "0xfffffffffffffed4", "x28": "0x7", "fp": "0x0", "lr": "0x7d51227b80", "q0": {}, "q1": {}, "q2": {}, "q3": {}, "q4": {}, "q5": {}, "q6": {}, "q7": {}, "q8": {}, "q9": {}, "q10": {}, "q11": {}, "q12": {}, "q13": {}, "q14": {}, "q15": {}, "q16": {}, "q17": {}, "q18": {}, "q19": {}, "q20": {}, "q21": {}, "q22": {}, "q23": {}, "q24": {}, "q25": {}, "q26": {}, "q27": {}, "q28": {}, "q29": {}, "q30": {}, "q31": {}, "d0": 2.0876051936e-314, "d1": 2.0876047904e-314, "d2": 2.1219957905e-314, "d3": 0, "d4": 0, "d5": 4.003911019303815, "d6": 0, "d7": -4.458850023827439e-308, "d8": 5.263544247e-315, "d9": 5.61032426e-315, "d10": 5.263544247e-315, "d11": 0, "d12": 0, "d13": 0, "d14": 0, "d15": 0, "d16": 4.003911019303815, "d17": 2.30873142057e-311, "d18": 2.173454188896e-311, "d19": 0, "d20": 0, "d21": 0, "d22": null, "d23": 0, "d24": 0, "d25": 0, "d26": 0, "d27": 1.953543664e-314, "d28": 1.9535436644e-314, "d29": 1.953543665e-314, "d30": 1.9535436653e-314, "d31": 2e-323, "s0": -2.2625560326125534e+36, "s1": -2.26242673225133e+36, "s2": null, "s3": 0, "s4": 0, "s5": 2.250244379043579, "s6": 0, "s7": -2.9416085389075846e-39, "s8": 1, "s9": 350, "s10": 1, "s11": 0, "s12": 0, "s13": 0, "s14": 0, "s15": 0, "s16": 2.250244379043579, "s17": 0, "s18": 2, "s19": 0, "s20": 0, "s21": 0, "s22": null, "s23": 0, "s24": 0, "s25": 0, "s26": 0, "s27": -4.195023876011288e+26, "s28": -4.1950242449461696e+26, "s29": -4.195024613881051e+26, "s30": -4.1950249828159326e+26, "s31": 5.605193857299268e-45 }
/*
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cV sig: ([Ljava/lang/Object;)V fnPtr: 0x7d4ed2c078 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x16078
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cI sig: ([Ljava/lang/Object;)I fnPtr: 0x7d4ed2c0a0 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x160a0
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cL sig: ([Ljava/lang/Object;)Ljava/lang/Object; fnPtr: 0x7d4ed2c0cc module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x160cc
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cS sig: ([Ljava/lang/Object;)S fnPtr: 0x7d4ed2c0f8 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x160f8
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cC sig: ([Ljava/lang/Object;)C fnPtr: 0x7d4ed2c124 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x16124
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cB sig: ([Ljava/lang/Object;)B fnPtr: 0x7d4ed2c150 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x16150
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cJ sig: ([Ljava/lang/Object;)J fnPtr: 0x7d4ed2c17c module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x1617c
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cZ sig: ([Ljava/lang/Object;)Z fnPtr: 0x7d4ed2c1a8 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x161a8
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cF sig: ([Ljava/lang/Object;)F fnPtr: 0x7d4ed2c1d4 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x161d4
[RegisterNatives] java_class: com.gwm.app.vehicle.center.JniLib1682067940 name: cD sig: ([Ljava/lang/Object;)D fnPtr: 0x7d4ed2c200 module_name: libdexjni1682067940.so module_base: 0x7d4ed16000 offset: 0x16200
*/