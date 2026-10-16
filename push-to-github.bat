@echo off
title Publishing Attendo to GitHub
echo Moving to Attendo project directory...
cd /d "C:\Users\divyansh jaiswal\.gemini\antigravity-ide\scratch\smart-campus-attendance"
echo.
echo Pushing project to https://github.com/krishnajais945145-dotcom/attendo.git ...
"%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" push -u origin main
echo.
pause
