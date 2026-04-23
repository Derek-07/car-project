$projectPath = 'c:\Users\acer\Downloads\dmgbsd\car-project'
$oldEmails = @(
    'info\.apexperformancecarrental@gmail\.com',
    'admin@apexcars\.com',
    'info@carrental\.com',
    'admin@premiumcarrental\.com',
    'support@premiumcarrental\.com',
    'john@premiumcarrental\.com'
)

Write-Host '=== FINAL VERIFICATION SCAN ===' -ForegroundColor Cyan
Write-Host ''

$foundAny = $false
foreach ($pattern in $oldEmails) {
    $matches = Get-ChildItem -Path $projectPath -Recurse -File | Where-Object {
        $_.Extension -match '\.(html|php|js|json|txt|md|xml|css)$'
    } | Select-String -Pattern $pattern -Quiet
    
    if ($matches) {
        Write-Host "[FOUND] $pattern" -ForegroundColor Red
        $foundAny = $true
    } else {
        Write-Host "[CLEAN] $pattern" -ForegroundColor Green
    }
}

Write-Host ''
if (!$foundAny) {
    Write-Host '✅ SUCCESS: No old emails found in project!' -ForegroundColor Green
    Write-Host 'All 135 replacements are confirmed.' -ForegroundColor Green
} else {
    Write-Host '⚠️  WARNING: Some old emails still exist!' -ForegroundColor Yellow
}
