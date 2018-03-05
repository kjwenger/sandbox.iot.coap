cmake_minimum_required(VERSION 3.9)
include(Paths)
set(CMAKE_CXX_STANDARD 11)
enable_testing()
find_package(Threads REQUIRED)
file(GLOB_RECURSE SRC
        ./*.cpp
)
add_executable(test.cantcoap
        ${SRC}
)
set_property(TARGET test.cantcoap PROPERTY CXX_STANDARD 11)
add_dependencies(test.cantcoap googletest)
ExternalProject_Get_Property(googletest SOURCE_DIR)
target_include_directories(test.cantcoap PUBLIC
        ${SOURCE_DIR}/googletest/include
)
ExternalProject_Get_Property(cantcoap SOURCE_DIR BINARY_DIR)
target_include_directories(test.cantcoap PUBLIC
        ${SOURCE_DIR}
)
target_link_libraries(test.cantcoap
        ${CMAKE_THREAD_LIBS_INIT}
        ${BINARY_DIR}/nethelper.o
        ${CMAKE_PREFIX_PATH}/lib/${CMAKE_STATIC_LIBRARY_PREFIX}cantcoap${CMAKE_STATIC_LIBRARY_SUFFIX}
        ${CMAKE_PREFIX_PATH}/lib/${CMAKE_STATIC_LIBRARY_PREFIX}gtest${CMAKE_STATIC_LIBRARY_SUFFIX}
        ${CMAKE_PREFIX_PATH}/lib/${CMAKE_STATIC_LIBRARY_PREFIX}gtest_main${CMAKE_STATIC_LIBRARY_SUFFIX}
)
add_test(
        NAME test.cantcoap
        COMMAND test.cantcoap
)
