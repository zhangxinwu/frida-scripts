export function json(obj) {
    // let c = Java.use("com.google.gson.Gson")
    // let o = c.$new();
    // return o.toJson(obj);
    return Java.use("com.google.gson.GsonBuilder").$new().create().toJson(obj)
}
import { pushfile, pullfile } from '../tools.js'
export function getMaps() {
    return pullfile('/proc/'+Process.id+'/maps');
}

// path "/data/data/com.xingin1.xhs/maps"
export function saveMaps(path) {
    pushfile(path, pullfile('/proc/'+Process.id+'/maps'))
}