
fn = ida_kernwin.ask_file(0, '*.log', 'select log file')
if fn is None:
    print('no file selected')
    exit(0)
cc = ida_kernwin.ask_str('libcompatible.so:', 5, 'input patch library name:')
with open(fn, encoding='utf-8') as f:
    lines = f.readlines()
    for i in range(0, len(lines)):
        line = lines[i].strip()
        if cc in line:
            ls = line.split()
            value = int(ls[0], 16)
            if cc in ls[1]:
                ea = int(ls[1].split(':')[1], 16)
                ida_bytes.patch_dword(ea, value)
                idc.create_insn(ea)
print(fn, 'patch ok!')