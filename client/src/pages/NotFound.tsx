import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold mb-4">404</div>
        <div className="text-xl mb-6">页面未找到</div>
        <Link href="/">
          <a className="inline-block bg-[#EB0000] text-white px-6 py-3 border-2 border-black font-bold hover:bg-[#C00000]">
            返回首页
          </a>
        </Link>
      </div>
    </div>
  );
}
