# 音典网页版 - 重构任务

## 任务1: 重构类型定义
- [x] types/index.ts: GuangyunField → 廣韻字段
- [x] types/index.ts: GUANGYUN_FIELDS → 廣韻字段列表
- [x] types/index.ts: Language 类型改为标准代码
- [x] types/index.ts: Settings.guangyunFields → Settings.廣韻字段

## 任务2: 更新所有文件中的变量名
- [x] dataProcessor.ts: parseGuangyunPronunciation → parse廣韻Pronunciation
- [x] dataProcessor.ts: 导入和使用 廣韻字段 类型
- [x] AppContext.tsx: guangyunFields → 廣韻字段
- [x] AppContext.tsx: toggleGuangyunField → toggle廣韻字段
- [x] AppContext.tsx: 更新 Language 相关逻辑
- [x] Settings.tsx: 更新广韵字段选择相关变量
- [x] Settings.tsx: 更新 Language 选择器
- [x] Query.tsx: 更新 parseGuangyunPronunciation 调用
- [x] Query.tsx: 移除调试代码
- [x] i18n.ts: 更新语言代码和翻译键

## 任务3: 优化广韵设置UI
- [x] Settings.tsx: 将广韵字段选择改为紧凑样式
- [x] Settings.tsx: 参考语言选择的样式设计

## 任务4: 修复广韵多音字显示
- [x] 修改 parse廣韻Pronunciation 处理多个读音(用 '; ' 分隔)
- [x] 添加递归处理逻辑

## 测试验证
- [x] 测试「率」字广韵多音字显示(显示两个读音)
- [x] 测试语言切换功能
- [x] 测试广韵字段选择功能
- [x] 测试设置持久化
- [x] 测试语言代码迁移(从旧代码自动升级)

## 所有任务已完成 ✅
