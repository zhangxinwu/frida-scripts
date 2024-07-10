function Log(info) {
    Java.perform(function () {
        var LogClass = Java.use("android.util.Log");
        LogClass.e("打印日志", info);
    })
}
function main() {
    Log("Log测试");
}

setImmediate(main);
