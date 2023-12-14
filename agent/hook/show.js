export function json(obj) {
    // let c = Java.use("com.google.gson.Gson")
    // let o = c.$new();
    // return o.toJson(obj);
    return Java.use("com.google.gson.GsonBuilder").$new().create().toJson(obj)
}