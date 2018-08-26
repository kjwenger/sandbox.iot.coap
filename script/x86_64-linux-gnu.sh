#!/usr/bin/env bash

#set -x

CPUS=$(lscpu | grep "^CPU(s):" | sed s/"CPU(s):                "//)

MULTIARCH_TUPLE="x86_64-linux-gnu"

CURRENT_DIR="$(pwd)"
SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "${SCRIPTS_DIR}")"
BUILD_DIR="${PROJECT_DIR}/build.${MULTIARCH_TUPLE}"

cd "${PROJECT_DIR}"
mkdir -p "${BUILD_DIR}"
pushd "${BUILD_DIR}"
rm -Rf *
cmake \
      -DCMAKE_VERBOSE_MAKEFILE:BOOL=ON \
      ..
make -j ${CPUS}
popd
cd "${CURRENT_DIR}"
