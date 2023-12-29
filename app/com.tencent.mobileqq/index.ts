import {hookClass} from "../../agent/hook/hook_class_method.js"
import {printStack} from "../../agent/hook/stacktrace.js"

setImmediate(function () {
    Java.perform(function () {
        var targetClass = 'com.tencent.qphone.base.util.QLog';
        var methodName = 'isColorLevel';
        var gclass = Java.use(targetClass);
        hookClass(targetClass);
        gclass[methodName].overload().implementation = function () {
            console.log('\nGDA[Hook isColorLevel()]' + '');
            var i = this[methodName]();
            console.log('\treturn ' + i);
            return true;
        }

        {
            //@ts-ignore
            gclass.d.overload("java.lang.String", "int", "java.lang.String", "java.lang.Throwable").implementation = function(arg0, arg1, arg2, arg3) {
                console.log("QLog.d ", arg0, arg1, arg2, arg3)
                if (`${arg2}`.indexOf("function") >= 0) {
                    printStack("js!")
                }
            }
        }
    })
})
