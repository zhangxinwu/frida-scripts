export function getContext() {
    var currentApplication= Java.use("android.app.ActivityThread").currentApplication();
    var context = currentApplication.getApplicationContext();
    return context
}