$headers = @{
    "Authorization" = "Client-ID ad4af3607983cfb"
}
$body = @{
    image = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("assets\img\hero-bg.jpg"))
}
$resp = Invoke-RestMethod -Uri "https://api.imgur.com/3/image" -Method Post -Headers $headers -Body $body
Write-Host $resp.data.link