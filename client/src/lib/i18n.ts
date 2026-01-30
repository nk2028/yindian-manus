// Internationalization translations
// 多语言翻译配置

export type Language = 'zh_HK' | 'zh_CN' | 'en_GB' | 'ja';

export const LANGUAGE_DISPLAY_NAMES: Record<Language, string> = {
  'zh_HK': '中文（繁體）',
  'zh_CN': '中文（简体）',
  'en_GB': 'English',
  'ja': '日本語',
};

export interface Translations {
  // Page title
  pageTitle: string;
  
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
    theme: string;
    themeLight: string;
    themeDark: string;
    displayMode: string;
    displayModeAtlas2: string;
    displayModeYindian: string;
    displayModeChenfang: string;
    guangyunDisplay: string;
    guangyunDisplayDesc: string;
    languageSelection: string;
    selectAll: string;
    deselectAll: string;
    selectedCount: string;
  };
  
  // About page
  about: {
    title: string;
    intro: string;
    history: string;
    features: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
  };
}

export const translations: Record<Language, Translations> = {
  'zh_HK': {
    pageTitle: '音典網頁版 - 漢字語音查詢工具',
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
      theme: '主題',
      themeLight: '淺色',
      themeDark: '深色',
      displayMode: '顯示方式',
      displayModeAtlas2: '地圖集二',
      displayModeYindian: '音典',
      displayModeChenfang: '陳邡',
      guangyunDisplay: '廣韻顯示方式',
      guangyunDisplayDesc: '選擇廣韻數據要顯示的字段（可多選）',
      languageSelection: '語言選擇',
      selectAll: '全選',
      deselectAll: '全不選',
      selectedCount: '已選擇 {count} 種語言',
    },
    about: {
      title: '關於音典',
      intro: '漢字音典（Yindian）是全面收集各種漢語方言中漢字讀音的資料庫。它源自 Maigo 製作的 MCPDict，是最早的漢語方言讀音查詢工具之一。',
      history: '此後，由眾多專家聯手，不斷收集整理大量漢語方言讀音資料，製作了漢字音典 APP。nk2028 基於漢字音典 APP 發佈了音典網頁版，讓更多使用者能夠方便地查詢漢字在不同時代、不同地區的讀音。目前音典網頁版收錄了約 2400 種語言變體，涵蓋上古音、中古音、近代音及現代各地方言。',
      features: '主要功能',
      feature1: '支援多字同時查詢，以表格形式橫向對比不同語言變體的讀音',
      feature2: '提供三種顯示模式（地圖集二/音典/陳邡），滿足不同用戶的查詢習慣',
      feature3: '靈活的語言篩選系統，配合顏色標籤和分類結構，方便快速定位所需語言',
      feature4: '對廣韻等歷史音韻資料提供詳細的字段選擇，支援多種擬音系統對比',
    },
  },
  
  'zh_CN': {
    pageTitle: '音典网页版 - 汉字语音查询工具',
    nav: {
      title: '音典',
      query: '查字',
      settings: '设定',
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
      theme: '主题',
      themeLight: '浅色',
      themeDark: '深色',
      displayMode: '显示方式',
      displayModeAtlas2: '地图集二',
      displayModeYindian: '音典',
      displayModeChenfang: '陈邡',
      guangyunDisplay: '广韵显示方式',
      guangyunDisplayDesc: '选择广韵数据要显示的字段（可多选）',
      languageSelection: '语言选择',
      selectAll: '全选',
      deselectAll: '全不选',
      selectedCount: '已选择 {count} 种语言',
    },
    about: {
      title: '关于音典',
      intro: '汉字音典（Yindian）是全面收集各种汉语方言中汉字读音的资料库。它源自 Maigo 制作的 MCPDict，是最早的汉语方言读音查询工具之一。',
      history: '此后，由众多专家联手，不断收集整理大量汉语方言读音资料，制作了汉字音典 APP。nk2028 基于汉字音典 APP 发布了音典网页版，让更多使用者能够方便地查询汉字在不同时代、不同地区的读音。目前音典网页版收录了约 2400 种语言变体，涵盖上古音、中古音、近代音及现代各地方言。',
      features: '主要功能',
      feature1: '支持多字同时查询，以表格形式横向对比不同语言变体的读音',
      feature2: '提供三种显示模式（地图集二/音典/陈邡），满足不同用户的查询习惯',
      feature3: '灵活的语言筛选系统，配合颜色标签和分类结构，方便快速定位所需语言',
      feature4: '对广韵等历史音韵资料提供详细的字段选择，支持多种拟音系统对比',
    },
  },
  
  'en_GB': {
    pageTitle: 'Yindian Web - Chinese Character Pronunciation Query Tool',
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
      theme: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      displayMode: 'Display Mode',
      displayModeAtlas2: 'Atlas II',
      displayModeYindian: 'Yindian',
      displayModeChenfang: 'Chen Fang',
      guangyunDisplay: 'Guangyun Display',
      guangyunDisplayDesc: 'Select fields to display for Guangyun data (multiple selection)',
      languageSelection: 'Language Selection',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      selectedCount: '{count} languages selected',
    },
    about: {
      title: 'About Yindian',
      intro: 'Yindian (Chinese Character Phonetic Dictionary) is a comprehensive database collecting Chinese character pronunciations across various Chinese dialects. It originated from MCPDict created by Maigo, one of the earliest Chinese dialect pronunciation query tools.',
      history: 'Subsequently, numerous experts collaborated to continuously collect and organize extensive Chinese dialect pronunciation data, creating the Yindian mobile app. nk2028 released the Yindian web version based on the Yindian app, enabling more users to conveniently query Chinese character pronunciations across different historical periods and regions. Currently, the Yindian web version includes approximately 2,400 language variants, covering Old Chinese, Middle Chinese, Early Mandarin, and modern regional dialects.',
      features: 'Key Features',
      feature1: 'Support querying multiple characters simultaneously, comparing pronunciations across different language variants in table format',
      feature2: 'Provide three display modes (Atlas II/Yindian/Chenfang) to accommodate different user query preferences',
      feature3: 'Flexible language filtering system with color tags and hierarchical structure for quick language location',
      feature4: 'Detailed field selection for historical phonological data such as Guangyun, supporting comparison across multiple reconstruction systems',
    },
  },
  
  'ja': {
    pageTitle: '音典ウェブ版 - 漢字音声検索ツール',
    nav: {
      title: 'Yindian',
      query: 'Query',
      settings: 'Settings',
      about: 'About',
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
      theme: 'テーマ',
      themeLight: 'ライト',
      themeDark: 'ダーク',
      displayMode: '表示方式',
      displayModeAtlas2: '地図集二',
      displayModeYindian: '音典',
      displayModeChenfang: '陳邡',
      guangyunDisplay: '廣韻表示方式',
      guangyunDisplayDesc: '廣韻データに表示するフィールドを選択（複数選択可）',
      languageSelection: '言語選択',
      selectAll: '全選択',
      deselectAll: '全解除',
      selectedCount: '{count} 言語を選択',
    },
    about: {
      title: '音典について',
      intro: '漢字音典（Yindian）は、様々な中国語方言における漢字の読みを包括的に収集したデータベースです。Maigoが制作したMCPDictを起源とし、最も早い中国語方言発音検索ツールの一つです。',
      history: 'その後、多くの専門家が協力し、大量の中国語方言発音データを継続的に収集・整理し、漢字音典アプリを制作しました。nk2028は漢字音典アプリを基に音典ウェブ版を公開し、より多くのユーザーが異なる時代や地域の漢字発音を便利に検索できるようにしました。現在、音典ウェブ版は約2400種類の言語変種を収録し、上古音、中古音、近代音、現代の各地方言をカバーしています。',
      features: '主な機能',
      feature1: '複数文字の同時検索に対応し、表形式で異なる言語変種の発音を横方向に比較',
      feature2: '三つの表示モード（地図集二/音典/陳邡）を提供し、異なるユーザーの検索習慣に対応',
      feature3: '柔軟な言語フィルタリングシステム、カラータグと階層構造で必要な言語を素早く特定',
      feature4: '廣韻などの歴史音韻データに詳細なフィールド選択を提供し、複数の擬音システムの比較に対応',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations['zh_HK']; // Fallback to zh_HK if language not found
}

export function formatString(template: string, values: Record<string, any>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match;
  });
}
