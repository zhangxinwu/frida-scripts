let asanInitPtr = Process.getModuleByName("libc.so")!.base.add(0x4F8D0)
let asanInit = new NativeFunction(asanInitPtr, 'pointer', ['pointer', 'pointer'])

Interceptor.attach(asanInitPtr, {
    onEnter() {
        //@ts-ignore
        let option: NativePointer = this.context.rsi;
        let rate = option.add(0x10).readInt()
        console.log("default rate:", rate)
        option.add(0x10).writeInt(2000000)
    }
})