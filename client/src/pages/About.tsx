// Swiss International Style - About Page
// Design: Clean information display

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">关于</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-black p-4">
            <h2 className="text-xl font-bold mb-3">音典网页版</h2>
            
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                音典网页版是一个汉字语音查询工具,支持约 2400 种语言变体的读音对比查询。
              </p>

              <div>
                <h3 className="font-bold mb-1">功能特性</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>多字同时查询,横向对比不同语言的读音</li>
                  <li>支持三种显示方式:地图集二、音典、陳邡</li>
                  <li>灵活的语言筛选,可自定义显示的语言</li>
                  <li>采用瑞士 SBB 设计风格,简洁高效</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-1">使用方法</h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>在查字页面输入要查询的汉字(可输入多个字)</li>
                  <li>点击"查询"按钮或按回车键</li>
                  <li>查看表格中各语言的读音对比</li>
                  <li>在设置页面可调整显示方式和选择要显示的语言</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold mb-1">设计说明</h3>
                <p>
                  本网站采用瑞士国际主义设计风格,以功能性和清晰性为核心。
                  使用 SBB 深红色作为强调色,搭配黑白灰色系,营造专业严谨的视觉效果。
                  紧凑的排版和尖角设计确保在有限空间内展示大量语言数据。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
