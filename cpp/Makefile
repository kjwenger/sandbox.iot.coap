PROJECT_SOURCE_DIR?=.
PROJECT_BINARY_DIR?=build
CMAKE_ARGS?=
GENERATOR_ARGS=
ifdef GENERATOR
    GENERATOR_ARGS=-G "${GENERATOR}"
endif
ifdef TOOLCHAIN
    CMAKE_ARGS+= -DCMAKE_TOOLCHAIN_FILE="../toolchain/${TOOLCHAIN}.cmake"
    PROJECT_BINARY_DIR=build.${TOOLCHAIN}
endif

all: build

# http://cprieto.com/posts/2016/10/cmake-out-of-source-build.html
.PHONY: configure
configure:
	cmake -H"${PROJECT_SOURCE_DIR}" -B"${PROJECT_BINARY_DIR}" ${GENERATOR_ARGS} ${CMAKE_ARGS}

${PROJECT_BINARY_DIR}/Makefile: configure

.PHONY: build
build: ${PROJECT_BINARY_DIR}/Makefile
	cmake --build "${PROJECT_BINARY_DIR}"

.PHONY: clean
clean:
	make -C "${PROJECT_BINARY_DIR}" clean

.PHONY: test
test: build
	make -C "${PROJECT_BINARY_DIR}" test
