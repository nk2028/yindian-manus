# 音典网页版 - 清理和修复

## 任务1: 删除migration相关代码
- [x] 搜索所有migration相关代码
- [x] 删除DISPLAY_MODE_MIGRATION
- [x] 删除LANGUAGE_MIGRATION
- [x] 删除migrateDisplayMode和migrateLanguage函数
- [x] 简化localStorage读取逻辑

## 任务2: 修改nav标题
- [x] 将“音典網頁版”改回“音典”(所有语言)
- [x] 为英文标题添加letter-spacing([:lang(en)_&]:tracking-wide)

## 任务3: 修复表格sticky z-index
- [x] 修复第一列sticky时的z-index从z-10改为z-20
- [x] 确保第二列滚动时正确隐藏在第一列后面
