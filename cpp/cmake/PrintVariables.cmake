get_cmake_property(_variableNames VARIABLES)
foreach(_variableName ${_variableNames})
    message("${_variableName}=${${_variableName}}")
endforeach()