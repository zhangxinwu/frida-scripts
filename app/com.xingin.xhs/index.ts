import { printStack,stackstrace } from "../../agent/hook/stacktrace.js"

setImmediate(() => {
    Java.perform(()=>{
        let ec = Java.use("java.lang.UnsatisfiedLinkError")
        ec.$init.overload().implementation = function(){
            printStack("exception!")
            // stackstrace(this.context)
        }
        ec.$init.overload('java.lang.String').implementation = function(s:string){
            // pushfile('/data/data/com.xingin1.xhs/maps', pullfile('/proc/'+Process.id+'/maps'))
            Java.perform(()=>{
                printStack("exception! -> s:"+s)
            })
            // stackstrace(this.context)
        }
    })
})