import frida
import os
import sys



def read_agent_js_source():
    with open(r"_agent.js", "rb") as f:
        return f.read().decode('utf8')

def on_message(message, data):
    print(message)
    pass

def build_agent_js(jsfile = '.\\agent\\tools.js'):
    _agent_path = "_agent.js"
    if os.path.exists(_agent_path):
        os.remove(_agent_path)
    os.system("frida-compile.exe -o _agent.js {}".format(jsfile))
    
    if not os.path.exists(_agent_path):
        raise RuntimeError('frida-compile agent.js error')


def remove_agent_js():
    _agent_path = "_agent.js"
    if os.path.exists(_agent_path):
        os.remove(_agent_path)

if __name__ == "__main__":
    os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
    build_agent_js()

    curdir = os.curdir

    device: frida.core.Device = frida.get_usb_device()
    pid = device.get_frontmost_application().pid
    session: frida.core.Session = device.attach(pid)

    script = session.create_script(read_agent_js_source())

    script.on('message', on_message)
    script.load()

    print('start push file: ')
    file_dir_list = ['lib', 'bin']
    filesdir = script.exports_sync.getfilesdir()
    for file_dir in file_dir_list:
        for f in os.listdir(file_dir):
            f = os.path.join(file_dir, f)
            source_path = os.path.join(curdir, f)
            target_path = filesdir + '/' + os.path.basename(f)
            print(target_path, source_path)
            if not script.exports_sync.checkfileexist(target_path):
                with open(source_path, "rb") as f:
                    so_buffer = f.read()
                    script.exports_sync.pushfile(target_path,  list(so_buffer))
                    print(target_path, ' <<<<<<< ok!')

    print('push end.')

    remove_agent_js()
