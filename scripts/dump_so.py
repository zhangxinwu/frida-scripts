import sys
import frida
import sys
import os


def read_frida_js_source():
    with open("_agent.js", "rb") as f:
        return f.read().decode('utf8')


def on_message(message, data):
    print(message)
    pass


def build_agent_js(jsfile='./agent/tools.js'):
    _agent_path = "_agent.js"
    if os.path.exists(_agent_path):
        os.remove(_agent_path)
    os.system("frida-compile -o _agent.js {}".format(jsfile))

    if not os.path.exists(_agent_path):
        raise RuntimeError('frida-compile agent.js error')


def remove_agent_js():
    _agent_path = "_agent.js"
    if os.path.exists(_agent_path):
        os.remove(_agent_path)


def main(origin_so_name):
    print('start dump', origin_so_name)
    retf = script.exports_sync.dumpso(origin_so_name)
    print('ret->', retf)
    sofile = retf[0]
    fixsofile = retf[1]
    if sofile:
        buffer = script.exports_sync.pullfile(sofile)
        with open(os.path.basename(sofile), 'wb') as f:
            f.write(buffer)
        print(sofile + " is old")
    if fixsofile:
        buffer = script.exports_sync.pullfile(fixsofile)
        with open(os.path.basename(fixsofile), 'wb') as f:
            f.write(buffer)
        print(fixsofile + " is fixed")
    else:
        print('can not find ' + origin_so_name)


if __name__ == "__main__":
    os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

    build_agent_js('agent/dump/dump_so.js')
    device: frida.core.Device = frida.get_usb_device()
    if len(sys.argv) > 2:
        pid = int(sys.argv[2])
    else:
        pid = device.get_frontmost_application().pid
    session: frida.core.Session = device.attach(pid)
    script = session.create_script(read_frida_js_source())
    script.on('message', on_message)
    script.load()

    main(sys.argv[1])
    read_frida_js_source()
