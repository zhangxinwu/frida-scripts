import { hook_native_register, hook_ArtMethodRegister, hook_RegisterNatives } from "../hook_native_register.js";

Java.perform(() => {
    // hook_native_register();

    hook_ArtMethodRegister();
    hook_RegisterNatives();
});
