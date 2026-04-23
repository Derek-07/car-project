# Fix blog.html file - remove duplicates and add CSS link
$filePath = "c:\Users\acer\Downloads\dmgbsd\car-project\blog.html"

# Read the file
$content = Get-Content $filePath -Raw

# Find the first </head> tag position
$firstHeadClose = $content.IndexOf("</head>")

if ($firstHeadClose -eq -1) {
    Write-Host "ERROR: No </head> found in file"
    exit 1
}

# Extract content up to and including the first </head>
$headSection = $content.Substring(0, $firstHeadClose + 7)

# Read the rest of the file starting from after </head>
$restIndex = $firstHeadClose + 7
$restOfFile = $content.Substring($restIndex)

# Find where the actual body content starts (after first </head><body...>)
$bodyStart = $restOfFile.IndexOf("<body")
if ($bodyStart -ne -1) {
    # Find the closing > of the body tag
    $bodyTagEnd = $restOfFile.IndexOf(">", $bodyStart)
    if ($bodyTagEnd -ne -1) {
        # Find the first </html> to get the complete first document
        $firstHtmlClose = $restOfFile.IndexOf("</html>", $bodyTagEnd)
        if ($firstHtmlClose -ne -1) {
            # Extract the body content and closing tags
            $bodyContent = $restOfFile.Substring(0, $firstHtmlClose + 7)
            
            # Now add the CSS link before </head>
            $linkToAdd = "`r`n    <!-- Mobile Responsiveness Enhancement -->`r`n    <link rel=`"stylesheet`" href=`"assets/css/mobile-responsiveness-enhancement.css`">"
            
            # Insert before </head>
            $newHeadSection = $headSection.Replace("</head>", "$linkToAdd`r`n</head>")
            
            # Combine to create final file
            $finalContent = $newHeadSection + $bodyContent
            
            # Write back to file
            Set-Content $filePath -Value $finalContent -NoNewline
            
            Write-Host "Successfully fixed blog.html"
            Write-Host "- Removed duplicate head sections"
            Write-Host "- Added mobile-responsiveness-enhancement.css link"
        } else {
            Write-Host "ERROR: Could not find </html>"
            exit 1
        }
    }
} else {
    Write-Host "ERROR: Could not find <body tag"
    exit 1
}
