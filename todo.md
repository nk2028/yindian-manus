# 音典网页版 - 所有任务已完成

## 任务1: 修复 dark theme 背景色问题
- [x] Settings.tsx: 移除 `bg-gray-50` 硬编码,改为 `bg-background`
- [x] Query.tsx: 检查并移除硬编码背景色
- [x] About.tsx: 检查并移除硬编码背景色
- [x] 测试 dark theme 切换功能

## 任务2: 重构 pronunciation 为字音
- [x] types/index.ts: 重命名 Pronunciation 相关类型为 字音數據
- [x] dataProcessor.ts: 重构所有 pronunciation 变量名为 字音
- [x] Query.tsx: 重构所有 pronunciation 变量名为 字音
- [x] TableRow: 重命名 pronunciations 字段为 字音列表

## 任务3: 实现广韵字段类型标记和格式化显示
- [x] 添加广韵字段类型标记: 'lllliiiiiiiiiiiiiih#hhhh'
- [x] dataProcessor.ts: 实现 wrapIPA 函数
- [x] dataProcessor.ts: 实现 wrapRomanization 函数
- [x] 在 parse廣韻字音 中应用格式化(根据字段类型包装 HTML)
- [x] Query.tsx: 使用 dangerouslySetInnerHTML 渲染广韵 HTML 标签
- [x] 修复 React 错误: 不能同时使用 children 和 dangerouslySetInnerHTML

## 任务4: 测试并发布
- [x] 测试 dark theme 切换
- [x] 测试字音变量重构
- [x] 测试广韵字段格式化显示(「率」字显示两个读音)
- [x] 创建最终检查点
