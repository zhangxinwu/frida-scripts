// import { stackstrace, printStack } from "../../agent/hook/stacktrace.js";
// import { hookClass } from "../../agent/hook/hook_class_method.js"
// import { json } from "../../agent/hook/show.js"
export var ccc = false;
import "../../agent/hook/hook_RegisterNative.js"


function main() {

    let ct = 0;
    Java.perform(() => {


        {
            hookClass("com.xingin.android.xhscomm.router.Routers");
        }
        if (false) {
            let targetClass = 'com.xingin.xhs.index.v2.splash.SplashV2Controller';
            let methodName = 'q1';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook q1()]' + '');
                let i = this[methodName]();
                console.log('\tHook q1() return ' + i);
                return i;
            }
        }
        {
            let content = Java.use("android.content.Context");
            //@ts-ignore
            content["checkPermission"].overload("java.lang.String", "int", "int").implementation = function (arg0: string, arg1: int, arg2: int) {
                console.log(`checkPermission is called: ${arg0} ${arg1} ${arg2}`);
                let ret = this["checkPermission"](arg0, arg1, arg2);
                console.log(`checkPermission is called end ${ret}`);
                return ret;
            };
        }

        {
            let content = Java.use("android.app.Activity");
            //@ts-ignore
            content["startActivity"].overload("android.content.Intent").implementation = function (arg0: any) {
                console.log(`startActivity is called: ${arg0}`);
                if (`${arg0}`.indexOf("LoginDelaySplashActivity") >= 0)
                    printStack("LoginDelaySplashActivity")
                let ret = this["startActivity"](arg0);
                console.log(`startActivity is called end ${ret}`);
                return ret;
            };
        }
        if (false) {
            let targetClass = 'com.xingin.xhs.index.v2.splash.logindelay.LoginDelaySplashActivity';
            let methodName = 'createLinker';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.view.ViewGroup').implementation = function (arg0) {
                console.log('\nGDA[Hook createLinker(android.view.ViewGroup)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                printStack("Hook createLinker")
                console.log('\treturn ' + i);
                return i;
            }

        }
        if (false) {
            let targetClass = 'com.xingin.xhs.index.v2.splash.logindelay.LoginDelaySplashActivity';
            let methodName = decodeURIComponent('%5f$%5ffindCachedViewById');
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('int').implementation = function (arg0) {
                console.log('\nGDA[Hook _$_findCachedViewById(int)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        if (false) {
            Java.use("com.xingin.advert.spi.AdvertSpiImpl")["hasRedSplashAdToday"].implementation = function () {
                console.log("hasRedSplashAdToday!!!")
                return false
            }
        }

        if (false) {
            let targetClass = 'com.xingin.xhs.index.v2.splash.SplashV2Controller';
            let methodName = 'u1';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook u1()]' + '');
                let i = this[methodName]();
                console.log('\treturn ' + i);
                return i;
            }
        }


        {
            Java.use("com.xingin.login.activity.WelcomeActivity").$init.implementation = function () {
                console.log("com.xingin.login.activity.WelcomeActivity init")
                printStack("WelcomeActivity")
                return this.$init()
            }
        }

        {
            let targetClass = 'com.xingin.android.xhscomm.router.Routers';
            let methodName = 'build';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String').implementation = function (arg0) {
                console.log('\nGDA[Hook build(java.lang.String)]' + '\n\targ0 = ' + arg0);
                if (`${arg0}`.indexOf("xhsdiscover://welcome_page") >= 0) {
                    printStack("callwelcome");
                }
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'com.xingin.xhs.app.LoginApplication$init$1$1';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook $init()]' + '');
                printStack("LoginApplication");
                let i = this[methodName]();
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'nk3.k';
            let methodName = 'accept';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook nk3.k accept(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                printStack("nk3.k accept!")
                console.log('\treturn ' + i);
                return i;
            }
        }

        if (false) {
            let targetClass = 'wm3.h$a';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook wm3.h$a invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'g04.d$a';
            let methodName = 'c';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook g04.d$a c(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'qk3.c';
            let methodName = 'b';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook qk3.c b(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'sz3.d0$a';
            let methodName = 'b';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook sz3.d0$a  b(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            let targetClass = 'nk3.e';
            let methodName = 'b';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook nk3.e b(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let targetClass = 'nk3.e';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('kotlin.jvm.functions.Function1').implementation = function (arg0) {
                console.log('\nGDA[Hook nk3.e $init(kotlin.jvm.functions.Function1)]' + '\n\targ0 = ' + arg0.implements);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        if (false) {
            let targetClass = 'wm3.h$a';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('wm3.h').implementation = function (arg0) {
                console.log('\nGDA[Hook  wm3.h$a $init(wm3.h)]' + '\n\targ0 = ' + arg0);
                printStack("callStack!")
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        // if (false) 
        {
            let targetClass = 'wm3.h';
            let methodName = 'onAttach';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.os.Bundle').implementation = function (arg0) {
                console.log('\nGDA[Hook wm3.h.onAttach(android.os.Bundle)]' + '\n\targ0 = ' + arg0);
                let a = Java.use("lc.a1")
                console.log(`${Java.use("lc.a1")._a.value.a1()}`)

                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let a = Java.use("wm3.h$a");
            //@ts-ignore
            a["invoke"].implementation = function (aVar) {
                console.log(`a.invoke is called: aVar=${aVar}`);
                let result = this["invoke"](aVar);
                console.log(`a.invoke result=${result}`);
                return result;
            };
        }
        {
            let a = Java.use("wm3.a");
            //@ts-ignore
            a["$init"].implementation = function (z15) {
                console.log(`a.$init is called: z15=${z15}`);
                this["$init"](z15);
            };
        }
        {
            // hookClass("wm3.h")
        }
        if (false) {
            let c = Java.use("android.os.SystemProperties")
            //@ts-ignore
            c.get.overload("java.lang.String", "java.lang.String").implementation = function (arg0, arg1) {
                console.log("getprop " + arg0 + " - " + arg1)
                if (arg0.indexOf("ro.board.platform") >= 0) {
                    stackstrace(this.context)
                    printStack("ro platform!")
                }
                let r = this.get(arg0, arg1)
                // if(r.indexOf("Samsung") >= 0)
                //     r.value = Java.use("java.lang.String").$new("Xiaomi")
                console.log("getprop return ", r);
                return r;
            }
        }
        if (false) {
            let c = Java.use("android.os.SystemProperties")
            //@ts-ignore
            c.get.overload("java.lang.String").implementation = function (arg0) {
                console.log("getprop " + arg0)
                let r = this.get(arg0)
                // if(r.indexOf("Samsung") >= 0)
                //     r.value = Java.use("java.lang.String").$new("Xiaomi")
                console.log("getprop return ", r);
                return r;
            }
        }

        if (false) {
            let targetClass = 'com.xingin.a.a.f.FingerPrintJni';
            let methodName = 'getFingerPrint';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook getFingerPrint()]' + '');
                let i = this[methodName]();
                printStack("getFingerPrint!")
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let g = Java.use("kn3.g");
            //@ts-ignore
            g["c"].implementation = function (i15) {
                console.log(`g.c is called: i15=${i15}`);
                this["c"](i15);
            };
        }

        {
            let f = Java.use("s70.f");
            //@ts-ignore
            f["a"].implementation = function () {
                console.log(`f.a is called: null=${null}`);
                let result = this["a"](null);
                console.log(`f.a result=${result}`);
                result = true;
                return result;
            };
        }
        return;

        {
            let targetClass = 'com.xingin.xhs.index.v2.splash.logindelay.LoginDelaySplashActivity';
            let methodName = 'onCreate';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.os.Bundle').implementation = function (arg0) {
                console.log('\nGDA[Hook onCreate(android.os.Bundle)]' + '\n\targ0 = ' + arg0);
                printStack("start LoginDelaySplashActivity")
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                printStack("end LoginDelaySplashActivity")
                return i;
            }
        }
        {
            let targetClass = 'rc4.f';
            let methodName = 'r1';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook r1()]' + '');
                printStack("testrc4")
                let i = this[methodName]();
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            let targetClass = 'com.xingin.foundation.framework.v2.LCBActivity';
            let methodName = 'onCreate';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.os.Bundle').implementation = function (arg0) {
                console.log('\nGDA[Hook onCreate(android.os.Bundle)]' + '\n\targ0 = ' + arg0);
                printStack("LCBActivity")
                let i = this[methodName](arg0);
                console.log('\treturn ' + this.linker);
                return i;
            }
        }


        {
            let targetClass = 'com.xingin.xhs.index.v2.splash.logindelay.LoginDelaySplashActivity';
            let methodName = 'createLinker';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.view.ViewGroup').implementation = function (arg0) {
                console.log('\nGDA[Hook createLinker(android.view.ViewGroup)]' + '\n\targ0 = ' + arg0);
                printStack("createLinker")
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            let targetClass = 'aw1.k';
            let methodName = 'attach';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.os.Bundle', 'java.lang.String').implementation = function (arg0, arg1) {
                console.log('\nGDA[Hook attach(android.os.Bundle,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1);
                printStack("aw1.k attach")
                console.log(`${this.controller}`)
                let i = this[methodName](arg0, arg1);
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            // hookClass("com.xingin.account.AccountManager")
        }
        {
            let targetClass = 'rc4.f';
            let methodName = 'onAttach';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.os.Bundle').implementation = function (arg0) {
                console.log('\nGDA[Hook onAttach(android.os.Bundle)]' + '\n\targ0 = ' + arg0);
                printStack("rc4.f onAttach")
                let acc = Java.use("com.xingin.account.AccountManager")
                console.log(json(acc._a.value))
                // console.log(json(this))
                console.log(`${acc._a}`)
                console.log(acc._a.value)
                console.log(acc._w.value)
                // console.log(`a.B() = ${acc._a.B()}`)
                console.log(`c.t = ${this.c.t}`)
                let i = this[methodName](arg0);
                //!!! acc._w.value = true

                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            let targetClass = 'pz3.f';
            let methodName = 'd';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('tk4.s', 'com.uber.autodispose.b0', 'in4.l').implementation = function (arg0, arg1, arg2) {
                console.log('\nGDA[Hook d(tk4.s,com.uber.autodispose.b0,in4.l)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + (arg1) + '\n\targ2 = ' + (arg2));
                let i = this[methodName](arg0, arg1, arg2);
                console.log('\treturn ' + i);
                return i;
            }
        }

        // {
        //     let n = Java.use("pc.n");
        //     //@ts-ignore
        //     n["accept"].implementation = function (obj) {
        //         console.log(`pcpc n.accept is called: obj=${obj}`);
        //         this["accept"](obj);
        //     };
        // }
        // {
        //     let n = Java.use("pc.r");
        //     //@ts-ignore
        //     n["accept"].implementation = function (obj) {
        //         console.log(`pcpc r.accept is called: obj=${obj}`);
        //         this["accept"](obj);
        //     };
        // }

        if (false) {
            let targetClass = 'bl1.a';
            let methodName = 'z';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object', 'java.lang.String').implementation = function (arg0, arg1) {
                console.log('\nGDA[Hook z(java.lang.Object,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1);
                let i = this[methodName](arg0, arg1);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'xc4.f';
            let methodName = 'f';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (arg0, arg1, arg2) {
                console.log('\nGDA[Hook f(java.lang.String,java.lang.String,java.lang.Throwable)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2);
                let i = this[methodName](arg0, arg1, arg2);
                console.log('\treturn ' + i);
                printStack("TaskError!")
                return i;
            }
        }
        if (false) {

            {
                let targetClass = 'wh4.c';
                let methodName = 'c';
                let gclass = Java.use(targetClass);
                //@ts-ignore
                gclass[methodName].overload('uh4.d').implementation = function (arg0) {
                    console.log('\nGDA[Hook c(uh4.d)]' + '\n\targ0 = ' + arg0);
                    // let i = this[methodName](arg0);
                    // console.log('\treturn ' + i);
                    // return i;
                    return;
                }
            }
            {
                let targetClass = 'wh4.d';
                let methodName = 'c';
                let gclass = Java.use(targetClass);
                //@ts-ignore
                gclass[methodName].overload('uh4.d').implementation = function (arg0) {
                    console.log('\nGDA[Hook c(uh4.d)]' + '\n\targ0 = ' + arg0);
                    // let i = this[methodName](arg0);
                    // console.log('\treturn ' + i);
                    // return i;
                    return;
                }
            }

            {
                let targetClass = 'com.xingin.xhs.xysalvage.internal.UploaderInterceptor';
                let methodName = 'c';
                let gclass = Java.use(targetClass);
                //@ts-ignore
                gclass[methodName].overload('uh4.d').implementation = function (arg0) {
                    console.log('\nGDA[Hook c(uh4.d)]' + '\n\targ0 = ' + arg0);
                    // let i = this[methodName](arg0);
                    // console.log('\treturn ' + i);
                    // return i;
                    return;
                }
            }
        }

        {
            let targetClass = 'rc4.f$a';
            let methodName = 'invoke';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object').implementation = function (arg0) {
                console.log('\nGDA[Hook invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
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
                console.log('\nGDA[Hook invoke(java.lang.Object)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let s = Java.use("tk4.s");
            //@ts-ignore
            s["N0"].implementation = function (j5, timeUnit) {
                console.log(`s.N0 is called: j5=${j5}, timeUnit=${timeUnit}`);
                j5 = 10000;
                let result = this["N0"](j5, timeUnit);
                console.log(`s.N0 result=${result}`);
                return result;
            };
        }

        // {
        //     let targetClass = 'gl4.x0';
        //     let methodName = 'C0';
        //     let gclass = Java.use(targetClass);
        //     //@ts-ignore
        //     gclass[methodName].overload('tk4.z').implementation = function (arg0) {
        //         console.log('\nGDA[Hook C0(tk4.z)]' + '\n\targ0 = ' + arg0 + " " + this);
        //         let i = this[methodName](arg0);
        //         printStack("C0")
        //         console.log('\treturn ' + i);
        //         return i;
        //     }
        // }

        {
            let targetClass = 'tk4.s';
            let methodName = 'A0';
            let gclass = Java.use(targetClass);
            let j = Java.use("java.lang.Object")
            //@ts-ignore
            gclass[methodName].overload('xk4.g', 'xk4.g', 'xk4.a', 'xk4.g').implementation = function (arg0, arg1, arg2, arg3) {
                console.log('\nGDA[Hook A0(xk4.g,xk4.g,xk4.a,xk4.g)] ' + this + '\n\targ0 = ' + Java.cast(arg0, j) + '\n\targ1 = ' + Java.cast(arg1, j) + '\n\targ2 = ' + Java.cast(arg2, j) + '\n\targ3 = ' + Java.cast(arg3, j));
                // printStack("taskStart!!!")

                let i = this[methodName](arg0, arg1, arg2, arg3);
                console.log('\treturn ' + Java.cast(i, j));
                return i;
            }
        }

    })
}
// setImmediate(main)


rpc.exports = {
    acac: function () {
        Java.perform(() => {

            let targetClass = 'lc.a1';
            let methodName = 'n1';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.content.Context').implementation = function (arg0) {
                console.log('\nGDA[Hook lc.a1.n1(android.content.Context)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        })
    }
} 
