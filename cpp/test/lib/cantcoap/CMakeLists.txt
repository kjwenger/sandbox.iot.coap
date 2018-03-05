cmake_minimum_required(VERSION 3.9)
include(Paths)
include(ExternalProject)
ExternalProject_Add(
        cantcoap
        GIT_REPOSITORY https://github.com/staropram/cantcoap.git
        CONFIGURE_COMMAND :
        BUILD_COMMAND make nethelper.o staticlib HOME=${CMAKE_INSTALL_PREFIX}
        BUILD_IN_SOURCE 1
        INSTALL_COMMAND make install HOME=${CMAKE_INSTALL_PREFIX}
        INSTALL_DIR ${CMAKE_INSTALL_PREFIX}
)
