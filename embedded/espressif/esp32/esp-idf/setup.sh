#!/usr/bin/env bash

set -x

export FREERTOS_PATH="$(pwd)"

# Environment shell script
export ENV_SH="$(pwd)/env.sh"

# Install prerequisites for building the toolchain
sudo apt-get install -y gcc git wget make libncurses-dev flex bison gperf python python-serial
# Setup of the toolchain
pushd ..
mkdir -p ./esp
cd ./esp
wget -nv \
     -c https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz \
     -O ./xtensa-esp32-elf.tar.gz
tar xfv ./xtensa-esp32-elf.tar.gz
rm -f ./xtensa-esp32-elf.tar.gz
echo -e "#!/usr/bin/env bash\n" > "${ENV_SH}"
echo "export PATH=${PATH}:$(pwd)/xtensa-esp32-elf/bin" >> "${ENV_SH}"
chmod +x "${ENV_SH}"
popd

# Setup of the SDK
pushd ../esp
if [ -d ./esp-idf ]; then
    cd ./esp-idf
    git pull
else
    git clone --recursive https://github.com/espressif/esp-idf.git
    cd ./esp-idf
fi
export IDF_PATH="$(pwd)"
echo "export IDF_PATH=${IDF_PATH}" >> "${ENV_SH}"
sudo python -m pip install -r ${IDF_PATH}/requirements.txt
popd
