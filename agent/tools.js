import { resolve } from "path";

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

export function pushfile(filepath, buffer) {
    let file = new File(filepath, "wb");
    file.write(buffer);
    file.close();
    chmod(filepath);
}

export function pullfile(filepath) {
    let file = new File(filepath, "rb");
    let buffer = file.readBytes();
    file.close();
    return buffer;
}


export function mkdir(path) {
    Java.perform(() => {
        let File = Java.use("java.io.File");
        let file = File.$new(path);
        let dir_list = [];
        while (!file.exists()) {
            dir_list.unshift(file);
            file = file.getParentFile();
        }
        for (let i = 0; i < dir_list.length; i++) {
            dir_list[i].mkdirs();
        }
    })
}

export async function exec(cmd) {
    return await new Promise(resolve => {
        Java.perform(function () {
            console.log(cmd);
            const Runtime = Java.use('java.lang.Runtime');
            const process = Runtime.getRuntime().exec(cmd);
            const InputStreamReader = Java.use('java.io.InputStreamReader');
            const BufferedReader = Java.use('java.io.BufferedReader');
            const inputStreamReader = InputStreamReader.$new(process.getInputStream());
            const bufferedReader = BufferedReader.$new(inputStreamReader);
            let line = null;
            var sb = "";
            while ((line = bufferedReader.readLine()) != null) {
                console.log(line);
                sb += line + '\n';
            }
            resolve(sb);
        });
    })
}

// rpc.exports = {
//     chmod: chmod,
//     pushfile: pushfile,
//     pullfile: pullfile,
//     getfilesdir: getfilesdir,
//     checkfileexist: checkFileExist,
//     mkdir: mkdir,
//     exec: exec
// }
