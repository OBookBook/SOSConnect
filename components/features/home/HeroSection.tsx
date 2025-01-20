import { ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <div className="flex justify-center items-center mb-8">
        <ShieldCheck className="h-16 w-16 text-sky-500" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        あなたの勇気が誰かを救う
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        目撃した暴力や虐待の通報に躊躇していませんか？
        <br />
        あなたの安全を守りながら、その人を助けることができます。
      </p>
    </>
  );
}
