
function hook_RegisterNatives() {
    var symbols = Process.findModuleByName("libart.so")!.enumerateSymbols();
    var addrRegisterNatives = null;
    for (var i = 0; i < symbols.length; i++) {
        var symbol = symbols[i];

        //_ZN3art3JNI15RegisterNativesEP7_JNIEnvP7_jclassPK15JNINativeMethodi
        if (symbol.name.indexOf("art") >= 0 &&
            symbol.name.indexOf("JNI") >= 0 &&
            symbol.name.indexOf("RegisterNatives") >= 0 &&
            symbol.name.indexOf("CheckJNI") < 0) {
            addrRegisterNatives = symbol.address;
            console.log("RegisterNatives is at ", symbol.address, symbol.name);
            break;
        }
    }

    if (addrRegisterNatives != null) {
        Interceptor.attach(addrRegisterNatives, {
            //@ts-ignore
            onEnter: function (args) {
                console.log("[RegisterNatives] method_count:", args[3]);
                var env = args[0];
                var java_class = args[1];
                var class_name = Java.vm.tryGetEnv().getClassName(java_class);
                //console.log(class_name);

                //@ts-ignore
                var methods_ptr = ptr(args[2]);

                //@ts-ignore
                var method_count = parseInt(args[3]);
                for (var i = 0; i < method_count; i++) {
                    var name_ptr = methods_ptr.add(i * Process.pointerSize * 3).readPointer();
                    var sig_ptr = methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize).readPointer();
                    var fnPtr_ptr = methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize * 2).readPointer();

                    var name = name_ptr.readCString();
                    var sig = sig_ptr.readCString();
                    var find_module = Process.findModuleByAddress(fnPtr_ptr);
                    console.log("[RegisterNatives] java_class:", class_name, "name:", name, "sig:", sig, "fnPtr:", fnPtr_ptr, "module_name:", find_module!.name, "module_base:", find_module!.base, "offset:", fnPtr_ptr.sub(find_module!.base));
                    Interceptor.attach(fnPtr_ptr, {
                        onEnter() {
                            console.log("call native method", class_name, sig, fnPtr_ptr)
                        }
                    })

                }
            }
        });
    }
}
