@echo off
@REM ----------------------------------------------------------------------------
@REM Maven Wrapper Script for Windows
@REM ----------------------------------------------------------------------------
setlocal

set "SCRATCH_MAVEN=%~dp0..\..\apache-maven-3.9.6\bin\mvn.cmd"
if exist "%SCRATCH_MAVEN%" (
    call "%SCRATCH_MAVEN%" %*
    exit /b %ERRORLEVEL%
)

set "MAVEN_EXE=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6-bin\3311e1d4\apache-maven-3.9.6\bin\mvn.cmd"
if exist "%MAVEN_EXE%" (
    call "%MAVEN_EXE%" %*
    exit /b %ERRORLEVEL%
)

where mvn >nul 2>&1
if %ERRORLEVEL% equ 0 (
    mvn %*
    exit /b %ERRORLEVEL%
)

echo [ERROR] Apache Maven was not found. Please install Maven or check PATH.
exit /b 1
