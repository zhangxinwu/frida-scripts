
setImmediate(function() {
    Java.perform(function() {
        let ParsingPackageUtils = Java.use("android.content.pm.parsing.ParsingPackageUtils");
        ParsingPackageUtils.parseBaseApplication.implementation = function (arg1, arg2, arg3, arg4, arg5) {
            console.log("res ", JSON.stringify(arg3));
            console.log(`parseBaseApplication is called:  ${arg1} ${arg2} ${arg3} ${arg4} ${arg5}`)
            let ret = this.parseBaseApplication(arg1, arg2, arg3, arg4, arg5);
            console.log(`parseBaseApplication is called end ${ret}`)
            return ret;
        }
        let TypedArray = Java.use("android.content.res.TypedArray");
        TypedArray.getInt.overload('int', 'int').implementation = function (arg1, arg2) {
            let ss = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
            if (`${ss}`.indexOf("parseBaseApplication") >= 0) {
                if (arg1 == 62) {
                    // javastackstrace();
                    console.log("okkkk! AndroidManifestApplication_gwpAsanMode")
                    return 1;
                }
            }
            console.log(`getInt is called:  ${arg1} ${arg2}`)
            let ret = this.getInt(arg1, arg2);
            console.log(`getInt is called end ${ret}`)
            return ret;
        }
    })
})