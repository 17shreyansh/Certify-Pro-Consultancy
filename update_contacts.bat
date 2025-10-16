@echo off
echo Updating contact information in remaining service pages...

REM List of remaining files to update
set files=epr-certification.html erp-consultation.html iec-code.html iso-certification.html wpc-license.html

for %%f in (%files%) do (
    echo Updating %%f...
    
    REM Update footer stats with counter classes
    powershell -Command "(Get-Content '%%f') -replace '<span class=\""stat-number\"">500\+</span>', '<span class=\""stat-number counter\"" data-target=\""500\"">0</span><span>+</span>' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '<span class=\""stat-number\"">98%%</span>', '<span class=\""stat-number counter\"" data-target=\""98\"">0</span><span>%%</span>' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '<span class=\""stat-number\"">12\+</span>', '<span class=\""stat-number counter\"" data-target=\""12\"">0</span><span>+</span>' | Set-Content '%%f'"
    
    REM Update contact information
    powershell -Command "(Get-Content '%%f') -replace '123 Business District, New Delhi, India', 'C-1/4-5, 3rd floor, rama park dwarka mor metro station New Delhi 110059' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '\+91 98765 43210', '(91) 8595509780' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace 'info@certifyproconsultancy\.com', 'info@certifyproconsultancy.co' | Set-Content '%%f'"
    
    REM Update WhatsApp link
    powershell -Command "(Get-Content '%%f') -replace 'https://wa\.me/919876543210', 'https://wa.me/918595509780' | Set-Content '%%f'"
)

echo All files updated successfully!
pause