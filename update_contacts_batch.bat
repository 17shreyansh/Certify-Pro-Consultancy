@echo off
echo Updating contact information across all HTML files...

REM Update phone numbers from (91) 8595509780 to +91 8595509780 / +91 8595532138
powershell -Command "(Get-Content 'bis-registration.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'bis-registration.html'"
powershell -Command "(Get-Content 'bee-certification.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'bee-certification.html'"
powershell -Command "(Get-Content 'wpc-license.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'wpc-license.html'"
powershell -Command "(Get-Content 'epr-certification.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'epr-certification.html'"
powershell -Command "(Get-Content 'erp-consultation.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'erp-consultation.html'"
powershell -Command "(Get-Content 'msme-registration.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'msme-registration.html'"
powershell -Command "(Get-Content 'gst-registration.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'gst-registration.html'"
powershell -Command "(Get-Content 'iec-code.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'iec-code.html'"
powershell -Command "(Get-Content 'iso-certification.html') -replace '\(91\) 8595509780', '+91 8595509780 / +91 8595532138' | Set-Content 'iso-certification.html'"

REM Update email addresses from info@certifyproconsultancy.co to info@certifyproconsultancy.com
powershell -Command "(Get-Content 'bis-registration.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'bis-registration.html'"
powershell -Command "(Get-Content 'bee-certification.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'bee-certification.html'"
powershell -Command "(Get-Content 'wpc-license.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'wpc-license.html'"
powershell -Command "(Get-Content 'epr-certification.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'epr-certification.html'"
powershell -Command "(Get-Content 'erp-consultation.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'erp-consultation.html'"
powershell -Command "(Get-Content 'msme-registration.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'msme-registration.html'"
powershell -Command "(Get-Content 'gst-registration.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'gst-registration.html'"
powershell -Command "(Get-Content 'iec-code.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'iec-code.html'"
powershell -Command "(Get-Content 'iso-certification.html') -replace 'info@certifyproconsultancy\.co', 'info@certifyproconsultancy.com' | Set-Content 'iso-certification.html'"

echo Contact information updated successfully across all HTML files!
pause