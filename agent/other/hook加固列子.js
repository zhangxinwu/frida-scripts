function Log(info) {
    Java.perform(function () {
        var LogClass = Java.use("android.util.Log");
        LogClass.e("打印日志", info);
    })
}
Java.perform(function () {
    var application = Java.use('com.stub.StubApp');

    application.attachBaseContext.overload('android.content.Context').implementation = function(context){

        var result = this.attachBaseContext(context);
        var classloader = context.getClassLoader();
        Java.classFactory.loader = classloader;

        Java.classFactory.use('OO0OOOOo.OOO0OOOOOo').OO0OOO00o0.implementation = function(){
        var retval = this.OO0OOO00o0();
        var hook = 999;
        Log('原始返回值：'+retval);
        if (retval == 0) {
        Log('成功修改永久会员：'+hook);
        return hook;
        } else {
        return retval;
         }
       }

    }
});