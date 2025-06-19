@echo off
REM This batch file starts the Next.js development server for invoice-fe

REM --- Configuration ---
REM Set the path to your invoice-fe project directory
REM IMPORTANT: Replace this with the actual path on your system!
set "PROJECT_DIR=D:\Invoice\ScrumInvoiceProject\invoice-fe"

REM Set the desired port for the Next.js app (optional, defaults to 3000 if not set)
REM set "PORT=3000"

REM --- Script Logic ---
echo.
echo Navigating to %PROJECT_DIR%...
cd "%PROJECT_DIR%"

if %errorlevel% neq 0 (
    echo Error: Could not change to directory "%PROJECT_DIR%".
    echo Please ensure the path is correct.
    pause
    exit /b 1
)

echo.
echo Starting Next.js development server...
echo (Press Ctrl+C to stop the server later)
echo.

REM If you set a custom PORT above, uncomment the line below:
REM set "PORT=%PORT%" && npm run dev
npm run dev

REM The server runs continuously, so the script will pause here.
REM To keep the window open after the server stops (e.g., if it crashes),
REM you can add 'pause' here, but for a dev server that runs indefinitely,
REM it's usually not needed as Ctrl+C closes the window too.