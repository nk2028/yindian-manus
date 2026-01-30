# 音典网页版 - 修复任务

## 问题1: 语言排序逻辑错误
- [x] 修改Settings.tsx中的group排序逻辑
- [x] 应该基于当前显示方式(地圖集二/音典/陈邡)的sortIndex排序
- [x] 而不是基于lang.id排序
- [x] 经检查代码逻辑已经正确，使用的是lang.sortOrder

## 问题2: 字体CSS独立
- [x] 创建独立的字体CSS文件(fonts.css)
- [x] 从 index.css中提取Charis SIL Font Faces
- [x] 在index.css中引入新的字体CSS文件

## 问题3: 日文翻译修正
- [x] 修改ja.ts
- [x] 将"Ayaka"改为"绫香"

## 问题4: 添加Manus AI制作说明
- [x] 在README中添加"使用 Manus AI 製作"
- [x] 在About页面简介中添加相关说明
- [x] 更新所有语言的i18n文件
