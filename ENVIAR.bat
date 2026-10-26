@echo off
chcp 65001 >nul
title Enviar Portfólio
color 0b
cd /d "%~dp0"
echo Enviando arquivos para o GitHub...
git push -u origin main
echo.
pause
