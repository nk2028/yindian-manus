# 音典网页版 - 所有修复已完成

## 问题1: dark theme 持久化问题
- [x] 移除 App.tsx 中 ThemeProvider 的硬编码 defaultTheme
- [x] 确保 localStorage 中的 theme 值正确读取和应用
- [x] 测试刷新后 theme 状态是否一致

## 问题2: 设置页面 dark mode 样式
- [x] 修复 Settings.tsx 中语言选择区域的白色背景
- [x] 将 bg-white 改为 bg-card
- [x] 测试 dark mode 下的显示效果

## 问题3: 广韵表格边框
- [x] 移除 Settings.tsx 中广韵显示方式表格的外层边框
- [x] 测试移除边框后的显示效果
