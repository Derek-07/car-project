# Replace all email addresses with info@apexcarsdubai.com
$projectPath = 'c:\Users\acer\Downloads\dmgbsd\car-project'
$newEmail = 'info@apexcarsdubai.com'

# Define email patterns to replace (business emails only, no demo data)
$emailPatterns = @{
    'info\.apexperformancecarrental@gmail\.com' = $newEmail
    'admin@apexcars\.com' = $newEmail
    'info@carrental\.com' = $newEmail
    'admin@premiumcarrental\.com' = $newEmail
    'support@premiumcarrental\.com' = $newEmail
    'john@premiumcarrental\.com' = $newEmail
}

# Files to process (excluding node_modules, .git, etc.)
$fileExtensions = @('.html', '.php', '.js', '.json', '.md', '.txt', '.xml', '.css')

Write-Host "Starting email replacement across project..." -ForegroundColor Cyan
Write-Host "Target: $newEmail" -ForegroundColor Green
Write-Host ""

$totalReplacements = 0
$filesModified = 0

# Get all files recursively
Get-ChildItem -Path $projectPath -Recurse -File | Where-Object {
    $ext = $_.Extension.ToLower()
    $fileExtensions -contains $ext -and -not ($_.FullName -match 'node_modules|\.git|\.vscode')
} | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    
    try {
        $content = Get-Content -Path $filePath -Raw -ErrorAction Stop
        $originalContent = $content
        $fileReplacements = 0
        
        foreach ($pattern in $emailPatterns.Keys) {
            $replacement = $emailPatterns[$pattern]
            
            # Count matches before replacement
            $matches = [regex]::Matches($content, $pattern)
            if ($matches.Count -gt 0) {
                $content = $content -replace $pattern, $replacement
                $fileReplacements += $matches.Count
                $totalReplacements += $matches.Count
            }
        }
        
        # Write back if changes were made
        if ($fileReplacements -gt 0) {
            Set-Content -Path $filePath -Value $content -NoNewline
            $filesModified++
            Write-Host "[UPDATED] $fileName - $fileReplacements replacements" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "[ERROR] $fileName - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "REPLACEMENT COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Files modified: $filesModified" -ForegroundColor White
Write-Host "Total email replacements: $totalReplacements" -ForegroundColor White
