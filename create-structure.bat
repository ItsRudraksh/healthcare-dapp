@echo off
set "rootDir=QBFT-Network"

for %%N in (Node-1 Node-2 Node-3 Node-4) do (
    mkdir "%rootDir%\%%N\data" 2>nul
)

echo Directory structure created successfully.
pause