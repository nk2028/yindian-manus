# 音典网页版 - 新任务列表

## 任务1: 修复 dark theme 背景色问题
- [x] Settings.tsx: 移除 `bg-gray-50` 硬编码,改为 `bg-background`
- [x] Query.tsx: 检查并移除硬编码背景色
- [x] About.tsx: 检查并移除硬编码背景色
- [x] 测试 dark theme 切换功能

## 任务2: 重构 pronunciation 为字音
- [ ] types/index.ts: 重命名 Pronunciation 相关类型
- [ ] dataProcessor.ts: 重构所有 pronunciation 变量名
- [ ] Query.tsx: 重构所有 pronunciation 变量名
- [ ] 其他文件: 搜索并替换所有 pronunciation

## 任务3: 实现广韵字段类型标记和格式化显示
- [ ] types/index.ts: 添加广韵字段类型定义
- [ ] 添加广韵字段类型映射 'lllliiiiiiiiiiiuntiiih#hhhh'
- [ ] dataProcessor.ts: 实现 wrapIPA 和 wrapRomanization 函数
- [ ] Query.tsx: 应用格式化函数到广韵数据显示

## 任务4: 测试并发布
- [ ] 测试 dark theme 切换
- [ ] 测试广韵字段格式化显示
- [ ] 创建最终检查点
