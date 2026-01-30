// Internationalization translations
// 多语言翻译配置

export type Language = '香港' | '中国' | 'en' | 'ja';

export const LANGUAGE_DISPLAY_NAMES: Record<Language, string> = {
  '香港': '中文（繁體）',
  '中国': '中文（简体）',
  'en': 'English',
  'ja': '日本語',
};

export interface Translations {
  // Navigation
  nav: {
    title: string;
    query: string;
    settings: string;
    about: string;
  };
  
  // Query page
  query: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    buttonLoading: string;
    tableLanguage: string;
    noResults: string;
  };
  
  // Settings page
  settings: {
    title: string;
    interfaceLanguage: string;
    displayMode: string;
    displayModeAtlas2: string;
    displayModeYindian: string;
    displayModeChenfang: string;
    languageSelection: string;
    selectAll: string;
    deselectAll: string;
    selectedCount: string;
  };
  
  // About page
  about: {
    title: string;
    description: string;
    features: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
  };
}

export const translations: Record<Language, Translations> = {
  '香港': {
    nav: {
      title: '音典',
      query: '查字',
      settings: '設定',
      about: '關於',
    },
    query: {
      title: '音典網頁版',
      subtitle: '輸入漢字開始查詢',
      placeholder: '輸入漢字查詢讀音',
      button: '查詢',
      buttonLoading: '查詢中...',
      tableLanguage: '語言',
      noResults: '無查詢結果',
    },
    settings: {
      title: '設定',
      interfaceLanguage: '界面語言',
      displayMode: '顯示方式',
      displayModeAtlas2: '地圖集二',
      displayModeYindian: '音典',
      displayModeChenfang: '陳邡',
      languageSelection: '語言選擇',
      selectAll: '全選',
      deselectAll: '全不選',
      selectedCount: '已選擇 {count} 種語言',
    },
    about: {
      title: '關於音典',
      description: '音典網頁版是一個漢字語音查詢工具，支援約 2400 種語言變體的讀音對比查詢。',
      features: '主要功能',
      feature1: '多字同時查詢並以表格橫向對比',
      feature2: '支援三種顯示方式（地圖集二/音典/陳邡）切換',
      feature3: '靈活的語言篩選系統配合顏色標籤',
      feature4: '採用瑞士 SBB 設計風格，高信息密度的緊湊排版',
    },
  },
  
  '中国': {
    nav: {
      title: '音典',
      query: '查字',
      settings: '设置',
      about: '关于',
    },
    query: {
      title: '音典网页版',
      subtitle: '输入汉字开始查询',
      placeholder: '输入汉字查询读音',
      button: '查询',
      buttonLoading: '查询中...',
      tableLanguage: '语言',
      noResults: '无查询结果',
    },
    settings: {
      title: '设置',
      interfaceLanguage: '界面语言',
      displayMode: '显示方式',
      displayModeAtlas2: '地图集二',
      displayModeYindian: '音典',
      displayModeChenfang: '陈邡',
      languageSelection: '语言选择',
      selectAll: '全选',
      deselectAll: '全不选',
      selectedCount: '已选择 {count} 种语言',
    },
    about: {
      title: '关于音典',
      description: '音典网页版是一个汉字语音查询工具,支持约 2400 种语言变体的读音对比查询。',
      features: '主要功能',
      feature1: '多字同时查询并以表格横向对比',
      feature2: '支持三种显示方式（地图集二/音典/陈邡）切换',
      feature3: '灵活的语言筛选系统配合颜色标签',
      feature4: '采用瑞士 SBB 设计风格,高信息密度的紧凑排版',
    },
  },
  
  'en': {
    nav: {
      title: 'Yindian',
      query: 'Query',
      settings: 'Settings',
      about: 'About',
    },
    query: {
      title: 'Yindian Web',
      subtitle: 'Enter Chinese characters to query pronunciations',
      placeholder: 'Enter Chinese characters',
      button: 'Query',
      buttonLoading: 'Querying...',
      tableLanguage: 'Language',
      noResults: 'No results',
    },
    settings: {
      title: 'Settings',
      interfaceLanguage: 'Interface Language',
      displayMode: 'Display Mode',
      displayModeAtlas2: 'Atlas II',
      displayModeYindian: 'Yindian',
      displayModeChenfang: 'Chen Fang',
      languageSelection: 'Language Selection',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      selectedCount: '{count} languages selected',
    },
    about: {
      title: 'About Yindian',
      description: 'Yindian Web is a Chinese character pronunciation query tool that supports comparison of approximately 2,400 language variants.',
      features: 'Key Features',
      feature1: 'Query multiple characters with horizontal table comparison',
      feature2: 'Support three display modes (Atlas II / Yindian / Chen Fang)',
      feature3: 'Flexible language filtering system with color tags',
      feature4: 'Swiss SBB design style with high information density',
    },
  },
  
  'ja': {
    nav: {
      title: '音典',
      query: '検索',
      settings: '設定',
      about: '概要',
    },
    query: {
      title: '音典ウェブ版',
      subtitle: '漢字を入力して検索を開始',
      placeholder: '漢字を入力して発音を検索',
      button: '検索',
      buttonLoading: '検索中...',
      tableLanguage: '言語',
      noResults: '検索結果なし',
    },
    settings: {
      title: '設定',
      interfaceLanguage: 'インターフェース言語',
      displayMode: '表示方式',
      displayModeAtlas2: '地図集二',
      displayModeYindian: '音典',
      displayModeChenfang: '陳邡',
      languageSelection: '言語選択',
      selectAll: '全選択',
      deselectAll: '全解除',
      selectedCount: '{count} 言語を選択',
    },
    about: {
      title: '音典について',
      description: '音典ウェブ版は、約2400種類の言語変種の発音を比較検索できる漢字音声検索ツールです。',
      features: '主な機能',
      feature1: '複数文字を同時に検索し、表形式で横方向に比較',
      feature2: '3つの表示方式（地図集二/音典/陳邡）の切り替えに対応',
      feature3: 'カラータグ付きの柔軟な言語フィルタリングシステム',
      feature4: 'スイスSBBデザインスタイル、高密度レイアウト',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}

export function formatString(template: string, values: Record<string, any>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match;
  });
}
