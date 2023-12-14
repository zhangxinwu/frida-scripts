import { stackstrace, printStack } from "../../agent/hook/stacktrace.js";
import { hookClass } from "../../agent/hook/hook_class_method.js"

function main() {

    let ct = 0;
    Java.perform(function () {
        if (false)
            Interceptor.attach(
                //@ts-ignore 
                Module.findExportByName("libc.so", "open"), {
                onEnter: function (args) {
                    //@ts-ignore 
                    let file = Memory.readCString(args[0]);
                    if (!file.includes("/dev/ashmem") && !file.includes("/proc/"))
                        console.log("open", file);
                },
                onLeave: function (retval) {

                }
            }

            );
        // log
        {
            let targetClass = 'xc4.f';
            let methodName = 'r';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('xc4.a', 'java.lang.String', 'java.lang.String', 'java.lang.Throwable', 'xc4.c').implementation = function (arg0, arg1, arg2, arg3, arg4) {
                console.log('\nGDA[Hook r(xc4.a,java.lang.String,java.lang.String,java.lang.Throwable,xc4.c)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3 + '\n\targ4 = ' + arg4);
                if (`${arg2}`.indexOf("getTokenViaCode code =") >= 0)
                    printStack("剪切板")
                let i = this[methodName](arg0, arg1, arg2, arg3, arg4);
                console.log('\treturn ' + i);
                return i;
            }
        }

        let module = Process.findModuleByName("libhoudini.so");
        if (module != null) {
            let hp = module.base.add(0x2F0C54);
            Interceptor.attach(hp, {
                onEnter(args) {
                    // console.log(args[0])
                    if (args[0].toInt32() == 0x101) {
                        let sc = args[2].readCString();
                        if (sc && sc.indexOf('files/mmkv/com.xingin.xhs') >= 0) {
                            console.log(args[0], args[1], args[2].readCString(), args[3], args[4]);
                            stackstrace(this.context);
                            printStack("hook!");
                        }
                    }
                }
            })
        }

        let f1 = Java.use("ak1.f1");
        //@ts-ignore
        f1["I"].implementation = function (activity) {
            console.log(`f1.I is called: activity=${activity}`);
            this["I"](activity);
            printStack("hook exception!")
        };

        // catch method.setAccessible(false);
        Java.use("java.lang.reflect.Method")["setAccessible"].overload('boolean').implementation = function (arg: boolean) {
            // printStack("reflect hook!")
            // console.log("reflect hook!", arg)
            if (arg == false) {
                let stack = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new())
                if (stack.indexOf("hd.a.a") >= 0) {
                    printStack("reflect stack!")
                    arg = true
                }
            }
            this["setAccessible"](arg)
        }

        Java.use("android.content.Intent").$init.overload("java.lang.String").implementation = function (arg: string) {
            console.log("intent init ", arg)
            return this.$init(arg)
        }

        Java.use("android.content.Intent").$init.overload("android.content.Context", "java.lang.Class").implementation = function (arg0: any, arg1: any) {
            console.log(`intent init ${arg0} ${arg1}`)
            if (`${arg1}`.indexOf("LoginDelaySplashActivity") >= 0) {
                printStack("LoginDelaySplashActivity")
            }
            return this.$init(arg0, arg1)
        }


        Java.use("android.content.Intent")["putExtra"].overload("java.lang.String", "java.lang.String").implementation = function (arg0: string, arg1: string) {
            console.log("intent put ", arg0, arg1)
            return this["putExtra"](arg0, arg1)
        }

        if (false) {
            let b = Java.use("aa3.b");
            //@ts-ignore
            b["z"].implementation = function (context) {
                console.log(`b.z is called: context=${context}`);
                let result = this["z"](context);
                console.log(`b.z result=${result}`);
                ct += 1;
                if (ct < 3) {
                    printStack("bzbzbz!")
                }
                return true;
            };
        };


        if (false) {
            let a = Java.use("bl1.a");
            //@ts-ignore
            a["w"].implementation = function (obj) {
                console.log(`a.w is called: obj=${obj}`);
                this["w"](obj);
            };
        }
        {
            let AppStartupTimeManager = Java.use("com.xingin.xhs.app.boot.AppStartupTimeManager");
            AppStartupTimeManager["getXyBootTaskDelayMode"].implementation = function () {
                console.log(`AppStartupTimeManager.getXyBootTaskDelayMode is called`);
                let result = this["getXyBootTaskDelayMode"]();
                console.log(`AppStartupTimeManager.getXyBootTaskDelayMode result=${result}`);
                return result;
            };
        }

        if (false)
            Java.choose("com.xingin.xhs.app.MainApplication", {
                onMatch(instance) {
                    console.log("find !!!")
                },
                onComplete() {
                    console.log("ok!")
                }
            })

        {
            let AppStartupTimeManager = Java.use("com.xingin.xhs.app.boot.AppStartupTimeManager");
            //@ts-ignore
            AppStartupTimeManager["recordMainApplicationCostTime"].implementation = function (j5) {
                console.log(`AppStartupTimeManager.recordMainApplicationCostTime is called: j5=${j5}`);
                this["recordMainApplicationCostTime"](j5);
            };
        }
        {
            let LoginDelaySplashActivity = Java.use("com.xingin.xhs.index.v2.splash.logindelay.LoginDelaySplashActivity");
            //@ts-ignore
            LoginDelaySplashActivity["onCreate"].implementation = function (bundle) {
                console.log(`LoginDelaySplashActivity.onCreate is called: bundle=${bundle}`);
                this["onCreate"](bundle);
                console.log(`LoginDelaySplashActivity.onCreate is called end`);
                printStack("LoginDelaySplashActivity")
            };
        }

        {
            let targetClass = 'vb0.c';
            let methodName = 'f';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String', 'long').implementation = function (arg0, arg1) {
                console.log('\nGDA[Hook f(java.lang.String,long)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1);
                let i = this[methodName](arg0, arg1);
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            hookClass("com.xingin.android.xhscomm.router.Routers");
        }

        {
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
                let ret = this["startActivity"](arg0);
                console.log(`startActivity is called end ${ret}`);
                return ret;
            };
        }

        {
            let targetClass = 'lm3.g';
            let methodName = 'j';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String').implementation = function (arg0) {
                console.log('\nGDA[Hook j(java.lang.String)]' + '\n\targ0 = ' + arg0);
                if (`${arg0}`.indexOf("json convert") >= 0) {
                    printStack("jsonConvert!")
                }
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let targetClass = 'ak1.f1';
            let methodName = 'B';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.String').implementation = function (arg0) {
                console.log('\nGDA[Hook B(java.lang.String)]' + '\n\targ0 = ' + arg0);
                let i = this[methodName](arg0);
                console.log('\treturn ' + i);
                return true;
            }

        }
        {
            let targetClass = 'vc0.f0$a';
            let methodName = 'c';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('android.app.Activity', 'in4.l').implementation = function (arg0, arg1) {
                console.log('\nGDA[Hook c(android.app.Activity,in4.l)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1);
                let i = this[methodName](arg0, arg1);
                console.log('\treturn ' + i);
                return i;
            }
        }
        {
            let targetClass = 'qc4.j';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('com.xingin.xhs.index.v2.splash.SplashV2Controller', 'android.content.Intent').implementation = function (arg0, arg1) {
                console.log('\nGDA[Hook $init(com.xingin.xhs.index.v2.splash.SplashV2Controller,android.content.Intent)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1);
                let i = this[methodName](arg0, arg1);
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
            let targetClass = 'sz3.h';
            let methodName = 'g';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Object', 'java.lang.String').implementation = function (arg0, arg1) {
                console.log('\nGDA[Hook g(java.lang.Object,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1);
                let i = this[methodName](arg0, arg1);
                console.log('\treturn ' + i);
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
                let i = this[methodName](arg0);
                printStack("Hook createLinker")
                console.log('\treturn ' + i);
                return i;
            }

        }

        {
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

        {
            Java.use("com.xingin.advert.spi.AdvertSpiImpl")["hasRedSplashAdToday"].implementation = function () {
                console.log("hasRedSplashAdToday!!!")
                return false
            }
        }

        {
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
            let targetClass = 'wx3.e';
            let methodName = 'a';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook a()]' + '');
                let i = this[methodName]();
                console.log('\twx3.e.a return ' + i);
                return i;
            }

        }

        {
            hookClass("wx3.e")
        }

        if (true) {
            Java.choose("wx3.e", {
                onMatch(instance) {
                    console.log("find=> wx3.e " + `${instance}`)
                    instance.cancel(true)
                },
                onComplete() {

                }
            })
        }

        {
            let targetClass = 'wx3.e';
            let methodName = 'run';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook run()]' + '');
                let i = this[methodName]();
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            let a = Java.use("t4.a");
            //@ts-ignore
            a["K"].implementation = function (arg0) {
                console.log(`a.K is called: ${arg0}`);
                this["K"](null);
            };
        }

        {
            let a = Java.use("od4.a");
            //@ts-ignore
            a["a"].implementation = function (th5, alet) {
                console.log(`a.a is called: th5=${th5}, alet=${alet}`);
                this["a"](th5, alet);
                printStack("networkError!")
            };
        }

        {
            let targetClass = 'wx3.e';
            let methodName = '$init';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].overload('java.lang.Runnable', 'java.lang.Object', 'java.lang.String', 'java.lang.String').implementation = function (arg0, arg1, arg2, arg3) {
                console.log('task_init0 [Hook $init(java.lang.Runnable,java.lang.Object,java.lang.String,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3);
                let i = this[methodName](arg0, arg1, arg2, arg3);
                console.log('\treturn ' + i);
                return i;
            }
            //@ts-ignore
            gclass[methodName].overload('java.lang.Runnable', 'java.lang.Object', 'java.lang.String', 'java.lang.String').implementation = function (arg0, arg1, arg2, arg3) {
                console.log('task_init1 [Hook $init(java.lang.Runnable,java.lang.Object,java.lang.String,java.lang.String)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3);
                let i = this[methodName](arg0, arg1, arg2, arg3);
                console.log('\treturn ' + i);
                return i;
            }
            //@ts-ignore
            gclass[methodName].overload('java.util.concurrent.Callable', 'java.lang.Object', 'java.lang.String', 'java.lang.String', 'tx3.d').implementation = function (arg0, arg1, arg2, arg3, arg4) {
                console.log('task_init2 [Hook $init(java.util.concurrent.Callable,java.lang.Object,java.lang.String,java.lang.String,tx3.d)]' + '\n\targ0 = ' + arg0 + '\n\targ1 = ' + arg1 + '\n\targ2 = ' + arg2 + '\n\targ3 = ' + arg3 + '\n\targ4 = ' + arg4);
                let i = this[methodName](arg0, arg1, arg2, arg3, arg4);
                console.log('\treturn ' + i);
                return i;
            }

        }
        if(false)
        {
            let targetClass = 'wx3.e';
            let methodName = 'run';
            let gclass = Java.use(targetClass);
            gclass[methodName].overload().implementation = function () {
                console.log('\nGDA[Hook run()]' + '');
                console.log(`task_run start ${this.i.value}`)
                let i = this[methodName]();
                console.log(`task_run end ${this.i.value}`)
                console.log('\treturn ' + i);
                return i;
            }
        }

        if(false)
        {
            //@ts-ignore
            Java.use("ve.m$a").$init.implementation = function() {
                console.log("ve.m$a");
                let i = this.$init()
                console.log("ve.m$a return ", i)
                return i
            }
        }

        {
            let targetClass = 'ak1.v0';
            let methodName = 'K';
            let gclass = Java.use(targetClass);
            //@ts-ignore
            gclass[methodName].implementation = function (arg0) {
                console.log(`\nGDA[Hook ${targetClass}.${methodName}()]` + '');
                let i = this[methodName](arg0);
                console.log(`Hook end ${i}`)
                console.log('\treturn ' + i);
                return i;
            }
        }

        {
            Java.use("com.xingin.login.activity.WelcomeActivity").$init.implementation = function()
            {
                console.log("com.xingin.login.activity.WelcomeActivity init")
                return this.$init()
            }
        } 

    })
}
setImmediate(main)