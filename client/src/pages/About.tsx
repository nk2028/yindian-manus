// Swiss SBB Modern Style - About Page
// Design: Clean information display with red accents

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-[#EB0000] pb-3 border-b-2 border-[#EB0000]">
          关于
        </h1>

        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">音典网页版</h2>
          
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p className="text-lg">
              音典网页版是一个汉字语音查询工具,支持约 <span className="font-bold text-[#EB0000]">2400</span> 种语言变体的读音对比查询。
            </p>

            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">功能特性</h3>
              <ul className="list-disc list-inside space-y-1.5 ml-4">
                <li>多字同时查询,横向对比不同语言的读音</li>
                <li>支持三种显示方式:地图集二、音典、陳邡</li>
                <li>灵活的语言筛选,可自定义显示的语言</li>
                <li>采用瑞士 SBB 设计风格,简洁高效</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">使用方法</h3>
              <ol className="list-decimal list-inside space-y-1.5 ml-4">
                <li>在查字页面输入要查询的汉字(可输入多个字)</li>
                <li>点击"查询"按钮或按回车键</li>
                <li>查看表格中各语言的读音对比</li>
                <li>在设置页面可调整显示方式和选择要显示的语言</li>
              </ol>
            </div>

            <div className="pt-2">
              <h3 className="font-bold text-lg mb-2 text-gray-800">设计说明</h3>
              <p>
                本网站采用现代瑞士 SBB 设计风格,以功能性和清晰性为核心。
                使用 <span className="font-bold text-[#EB0000]">SBB 深红色 (#EB0000)</span> 作为主色调,
                搭配简洁的灰白色系,营造高效专业的视觉效果。
                紧凑的排版和尖角设计确保在有限空间内展示大量语言数据。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
