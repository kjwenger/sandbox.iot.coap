# https://raw.githubusercontent.com/warmcat/libwebsockets/master/contrib/cross-esp32.cmake

set(CMAKE_SYSTEM_NAME Linux)

if(NOT CROSS_PATH)
    get_filename_component(CROSS_PATH
            "${CMAKE_CURRENT_SOURCE_DIR}/../embedded/espressif/esp32/esp/xtensa-esp32-elf"
            ABSOLUTE)
endif(NOT CROSS_PATH)
if(NOT IDF_PATH)
    get_filename_component(IDF_PATH
            "${CMAKE_CURRENT_SOURCE_DIR}/../embedded/espressif/esp32/esp/esp-idf"
            ABSOLUTE)
endif(NOT IDF_PATH)
if (NOT DEFINED CMAKE_PREFIX_PATH)
    set(CMAKE_PREFIX_PATH "${CMAKE_CURRENT_SOURCE_DIR}/staging/xtensa-esp32-elf")
endif (NOT DEFINED CMAKE_PREFIX_PATH)
if (NOT DEFINED CMAKE_INSTALL_PREFIX)
    set(CMAKE_INSTALL_PREFIX ${CMAKE_PREFIX_PATH})
endif (NOT DEFINED CMAKE_INSTALL_PREFIX)
if (NOT DEFINED CMAKE_STAGING_PREFIX)
    set(CMAKE_STAGING_PREFIX ${CMAKE_PREFIX_PATH})
endif (NOT DEFINED CMAKE_STAGING_PREFIX)

set(CMAKE_C_COMPILER "${CROSS_PATH}/bin/xtensa-esp32-elf-gcc${EXECUTABLE_EXT}")
set(CMAKE_AR         "${CROSS_PATH}/bin/xtensa-esp32-elf-ar${EXECUTABLE_EXT}")
set(CMAKE_RANLIB     "${CROSS_PATH}/bin/xtensa-esp32-elf-ranlib${EXECUTABLE_EXT}")
set(CMAKE_LINKER     "${CROSS_PATH}/bin/xtensa-esp32-elf-ld${EXECUTABLE_EXT}")

set(CMAKE_C_FLAGS "-nostdlib -Wall -Werror \
    -I${BUILD_DIR_BASE}/include \
    -I${IDF_PATH}/components/newlib/platform_include \
    -I${IDF_PATH}/components/mdns/include \
    -I${IDF_PATH}/components/heap/include \
    -I${IDF_PATH}/components/driver/include \
    -I${IDF_PATH}/components/spi_flash/include \
    -I${IDF_PATH}/components/nvs_flash/include \
    -I${IDF_PATH}/components/tcpip_adapter/include \
    -I${IDF_PATH}/components/lwip/include/lwip/posix \
    -I${IDF_PATH}/components/lwip/include/lwip \
    -I${IDF_PATH}/components/lwip/include/lwip/port \
    -I${IDF_PATH}/components/esp32/include/ \
    -I${IDF_PATH}/components/bootloader_support/include/ \
    -I${IDF_PATH}/components/app_update/include/ \
    -I$(IDF_PATH)/components/soc/esp32/include/ \
    -I$(IDF_PATH)/components/soc/include/ \
    -I$(IDF_PATH)/components/vfs/include/ \
    ${LWS_C_FLAGS} -Os \
    -I${IDF_PATH}/components/nvs_flash/test_nvs_host \
    -I${IDF_PATH}/components/freertos/include \
    -L${IDF_PATH}/components/esp32" CACHE STRING "" FORCE
)

set(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS}")

set(CMAKE_FIND_ROOT_PATH
        "${CROSS_PATH}"
        "${IDF_PATH}/components/esp32"
)

set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)

set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
