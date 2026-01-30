# 音典网页版 - UI修复任务

## 任务1: 删除廣韻提示文字
- [x] 删除Settings.tsx中“選擇廣韻數據要顯示的字段(可多選)”

## 任务2: 添加清除缓存按钮
- [x] 在Settings.tsx末端添加“清除緩存”按钮
- [x] 点击清除所有localStorage状态
- [x] 清除后刷新页面
- [x] 添加所有语言的i18n翻译

## 任务3: 修复页面滚动条问题
- [x] 移除Query.tsx的min-h-screen
- [x] 避免不必要的垂直滚动条

## 任务4: 表格第一行sticky
- [x] 让查字结果表格的表头行sticky
- [x] 添加sticky top-0 z-20到thead

## 任务5: 减小表格单元格高度
- [x] 减小padding从py-2改为py-1
- [x] 表头和表体单元格都更紧凑

## 任务6: 表格居中
- [x] 当表格不宽时居中显示
- [x] 添加flex justify-center到表格容器
