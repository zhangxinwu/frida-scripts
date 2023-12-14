import { stackstrace, printStack } from "../../agent/hook/stacktrace.js";
import { hookClass } from "../../agent/hook/hook_class_method.js"
import { json } from "../../agent/hook/show.js"
import { stringify } from "querystring";
export let ccc = false;
// import "../../agent/hook/hook_RegisterNative.js"

function log(message?: any, ...optionalParams: any[]): void {
    Java.use("android.util.Log").e("XXX", ...optionalParams)
    console.log(message, ...optionalParams);
}
function main() {

    Java.perform(() => {

        {
            let targetClass = 'rc4.f';
            let methodName = 'onAttach';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.os.Bundle').implementation = function (arg0) {
                console.log('\nGDA[Hook onAttach(android.os.Bundle)]' + '\n\targ0 = ' + arg0);
                let acc = Java.use("com.xingin.account.AccountManager")
                console.log(`w = ${acc._w.value}`)
                // acc._w.value = false
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'com.xingin.android.xhscomm.router.Routers';
            let methodName = 'build';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String').implementation = function (arg0) {
                console.log('\nGDA[Hook build(java.lang.String)]' + '\n\targ0 = ' + arg0);
                if (arg0.indexOf("welcome_page") >= 0)
                    printStack("welcomePage!")
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            // hookClass("pz3.d")
            // hookClass("rz3.c")
        }

        {
            let targetClass = 'pz3.d';
            let methodName = 'a';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook a(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                console.log("pz3.d.a arg0 ", arg0.class, JSON.stringify(arg0), arg0, arg0.value)
                console.log("this.c", this.c.value.class, JSON.stringify(this.c), JSON.stringify(this.c.value), this.c, this.c.value)
                console.log("this ", JSON.stringify(this))
                if (JSON.stringify(this.c.value).indexOf("rc4.f") >= 0) {
                    printStack("rf4.f$* call!")
                    // Java.use("com.xingin.account.AccountManager")._w.value = true;
                }
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'rz3.a';
            let methodName = 'b';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Class').implementation = function (arg0) {
                console.log('\nGDA[Hook b(java.lang.Class)]' + '\n\targ0 = ' + arg0);
                console.log("arg0", JSON.stringify(arg0), JSON.stringify(arg0.value), arg0)
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }

        }
        {
            let targetClass = 'ub2.c';
            let methodName = 'c';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'int', 'java.lang.String').implementation = function (arg0, arg1, arg2, arg3, arg4, arg5) {
                console.log('\nGDA[Hook c(java.lang.String,java.lang.String,java.lang.String,java.lang.String,int,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3 + '\n\targ4 = ' + arg4 + '\n\targ5 = ' + arg5);
                let i = this[methodName](arg0, arg1, arg2, arg3, arg4, arg5);
                console.log('\treturn ' + i);
                return i;
            }

        }
        {
            hookClass("xc4.f")
        }
        {
            //@ts-ignore
            Java.use("xc4.f").r.implementation = function (arg0, arg1, arg2, arg3, arg4) {
                if (`${arg4}`.indexOf("ERROR") >= 0 || `${arg2}`.indexOf("InflateException") >= 0) {
                    console.log(arg0, arg1, arg2, arg3, arg4)
                    printStack("xc4.f.r!")
                }
                return this.r(arg0, arg1, arg2, arg3, arg4)
            }
        }
        {
            let targetClass = 'he.c';
            let methodName = 'b';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook lock b()]' + '');
                let i = this[methodName]();
                i = this[methodName]();
                // console.log('\treturn ' + i);
                return;
            }
        }

        // {
        //     let targetClass = 'wx3.e';
        //     let methodName = '$init';
        //     let gclass = Java.use(targetClass);
        //     //@ts-ignore
        //     gclass[methodName].overload('java.lang.Runnable', 'java.lang.Object', 'java.lang.String', 'java.lang.String').implementation = function (arg0, arg1, arg2, arg3) {
        //         console.log('\nGDA[Hook $init(java.lang.Runnable,java.lang.Object,java.lang.String,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3);
        //         if (`${arg2}`.indexOf("oaid") >= 0) {
        //             printStack("oaid!")
        //         }
        //         let i = this[methodName](arg0, arg1, arg2, arg3);
        //         console.log('\treturn ' + i);
        //         return i;
        //     }

        // }
        {
            let targetClass = 'wx3.e';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.util.concurrent.Callable', 'java.lang.Object', 'java.lang.String', 'java.lang.String').implementation = function (arg0, arg1, arg2, arg3) {
                console.log('\nGDA[Hook $init(java.util.concurrent.Callable,java.lang.Object,java.lang.String,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3);
                let i = this[methodName](arg0, arg1, arg2, arg3);
                console.log('\treturn ' + i);
                return i;
            }

        }
        {
            let targetClass = 'wx3.e';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.util.concurrent.Callable', 'java.lang.Object', 'java.lang.String', 'java.lang.String', 'tx3.d').implementation = function (arg0, arg1, arg2, arg3, arg4) {
                console.log('\nGDA[Hook $init(java.util.concurrent.Callable,java.lang.Object,java.lang.String,java.lang.String,tx3.d)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3 + '\n\targ4 = ' + arg4);
                let i = this[methodName](arg0, arg1, arg2, arg3, arg4);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'pz3.d';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('in4.l').implementation = function (arg0) {
                console.log('\nGDA[Hook $init(in4.l)]' + '\n\targ0 = ' + arg0);
                console.log("pz3.d.$init arg0 ", arg0.class, JSON.stringify(arg0), arg0, arg0.value)
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'com.xingin.xhs.routers.RouterPageActivity';
            let methodName = 'onCreate';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.os.Bundle').implementation = function (arg0) {
                console.log('\nGDA[Hook onCreate(android.os.Bundle)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'ff4.n';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook ff4.n invoke()]' + '');
                let i = this[methodName]();
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let targetClass = 'ff4.o';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook ff4.o invoke()]' + '');
                let i = this[methodName]();
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let targetClass = 'ff4.m';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook ff4.m invoke()]' + '');
                let i = this[methodName]();
                console.log('\treturn ' + i);
                return i;
            }

        }
        if (false) {
            let targetClass = 'aa3.b';
            let methodName = 'z';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.content.Context').implementation = function (arg0) {
                console.log('\nGDA[Hook aa3.b.z(android.content.Context)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                printStack("judge!")
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let targetClass = 'android.xingin.com.spi.RouterExp';
            let methodName = 'e';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String').implementation = function (arg0) {
                console.log('\nGDA[Hook e(java.lang.String)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        if (false) {
            Java.choose("rc4.f$a", {
                onMatch(instance) {
                    console.log("find > ", instance, JSON.stringify(instance))
                },
                onComplete() {
                    console.log("complete")
                },
            })
        }

        {
            let targetClass = 'rc4.g';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook rc4.g.invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            let targetClass = 'rc4.f$c';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook rc4.f$c.invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let targetClass = 'rc4.f$a';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook rc4.f$a.invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let targetClass = 'rc4.f$b';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook rc4.f$b.invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        // {
        //     let targetClass = 'rc4.f';
        //     let methodName = 'r1';
        //     let gclass = Java.use(targetClass);
        //     gclass[methodName].overload().implementation = function () {
        //         console.error('\nGDA[Hook rc4.f.r1()]' + '');
        //         let i = this[methodName]();
        //         console.log('\treturn ' + i);
        //         return i;
        //     }
        // }

        // {
        //     let a = Java.use("hd.a");
        //     //@ts-ignore
        //     a["a"].implementation = function (activity) {
        //         console.log(`a.a is called: activity=${activity}`);
        //         // let result = this["a"](activity);
        //         // console.log(`a.a result=${result}`);
        //         return true;
        //     };
        // }
        // {
        //     let targetClass = 'ak1.f1';
        //     let methodName = 'A';
        //     let gclass = Java.use(targetClass);
        //     gclass[methodName].overload().implementation = function () {
        //         console.log('\nGDA[Hook A()]' + '');
        //         // let i = this[methodName]();
        //         // console.log('\treturn ' + i);
        //         return true;
        //     }

        // }
        // {
        //     let targetClass = 'com.airbnb.lottie.e';
        //     let methodName = 'u';
        //     let gclass = Java.use(targetClass);
        //     //@ts-ignore
        //     gclass[methodName].overload('java.lang.String', 'java.lang.reflect.Type').implementation = function (arg0, arg1) {
        //         console.log('\nGDA[Hook u(java.lang.String,java.lang.reflect.Type)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1);
        //         let i = this[methodName](arg0, arg1);
        //         console.log('\treturn ' + i);
        //         return i;
        //     }

        // }
        // {
        //     let targetClass = 'ai4.d';
        //     let methodName = 'o';
        //     let gclass = Java.use(targetClass);
        //     //@ts-ignore
        //     gclass[methodName].overload('java.lang.String', 'java.lang.reflect.Type', 'com.google.gson.Gson').implementation = function (arg0, arg1, arg2) {
        //         console.log('\nGDA[Hook o(java.lang.String,java.lang.reflect.Type,com.google.gson.Gson)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2);
        //         printStack("json");
        //         let i = this[methodName](arg0, arg1, arg2);

        //         console.log('\treturn ' + i);
        //         return i;
        //     }

        // }

    })
}

function main1() {
    Java.perform(() => {
        {

            //@ts-ignore
            Java.use("ff4.q").invoke.implementation = function (arg0) {
                console.error("showMe!");
                printStack("showMe!")
                return this.invoke(arg0)
            }

            //@ts-ignore
            Java.use("ff4.p").invoke.implementation = function (arg0) {
                console.error("showMe!");
                printStack("showMe!")
                return this.invoke(arg0)
            }

            //@ts-ignore
            Java.use("com.xingin.xhs.app.LoginApplication$init$1$2").invoke.overload('java.lang.Throwable').implementation = function (arg0) {
                console.error("showMe!");
                printStack("showMe!")
                return this.invoke(arg0)
            }

            //@ts-ignore
            Java.use("com.xingin.xhs.app.LoginApplication$init$1$1").invoke.overload('java.lang.Boolean').implementation = function (arg0) {
                console.error("showMe!");
                // printStack("showMe!")
                return this.invoke(arg0)
            }
            hookClass("xc4.f")
            let LoginApplication$init$1 = Java.use("com.xingin.xhs.app.LoginApplication$init$1");
            LoginApplication$init$1["invoke"].overload().implementation = function () {
                console.log(`LoginApplication$init$1.invoke2 is called`);
                this["invoke"]();
            };
            let LoginApplication = Java.use("com.xingin.xhs.app.LoginApplication");
            //@ts-ignore
            LoginApplication["init"].implementation = function (application) {
                console.log(`LoginApplication.init is called: application=${application}`);
                this["init"](application);
            };
            //@ts-ignore
            LoginApplication["getOaid"].overload('android.app.Application').implementation = function (arg0) {
                console.log(`LoginApplication.getOaid is called`);
                this["getOaid"](arg0);
            };
            let LoginApplication$getOaid$1 = Java.use("com.xingin.xhs.app.LoginApplication$getOaid$1");
            LoginApplication$getOaid$1["invoke"].overload().implementation = function () {
                console.log(`LoginApplication$getOaid$1.invoke2 is called`);
                let sdk = Java.use("android.os.Build$VERSION").SDK_INT.value
                console.log(`sdk = ${sdk}`)
                // Java.use("android.os.Build$VERSION").SDK_INT.value = 25;
                try {
                    this["invoke"]();
                } catch (e) {
                    console.log("ERROR--->invoke")
                    console.log(Java.use("android.util.Log").getStackTraceString(e))
                    console.log(e);
                }
                Java.use("android.os.Build$VERSION").SDK_INT.value = sdk;
            };
            let AnonymousClass1 = Java.use("com.xingin.xhs.app.LoginApplication$getOaid$1$1");
            AnonymousClass1["invoke"].overload().implementation = function () {
                console.log(`AnonymousClass1.invoke2 is called`);
                this["invoke"]();
            };
            let c = Java.use("vc0.c");
            //@ts-ignore
            c["w"].implementation = function (th5) {
                console.log(`c.w is called: th5=${th5}`);
                this["w"](th5);
            };
            let e = Java.use("aj3.e");
            //@ts-ignore
            e["a"].implementation = function (str) {
                console.log(`e.a is called: str=${str}`);
                e._b.value = false;
                let result = this["a"](str);
                console.log(`e.a result=${result}`);
                return result;
            };
            // hookClass("com.bun.miitmdid.e")
            let MdidSdkHelper = Java.use("com.bun.miitmdid.core.MdidSdkHelper");
            //@ts-ignore
            MdidSdkHelper["InitCert"].implementation = function (context, str) {
                console.log(`MdidSdkHelper.InitCert is called: context=${context}, str=${str}`);
                // let result = this["InitCert"](context, str);
                // console.log(`MdidSdkHelper.InitCert result=${result}`);
                return true;
            };
            let MsaAllianceManager = Java.use("com.xingin.xhs.manager.MsaAllianceManager");
            //@ts-ignore
            MsaAllianceManager["d"].implementation = function (context) {
                console.log(`MsaAllianceManager.d is called: context=${context}`);
                this["d"](context);
            };
            let b = Java.use("androidx.recyclerview.widget.b");
            //@ts-ignore
            b["b"].implementation = function (str, str2, str3) {
                console.log(`b.b is called: str=${str}, str2=${str2}, str3=${str3}`);
                let result = this["b"](str, str2, str3);
                console.log(`b.b result=${result}`);
                return result;
            };
            // Java.use("com.bun.miitmdid.core.MdidSdkHelper").InitCert(null, "hello")
            console.log("ok")
            Java.use("java.lang.System").loadLibrary("msaoaidsec");
        }
    })
    // let module = Process.findModuleByName("msaoaidsec")
    // if (module) {
    //     console.log("msaoaidsec laoded!")
    //     Interceptor.attach(module.base.add(0x13328), {
    //         onEnter() {
    //             console.log("JNI_onLoad() call")
    //         },
    //         onLeave(ret) {
    //             console.log("JNI_onLoad() call return", ret)
    //         }
    //     })

    // }
    const System = Java.use('java.lang.System');
    const Runtime = Java.use('java.lang.Runtime');
    const VMStack = Java.use('dalvik.system.VMStack');
    // if(false)
    //@ts-ignore
    System.loadLibrary.implementation = function (library) {
        try {
            console.log('System.loadLibrary("' + library + '")');
            Java.use("android.util.Log").e("XXX", "System.loadLibrary " + library)
            // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            const loaded = Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), library);
            // try {
            //     // Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), "msaoaidsec");
            // } catch (e) {
            //     console.log(e);
            // }
            Java.use("android.util.Log").e("XXX", "System.loadLibrary " + library + " load success!")
            return loaded;
        } catch (ex) {
            //@ts-ignore
            Java.use("android.util.Log").e("XXX", ex.toString())
            // console.log(ex);
        }
    }
}

function main2() {

    // for (let m of Process.enumerateModules()) {
    //     for (let s of m.enumerateExports()) {
    //         console.log(m.name, s.name)
    //         if (s.name.indexOf("shouldIgnoreLibrary") >= 0) {
    //             console.log("show ", s.name, s.address)
    //             Interceptor.attach(s.address, {
    //                 onEnter(args) {
    //                     console.log(args[0].readCString())
    //                 }, onLeave(ret) {
    //                     console.log("return ", ret)
    //                 }
    //             })
    //         }
    //     }
    // }
    //@ts-ignore
    Java.use("java.lang.Runtime").shouldIgnoreLibrary.implementation = function(arg0) {
        console.log("hook ok!", arg0);
        let res = this.shouldIgnoreLibrary(arg0)
        console.log("return ", res);
        if(`${arg0}`.indexOf("msaoaid") >= 0)
            return false;
        return res;
    }
}


setTimeout(main2, 1000)


rpc.exports = {
    acac: function () {
        Java.perform(() => {
            {
                let targetClass = 'rc4.f$b';
                let methodName = 'invoke';
                let gclass = Java.use(targetClass);
                //@ts-ignore
                gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                    console.log('\nGDA[Hook rc4.f$b.invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                    let i = this[methodName](arg0);
                    console.log('\treturn ' + i);
                    return i;
                }
            }
        })
    }
} 
