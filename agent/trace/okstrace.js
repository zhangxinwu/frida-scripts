var stalker_number = 0
var stalker_tid = 0
var inst_maps = {}
export function okstrace(enterPointer, funcRealStartAddr, funcRealEndAddr) {
    Interceptor.attach(enterPointer, {
        onEnter: function (args) {
            var arg0 = args[0]
            var arg1 = args[1]
            var arg2 = args[2]
            var arg3 = args[3]
            console.log("----- arg0=" + arg0, ", arg1=" + arg1, ", arg2=" + arg2, arg2.readCString(), ", arg3=", arg3, arg2.readCString().indexOf('%s') >= 0 ? arg3.readCString() : "");
            this.curTid = Process.getCurrentThreadId();
            if(stalker_number == 0) stalker_number = this.curTid
            if(stalker_number != this.curTid) stalker_tid = this.curTid
            console.log("curTid=", stalker_tid, this.curTid);
            if (stalker_tid == this.curTid) {
                Stalker.follow(this.curTid, {
                    tid: this.curTid,
                    events: {
                        call: true, // CALL instructions: yes please            
                        ret: true, // RET instructions
                        exec: false, // all instructions: not recommended as it's
                        block: false, // block executed: coarse execution trace
                        compile: false // block compiled: useful for coverage
                    },
                    // onReceive: Called with `events` containing a binary blob comprised of one or more GumEvent structs. See `gumevent.h` for details about the format. Use `Stalker.parse()` to examine the data.
                    onReceive(events) {
                        let parsedEvents = Stalker.parse(events,{annotate: true, stringify: true})
                        // var parsedEventsStr = JSON.stringify(parsedEventsStr)
                        // console.log(">>> into onReceive: parsedEvents=" + parsedEvents + ", parsedEventsStr=" + parsedEventsStr);
                        console.log(">>> into onReceive: parsedEvents=" + parsedEvents.length, parsedEvents);
                        for (let event of parsedEvents) {
                            let [name, addr] = event;
                            if (ptr(addr) >= funcRealStartAddr && ptr(addr) < funcRealEndAddr) {
                                let sptr = ptr(addr).sub(funcRealStartAddr)
                                console.log(this.tid, name, addr, "+", sptr, sptr in inst_maps ? inst_maps[sptr] : "")
                            }
                        }
                    },

                    // transform: (iterator: StalkerArm64Iterator) => {
                    transform: function (iterator) {
                        let instruction = iterator.next();
                        if (instruction) {
                            const startAddress = instruction.address;
                            // console.log("+++ into iterator: startAddress=" + startAddress);
                            // const isAppCode = startAddress.compare(funcRealStartAddr) >= 0 && startAddress.compare(funcRealEndAddr) === -1;
                            // const isAppCode = (startAddress.compare(funcRealStartAddr) >= 0) && (startAddress.compare(funcRealEndAddr) < 0);
                            const gt_realStartAddr = startAddress.compare(funcRealStartAddr) >= 0
                            const lt_realEndAddr = startAddress.compare(funcRealEndAddr) < 0
                            var isAppCode = gt_realStartAddr && lt_realEndAddr
                            try {
                                // console.log("+++ into iterator: startAddress=" + startAddress, JSON.stringify(Process.getModuleByAddress(startAddress)));
                            } catch (e) { }

                            // // for debug
                            // isAppCode = true

                            // console.log("isAppCode=" + isAppCode + ", gt_realStartAddr=" + gt_realStartAddr + ", lt_realEndAddr=" + lt_realEndAddr);
                            do {
                                if (isAppCode) {
                                    // is origal function code = which we focus on

                                    // console.log("instruction: address=" + instruction.address
                                    //     + ",next=" + instruction.next
                                    //     + ",size=" + instruction.size
                                    //     + ",mnemonic=" + instruction.mnemonic
                                    //     + ",opStr=" + instruction.opStr
                                    //     + ",operands=" + JSON.stringify(instruction.operands)
                                    //     + ",regsAccessed=" + JSON.stringify(instruction.regsAccessed)
                                    //     + ",regsRead=" + JSON.stringify(instruction.regsRead)
                                    //     + ",regsWritten=" + JSON.stringify(instruction.regsWritten)
                                    //     + ",groups=" + JSON.stringify(instruction.groups)
                                    //     + ",toString()=" + instruction.toString()
                                    //     + ",toJSON()=" + JSON.stringify(instruction)
                                    // );

                                    var curRealAddr = instruction.address;
                                    // const isAppCode = curRealAddr.compare(funcRealStartAddr) >= 0 && curRealAddr.compare(funcRealEndAddr) === -1;
                                    // console.log(curRealAddr + ": isAppCode=" + isAppCode);
                                    var curOffsetHexPtr = curRealAddr.sub(funcRealStartAddr)
                                    var curOffsetInt = curOffsetHexPtr.toInt32()

                                    // var instructionStr = instruction.mnemonic + " " + instruction.opStr
                                    var instructionStr = instruction.toString()
                                    // console.log("\t" + curRealAddr + ": " + instructionStr);
                                    // console.log("\t" + curRealAddr + " <+" + curOffsetHexPtr + ">: " + instructionStr);
                                    inst_maps[curOffsetHexPtr] = instructionStr
                                    // if (curOffsetInt == 8516) {
                                    //     console.log("curOffsetInt=" + curOffsetInt);
                                    //     // iterator.putCallout(needDebug);
                                    //     iterator.putCallout((context) => {
                                    //         var contextStr = JSON.stringify(context)
                                    //         console.log("contextStr=" + contextStr);
                                    //         var x9Value1 = context.x9
                                    //         var x9Value2 = context["x9"]
                                    //         console.log("x9Value1=" + x9Value1 + ", x9Value2=" + x9Value2)
                                    //     });
                                    // }
                                }
                                iterator.keep();
                            } while ((instruction = iterator.next()) !== null);
                        }
                    }
                });

                // function needDebug(context) {
                //     console.log("into needDebug");
                //     // console.log("into needDebug: context=" + context);
                //     // var contextStr = JSON.stringify(context, null, 2)
                //     // console.log("context=" + contextStr);
                //     // var x9Value1 = context.x9
                //     // var x9Value2 = context["x9"]
                //     // console.log("x9Value1=" + x9Value1 + ", x9Value2=" + x9Value2)
                // }
            }
        },
        onLeave: function (retval) {
            // console.log("retval=", retval)
            // Stalker.unfollow(this.curTid);
            // console.log("Stalker.unfollow curTid=", this.curTid)
        }
    })
}