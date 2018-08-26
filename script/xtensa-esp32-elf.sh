#!/usr/bin/env bash

#set -x

CPUS=$(lscpu | grep "^CPU(s):" | sed s/"CPU(s):                "//)

MULTIARCH_TUPLE="xtensa-esp32-elf"

CURRENT_DIR="$(pwd)"
SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "${SCRIPTS_DIR}")"
STAGING_DIR="${PROJECT_DIR}/staging/${MULTIARCH_TUPLE}"
BUILD_DIR="${PROJECT_DIR}/build.${MULTIARCH_TUPLE}"
CROSS_PATH="${PROJECT_DIR}/embedded/espressif/esp32/esp/xtensa-esp32-elf"

cd "${PROJECT_DIR}"
mkdir -p "${BUILD_DIR}"
pushd "${BUILD_DIR}"
rm -Rf *
cmake \
      -DCROSS_PATH=${CROSS_PATH} \
      -DCMAKE_VERBOSE_MAKEFILE:BOOL=ON \
      -DCMAKE_TOOLCHAIN_FILE="${PROJECT_DIR}/toolchain/${MULTIARCH_TUPLE}.cmake" \
      -DCMAKE_INSTALL_PREFIX="${STAGING_DIR}" \
      ..
make -j ${CPUS}
popd
cd "${CURRENT_DIR}"
