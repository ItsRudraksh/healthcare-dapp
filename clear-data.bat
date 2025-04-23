@echo off
set "rootDir=QBFT-Network"

for %%N in (Node-1 Node-2 Node-3 Node-4) do (
    if exist "%rootDir%\%%N\data" (
        del /s /q "%rootDir%\%%N\data\*" >nul 2>&1
        echo Cleared data in %rootDir%\%%N\data
    )
)

echo All data directories have been cleared.
pause