import sys, os
import copy
from capstone import *

regsLastState = {}
regsThisState = {}

def push_reg(tid, regId, regValue):
    if tid not in regsThisState:
        regsThisState[tid] = {}
    regsThisState[tid][regId] = regValue
    if tid in regsLastState and regId in regsLastState[tid] and regsLastState[tid][regId] == regsThisState[tid][regId]:
        regsLastState[tid].pop(regId)

def get_diff_state(tid):
    if tid not in regsLastState:
        return regsThisState[tid]
    else:
        diff = {}
        for regId in regsLastState[tid]:
            if regId in regsThisState[tid]:
                diff[regId] = regsThisState[tid][regId]
        return diff

def swap_state(tid):
    regsLastState[tid] = copy.deepcopy(regsThisState[tid])
    regsThisState[tid] = {}


def get_diff_state_str(tid):
    diff = get_diff_state(tid)
    diff_str = ''
    for regId in diff:
        if int(regId) < 34:
            diff_str += "x" + regId + '=' + diff[regId] + ' '
        else:
            diff_str += "s" + str(int(regId) - 34) + '=' + diff[regId] + ' '
        if diff[regId] in strLastState:
            diff_str += '(' + strLastState[diff[regId]].strip() + ') '
    return diff_str

pcLastState = {}

outfiles = {}

soLastState = {}

strLastState = {}

funcs = {}

md = Cs(CS_ARCH_ARM64, CS_MODE_ARM)
def get_insn(insn, pc):
    code = bytes.fromhex(insn)[-1::-1]
    for i in md.disasm(code, pc):
        return "0x%x:\t%s\t%s" %(i.address, i.mnemonic, i.op_str)

def run(logfile):
    dirpath = os.path.dirname(logfile)
    # outdir = os.path.join(dirpath, os.path.basename(logfile).split('.')[0]+"_anly")
    outdir = os.path.join(dirpath, "_anly")
    if not os.path.exists(outdir):
        os.makedirs(outdir)
    with open(logfile, encoding='utf8', errors="ignore") as f:
        for line in f:
            if '-' not in line:
                continue
            if ' >>' not in line:
                continue
            tid = line.split('-')[0].strip()
            if tid not in outfiles:
                filePath = os.path.join(outdir, tid + '.log')
                try:
                    outfiles[tid] = open(filePath, 'wb')
                except:
                    if tid in outfiles:
                        outfiles.pop(tid)
                    pass

            if 'x_fetch_insn >>  params[' in line:
                regId = line.split('[')[1].split(']')[0]
                regValue = line.split()[-1]
                push_reg(tid, regId, regValue)
            
            if 'x_fetch_insn >> param_F[' in line:
                regId = line.split('[')[1].split(']')[0]
                regValue = line.split()[-1]
                push_reg(tid, str(int(regId)+34), regValue)

            if 'x_fetch_insn >>  ' in line and 'vm_pc >>' in line:
                pc = line.split()[-1]
                pcLastState[tid] = pc
            
            if 'x_fetch_insn >>  so >>' in line:
                so = line.split()[-1]
                soLastState[tid] = so
            
            if 'x_fetch_insn >>  string' in line:
                a = line.split(' ', 8)
                if len(a) == 9:
                    strLastState[a[6]] = a[8].lstrip()
            
            if 'x_fetch_insn >>  func' in line:
                func = line.split(maxsplit=6)
                if len(func) >= 7:
                    funcs[int(func[5][2:], 16)] = func[6].strip()
            
            if 'x_fetch_insn >>  vm_insn >>' in line:
                insn = line.split()[-1]
                if tid in pcLastState:
                    pcInt = int(pcLastState[tid][2:], 16)
                    insn_str = get_insn(insn, pcInt)
                    if tid not in soLastState:
                        soLastState[tid] = ""
                    out = funcs[pcInt] if pcInt in funcs else ''
                    out += insn + ' ' + soLastState[tid] + ':' + insn_str \
                           + ' >> ' + get_diff_state_str(tid)
                    if tid not in outfiles:
                        filePath = 'D:/work/anly/houdini/tracelog_ys/' + tid + '.log'

                        outfiles[tid] = open(filePath, 'w')
                    outfiles[tid].write((out + '\n').encode('utf-8'))
                swap_state(tid)

    for tid in outfiles:
        outfiles[tid].close()


if len(sys.argv) < 2:
    print('Usage: python traceloganly.py <log file>')
else:
    logfile = sys.argv[1]
    if os.path.isdir(logfile):
        for f in os.listdir(logfile):
            log = os.path.join(logfile, f)
            if os.path.isfile(log):
                print(log)
                run(log)
    else:
        run(logfile)
# code = bytes.fromhex('a9ba6ffc')[-1::-1]
# md = Cs(CS_ARCH_ARM64, CS_MODE_ARM)
# for i in md.disasm(code, 0x1000):
#      print("0x%x:\t%s\t%s" %(i.address, i.mnemonic, i.op_str))

