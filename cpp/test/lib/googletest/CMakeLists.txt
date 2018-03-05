cmake_minimum_required(VERSION 3.9)
include(Paths)
set(CMAKE_ARGS
        -DCMAKE_PREFIX_PATH=${CMAKE_PREFIX_PATH}
        -DCMAKE_INSTALL_PREFIX=${CMAKE_INSTALL_PREFIX}
        -DCMAKE_TOOLCHAIN_FILE=${CMAKE_TOOLCHAIN_FILE}
)
include(ExternalProject)
ExternalProject_Add(
        googletest
        GIT_REPOSITORY https://github.com/google/googletest.git
        CMAKE_ARGS ${CMAKE_ARGS}
        INSTALL_DIR ${CMAKE_INSTALL_PREFIX}
)
