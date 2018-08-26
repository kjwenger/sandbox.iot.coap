cmake_minimum_required(VERSION 3.10)

if (NOT DEFINED CMAKE_PREFIX_PATH)
    set(CMAKE_PREFIX_PATH ${CMAKE_SOURCE_DIR}/staging)
endif (NOT DEFINED CMAKE_PREFIX_PATH)

include(ExternalProject)
ExternalProject_Add(luanode
        GIT_REPOSITORY https://github.com/Nicholas3388/LuaNode.git
        CONFIGURE_COMMAND ./autogen.sh && ./configure --prefix=${CMAKE_PREFIX_PATH}
        BUILD_IN_SOURCE 1
        BUILD_COMMAND make
        INSTALL_COMMAND make install
        INSTALL_DIR ${CMAKE_PREFIX_PATH}
)
