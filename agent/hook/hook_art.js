export function hook_art() {

    // 查找模块
    const lib_art = Process.findModuleByName('libart.so');

    // 枚举模块的符号
    const symbols = lib_art.enumerateSymbols();

    for (let symbol of symbols) {

        var name = symbol.name;

        if (name.indexOf("art") >= 0) {
            if ((name.indexOf("CheckJNI") == -1) && (name.indexOf("JNI") >= 0)) {
                if (name.indexOf("GetStringUTFChars") >= 0) {
                    console.log('开始 HOOK libart ', symbol.name);
                    Interceptor.attach(symbol.address, {
                        onEnter: function (arg) {
                            // 打印调用栈
                            // console.log('GetStringUTFChars called from:\n' + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
                        },
                        onLeave: function (retval) {
                            console.log('onLeave GetStringUTFChars:', ptr(retval).readCString())
                        }
                    })
                } else if (name.indexOf("FindClass") >= 0) {
                    console.log('开始 HOOK libart ', symbol.name);
                    Interceptor.attach(symbol.address, {
                        onEnter: function (arg) {
                            console.log('onEnter FindClass:', ptr(arg[1]).readCString())
                        },
                        onLeave: function (retval) {
                            // console.log('onLeave FindClass:', ptr(retval).readCString())
                        }
                
                    })
                } else if (name.indexOf("GetStaticFieldID") >= 0) {
                    console.log('开始 HOOK libart ', symbol.name);
                    Interceptor.attach(symbol.address, {
                        onEnter: function (arg) {
                            console.log('onEnter GetStaticFieldID:', ptr(arg[2]).readCString(), ptr(arg[3]).readCString())
                        },
                        onLeave: function (retval) {
                            // console.log('onLeave GetStaticFieldID:', ptr(retval).readCString())
                        }
                    })
                } else if (name.indexOf("SetStaticIntField") >= 0) {
                    console.log('开始 HOOK libart ', symbol.name);
                    Interceptor.attach(symbol.address, {
                        onEnter: function (arg) {
                            console.log('onEnter SetStaticIntField:', arg[3])
                        },
                        onLeave: function (retval) {
                            // console.log('onLeave SetStaticIntField:', ptr(retval).readCString())
                        }
                    })
                } 
 
            }
        }


    }
}
