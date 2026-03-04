$projectDir = "c:\Users\acer\Downloads\car pro 2\car-project"
$newFooter = Get-Content "$projectDir\new_footer.txt" -Raw
$navbarScript = Get-Content "$projectDir\navbar_script.txt" -Raw

# List of files that need footer replacement (have old footer-default)
$filesToUpdateFooter = @("login.html","inventory-sold.html","inventory-comparison.html","error.html")

$updatedCount = 0
$addedScriptCount = 0

# Get all HTML files
$htmlFiles = Get-ChildItem "$projectDir/*.html" -File | ForEach-Object { $_.Name }

Write-Host "Processing $($htmlFiles.Count) HTML files...`n"

foreach ($htmlFile in $htmlFiles) {
    $filePath = Join-Path $projectDir $htmlFile
    $content = Get-Content $filePath -Raw
    $originalContent = $content
    
    # Replace old footer in specific files
    if ($filesToUpdateFooter -contains $htmlFile) {
        # Use simple string replacement for the footer opening tag
        if ($content -contains "footer-wrapper footer-default bg-footer-color") {
            # Find and replace the old footer completely
            $oldFooterPattern = $content | Select-String -Pattern "<!--==============================`r?`n`s*Footer Area`r?`n\s*==============================-->.*?</footer>" -AllMatches
            if ($null -ne $oldFooterPattern) {
                $content = $content -replace [regex]::Escape("<!--==============================`n`tFooter Area`n==============================-->`n    <footer class=""footer-wrapper footer-default bg-footer-color"">"), $newFooter
                write-Host "foot updated in $htmlFile"
            }
        }
    }
    
    # Add navbar script if missing (except index.html)
    if ($htmlFile -ne "index.html" -and $content -notcontains "Navbar Scroll Hide Script") {
        if ($content -contains "</body>") {
            $content = $content -replace "</body>", ($navbarScript + "`n</body>")
            $addedScriptCount++
            Write-Host "✓ Added navbar script to $htmlFile"
        }
    }
    
    # Write back if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        if (-not ($filesToUpdateFooter -contains $htmlFile)) {
            $updatedCount++
        }
    }
}

Write-Host "`n$('='*50)"
Write-Host "Navbar script added to: $addedScriptCount files"
Write-Host "Footer updated in: $($filesToUpdateFooter.Count) files"
Write-Host "$('='*50)"
