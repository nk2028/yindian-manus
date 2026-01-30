# 音典网页版 - 修复无限刷新bug

## 问题: 版本比较类型不匹配
- [x] cachedVersion是string类型(从localStorage读取)
- [x] version是string类型(API返回),但可能被解析为其他类型
- [x] 使用String()显式转换确保类型一致
- [x] 修复fetchLanguages和queryCharacters中的版本比较
- [x] 避免无限刷新
