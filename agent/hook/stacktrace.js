export function stackstrace(context) {
    console.log('Stackstrace called from:\n' + Thread.backtrace(context, Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\n') + '\n');
}


export function javastackstrace() {
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
}

export function printStack(name) {
    Java.perform(function () {
        var Exception = Java.use("java.lang.Exception"); 
        var ins = Exception.$new("Exception"); 
        var straces = ins.getStackTrace(); 
        if (straces != undefined && straces != null) {
            //var strace = straces.toString();
            //var replaceStr = strace.replace(/,/g, "\n");
            console.log("=============================" + name + " Stack strat======================="); 
            for (var i = 0; i < straces.length; i++) {
                var clazz = straces[i].getClassName(); 
                var method = straces[i].getMethodName(); 
                var theclazz = Java.use(clazz);
                var methods = theclazz.class.getMethods(); 
                for (var j = 0; j < methods.length; j++) {
                    if (method == (methods[j].getName())) {
                        console.log(methods[j].toGenericString());//重载的方法也要打印出来，我们不知道是哪个
                    }
                }
            } 
            console.log("=============================" + name + " Stack end=======================\r\n"); 
            Exception.$dispose();
        }
    });
}