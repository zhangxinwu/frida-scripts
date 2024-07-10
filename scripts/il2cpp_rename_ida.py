mod = ""
cls = ""

with open(r'D:\work\anly\全明星\dump.cs') as f:
    lines = f.readlines()
    for i in range(0, len(lines)):
        line = lines[i].strip()
        print(i)
        if "// Namespace:" in line:
            # // Namespace: ULinker.UImporter
            mod = line.split()[-1].replace('.', '_')
            # public class StaticMeshDescriptor : UnrealDescriptor
            l = ''
            j = 1
            while 'class' not in l or 'struct' not in l:
                l = lines[i+j]
                j += 1
                if '//' in l:
                    break
            if 'class' in l or 'struct' in l:
                if 'sealed' in l:
                    cls = l.split()[3]
                else:
                    cls = l.split()[2]
            else:
                cls = ''

        if "// RVA: 0x" in line and "// RVA: 0x " not in line:
            ea = int(line.split()[2][2:], 16)
            methods = lines[i+1].strip().split()
            method = ''
            for m in methods:
                if '(' in m:
                    method = m.split('(')[0]
            name = mod + '_' + cls + '_' + method + '_sub_' + hex(ea)
            name = name.replace('<', '_').replace('>', '_').replace(':',"")
            idaapi.set_name(ea, name)
