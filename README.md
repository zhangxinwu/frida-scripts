### How use it

```sh
$ git clone https://github.com/zhangxinwu/frida-scripts.git
$ cd frida-scripts
$ npm install
$ npm run watch
$ npm run f
```
edit package.json, change "config" for your appname and script file.

### for init android env
```sh
$ # start frida server
$ adb shell /data/local/tmp/frida-server
$ # start app in android
$ # push so file to app.data.dir 
$ python scripts/push_file.py
```