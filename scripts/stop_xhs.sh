ps -ef | grep u0_a34 | awk '{print $2}' | xargs kill

cd /data/user/0/com.xingin.xhs/files/mmkv/
# rm -rf kv_location kv_meta.crc petal_mmkv 
# rm -rf com.xingin.xhs.crc 
rm -rf com.xingin.xhs
# touch com.xingin.xhs