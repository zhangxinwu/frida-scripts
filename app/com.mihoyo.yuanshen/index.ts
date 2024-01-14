
//@ts-ignore
let getReg = null;
let m = Process.findModuleByName("libhack.so")
if(!m) {
    m = Module.load("/data/local/tmp/libhack.so")
}
if (m) {
    let f = m.findExportByName("_Z7getRegsi")
    if (f)
        getReg = new NativeFunction(f, 'pointer', ['int'])
}

Process.enumerateModules().forEach(m => {
    // if (m.path.indexOf("miHoYo") >= 0) {
        // console.log(JSON.stringify(m))
})

class Range {
    //@ts-ignore
    constructor(start, end) {
        //@ts-ignore
        this.start = start
        //@ts-ignore
        this.end = end
    }
}
//@ts-ignore
let ranges = []

let maps = new File('/proc/self/maps', 'r')
while(true) {
    let line = maps.readLine()
    if (!line)
        break
    console.log(line)
    if (line.indexOf("miHoYo") >= 0 || line.indexOf("arm") >= 0) {
        line.split(" ").forEach(e => {
            if (e.indexOf("-") >= 0) {
                let r = new Range(parseInt(e.split("-")[0], 16), parseInt(e.split("-")[1], 16))
                ranges.push(r)
            }
        })
    }
}
//@ts-ignore
console.log(JSON.stringify(ranges))

function showArmStack(tid:number) {
    //@ts-ignore
    let regs = getReg(tid);
    let pcs = []
    let opcs = []
    if (!regs.equals(0)) {
        console.log("" + tid, regs)
        for (let i = 0; i < 32; i++) {
            // console.log('x'+i, regs.add(0x8*i).readPointer())
        }
        let fp = regs.add(0x8 * 29)
        pcs.push(regs.add(0x8 * 30).readPointer())
        opcs.push(regs.add(0x8 * 30).readPointer())
        {
            let fp0 = fp
            while (fp0 > 0) {
                try {
                    opcs.push(fp0.add(0x8).readPointer())
                    fp0 = fp0.readPointer()
                } catch (e) {
                    break
                }
            }
            console.log("acc", opcs)
        }
        for (let i = 0; i < 0x1000; i++) {
            fp = fp.add(0x8)
            try {

                //@ts-ignore
                for (let r of ranges) {
                    let pc = fp.readPointer()
                    if (pc >= r.start && pc < r.end) {
                        pcs.push(pc)
                        break
                    }
                }
            } catch (e) {
                break
            }
        }
        console.log('fuz', pcs)
        // console.log(hexdump(sp))
    }
}
//@ts-ignore
export function printArmStack() {
    //@ts-ignore
    Process.enumerateThreads().forEach(t => showArmStack(t.id))
    showArmStack(Process.getCurrentThreadId())
}