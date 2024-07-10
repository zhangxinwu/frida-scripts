/* VPN相关检查 */
Java.perform(function() {
    var NInterface = Java.use("java.net.NetworkInterface");
    try {
        NInterface.isUp.overload().implementation = function() {
            //console.log("Network Down");      
            return false;
            // 在极少数情况下可能会导致连接丢失，所以要小心
        }
    } catch (err) {
        console.error(err);
    }
    try {
        var NInterface = Java.use("java.net.NetworkInterface");
        NInterface.getName.overload().implementation = function() {
            var IName = this.getName();
            if (IName == "tun0" || IName == "ppp0" || IName == "p2p0" || IName == "ccmni0" || IName == "tun") {
                console.log("Detected Interface Name : ", JSON.stringify(this.getName()));
                return "FuckYou";
            }
            return this.getName();
        }
    } catch (err) {
        console.error(err);
    }
    try {
        var GetProperty = Java.use("java.lang.System");
        GetProperty.getProperty.overload("java.lang.String").implementation = function(getprop) {
            if (getprop.indexOf("http.proxyHost") >= 0 || getprop.indexOf("http.proxyPort") >= 0) {
                var newprop = "CKMKB"
                return this.getProperty.call(this, newprop);
            }
            return this.getProperty(getprop);
        }
    } catch (err) {
        console.error(err);
    }
    try {
        var NCap = Java.use("android.net.NetworkCapabilities");
        NCap.hasTransport.overload("int").implementation = function(values) {
            console.log("检测到 HasTransport 检查 ");
            if (values == 4)
                return false;
            else
                return this.hasTransport(values);
        }
    } catch (e) {
        console.error(e);
    }
})