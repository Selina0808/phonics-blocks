@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   启动本地服务器
echo ========================================
echo.
echo 服务器启动中...
echo 浏览器将自动打开游戏页面
echo.
echo 关闭服务器：关闭这个窗口即可
echo ========================================
echo.

:: 启动Python服务器
cd /d "%~dp0"
start http://localhost:8000/whats_missing_game.html
python -m http.server 8000
