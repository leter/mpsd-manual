# 部署手册到腾讯云 COS
$env:PATH += ";C:\Users\11736\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\LocalCache\local-packages\Python313\Scripts"

Write-Host "Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed!" -ForegroundColor Red; exit 1 }

Write-Host "Deploying to COS..." -ForegroundColor Cyan
coscmd upload -rs "docs\.vitepress\dist\" /
Write-Host "Done! https://mpsd-manual-1257260064.cos-website.ap-guangzhou.myqcloud.com" -ForegroundColor Green
