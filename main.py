import frida
import os
import sys



def read_agent_js_source():
    with open("_agent.js", "rb") as f:
        return f.read().decode('utf8')

def on_message(message, data):
    print(message)
    pass

def build_agent_js():
    _agent_path = "_agent.js"
    if os.path.exists(_agent_path):
        os.remove(_agent_path)
    os.system("npm run build")
    
    if not os.path.exists(_agent_path):
        raise RuntimeError('frida-compile agent.js error')

def remove_agent_js():
    _agent_path = "_agent.js"
    if os.path.exists(_agent_path):
        os.remove(_agent_path)

if __name__ == "__main__":
    build_agent_js()

    curdir = os.path.dirname(os.path.abspath(sys.argv[0]))

    device: frida.core.Device = frida.get_usb_device()
    pid = device.get_frontmost_application().pid
    session: frida.core.Session = device.attach(pid)

    script = session.create_script(read_agent_js_source())

    script.on('message', on_message)
    script.load()

    print('start push file: ')
    file_list = ["lib/libQBDI.so", "lib/libext.so", "lib/libext64.so"]
    filesdir = script.exports_sync.getfilesdir()
    for f in file_list:
        source_path = os.path.join(curdir, f)
        target_path = filesdir + '/' + os.path.basename(f)
        if not script.exports_sync.checkfileexist(target_path):
            with open(source_path, "rb") as f:
                so_buffer = f.read()
                print(target_path, source_path)
                script.exports_sync.pushfile(target_path,  list(so_buffer))

    print('push end.')

    remove_agent_js()