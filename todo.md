# 音典网页版 - 修正字体路径

## 问题: 绝对路径不适应非根路径部署
- [x] 方案1: 将字体文件移到src/assets/fonts/,使用import导入
- [x] 方案2: 保持在public/fonts/,在CSS中使用相对于base的路径
- [x] 选择方案1,因为Vite会正确处理资源路径
