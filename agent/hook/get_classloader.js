Java.perform(function () {
    //get real classloader
    //from Frida 找不到类： java.lang.ClassNotFoundException: Didn...
    // http://www.lixiaopeng.top/article/63.html
    var application = Java.use("android.app.Application");
    var classloader;
    application.attach.overload('android.content.Context')
        .implementation = function (context) {
            var result = this.attach(context); // run attach as it is
            classloader = context.getClassLoader(); // get real classloader
            Java.classFactory.loader = classloader;
            return result;
        }
});

/**
xposed 实现 Android8.1
public void handleLoadPackage(XC_LoadPackage.LoadPackageParam loadPackageParam) throws Throwable {

        if (loadPackageParam.packageName.equals("com.cz.babySister")) {

            XposedBridge.log(" has Hooked!");
            XposedBridge.log("inner  => " + loadPackageParam.processName);

            Class ActivityThread = XposedHelpers.findClass("android.app.ActivityThread",loadPackageParam.classLoader);
            XposedBridge.hookAllMethods(ActivityThread, "performLaunchActivity", new XC_MethodHook() {
                @Override
                protected void afterHookedMethod(MethodHookParam param) throws Throwable {
                    super.afterHookedMethod(param);
                    Object mInitialApplication = (Application) XposedHelpers.getObjectField(param.thisObject,"mInitialApplication");
                    ClassLoader finalCL = (ClassLoader) XposedHelpers.callMethod(mInitialApplication,"getClassLoader");
                    XposedBridge.log("found classload is => "+finalCL.toString());
                    Class BabyMain = (Class)XposedHelpers.callMethod(finalCL,"findClass","com.cz.babySister.activity.MainActivity");
                    XposedBridge.log("found final class is => "+BabyMain.getName().toString());
                    fart(finalCL);

                }
            });
 */