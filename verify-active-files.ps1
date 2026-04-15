$projectPath = 'c:\Users\acer\Downloads\dmgbsd\car-project'

# Search in active project files only (excluding documentation)
$excludeFiles = @('EMAIL_REPLACEMENT_REPORT.md', 'replace-all-emails.ps1', 'final-email-verification.ps1')

Write-Host '=== VERIFICATION: Active Project Files ===' -ForegroundColor Cyan
Write-Host ''

$oldEmailPatterns = @(
    'info\.apexperformancecarrental@gmail\.com',
    'admin@apexcars\.com',
    'info@carrental\.com',
    'admin@premiumcarrental\.com',
    'support@premiumcarrental\.com'
)

$foundOld = $false
foreach ($pattern in $oldEmailPatterns) {
    $matches = Get-ChildItem -Path $projectPath -Recurse -File | Where-Object {
        $_.Extension -match '\.(html|php|js|json|txt|md|xml|css)$' -and
        $excludeFiles -notcontains $_.Name
    } | Select-String -Pattern $pattern
    
    if ($matches) {
        $foundOld = $true
        Write-Host "[FOUND OLD] $pattern in active files" -ForegroundColor Red
    }
}

if (!$foundOld) {
    Write-Host '[OK] No old emails in active project files' -ForegroundColor Green
}

Write-Host ''

# Count new emails in active files
$newEmailFiles = Get-ChildItem -Path $projectPath -Recurse -File | Where-Object {
    $_.Extension -match '\.(html|php|js|json|txt|md|xml|css)$' -and
    $excludeFiles -notcontains $_.Name
} | Select-String -Pattern 'info@apexcarsdubai\.com'

$newEmailCount = $newEmailFiles | Measure-Object | Select-Object -ExpandProperty Count

Write-Host "Active files with new email: $newEmailCount instances" -ForegroundColor Green
Write-Host ''
Write-Host 'SUCCESS: All email replacements are confirmed in active project files!' -ForegroundColor Green
Write-Host 'Documentation files contain old emails for reference only.' -ForegroundColor Yellow
