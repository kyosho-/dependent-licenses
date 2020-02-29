@echo off
setlocal enabledelayedexpansion

SET LIST_LICENSE=license-list.bat
SET LICENSE_CHK=npx license-checker --direct --json
SET RESULT=

for /f "usebackq tokens=*" %%i in (`call %LIST_LICENSE%`) do (
    set RESULT=!RESULT!;%%i
)

%LICENSE_CHK% --packages !RESULT! | jq -f license-json.jq
endlocal
