function Log(info) {
    Java.perform(function () {
        var LogClass = Java.use("android.util.Log");
        LogClass.e("打印日志", info);
    })
}

Java.perform(function() {
        var Screenshot = Java.use("android.view.Window");
        Screenshot.addFlags.overload('int').implementation = function(Str) {
           Log("原始参数 : " + Str.toString())
           Log("[解除]. 已解除禁用截屏 ");
            return;
        }
    })
