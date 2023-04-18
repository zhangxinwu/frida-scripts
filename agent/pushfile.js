
export function chmod(path) {
    var chmod_ptr = Module.getExportByName('libc.so', 'chmod');
    var chmod_func = new NativeFunction(chmod_ptr, 'int', ['pointer', 'int']);
    var c_path = Memory.allocUtf8String(path);
    chmod_func(c_path, parseInt('0755', 8));
}

export function getContext() {
    let currentApplication = Java.use("android.app.ActivityThread").currentApplication();
    return currentApplication.getApplicationContext();
}

export async function getfilesdir() {
    return await new Promise(resolve => {
        Java.perform(() => {
            let path = getContext().getFilesDir().getAbsolutePath();
            let File = Java.use("java.io.File");
            let file = File.$new(path);
            if (!file.exists()) {
                file.mkdirs();
            }
            resolve(path);
        })
    })
    
}

export async function checkFileExist(so_path) {
    return await new Promise(resolve => {
        Java.perform(() => {
            let File = Java.use("java.io.File");
            let file = File.$new(so_path);
            if (file.exists()) {
                resolve(true)
            }
            resolve(false);
        })
    })
}

export function pushfile(so_path, so_buffer) {
    let file = new File(so_path, "wb");
    file.write(so_buffer);
    file.close();
    chmod(so_path);
}

rpc.exports = {
    chmod: chmod,
    pushfile: pushfile,
    getfilesdir: getfilesdir,
    checkfileexist: checkFileExist
}
