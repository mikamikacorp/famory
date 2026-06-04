"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Logo from "../components/Logo";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { signOut } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100 px-8 py-4 flex items-center justify-between">
        <Logo />
        <button
          onClick={handleSignOut}
          className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          ログアウト
        </button>
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-6 pt-16 pb-24">
        {/* Cards */}
        <div className="flex flex-col gap-4">
          {/* Upload Card */}
          <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-lg">📷</span>
              </div>
              <div>
                <p className="font-semibold text-stone-800">写真をアップロード</p>
                <p className="text-stone-400 text-sm">家族の写真を選んでアップロードしましょう</p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-3 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50 text-stone-600 text-sm font-medium transition-all"
              >
                {selectedFiles && selectedFiles.length > 0
                  ? `${selectedFiles.length}枚選択中`
                  : "写真を選択"}
              </button>
              <button
                disabled={!selectedFiles || selectedFiles.length === 0}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                アップロードを実行
              </button>
            </div>
          </div>

          {/* Download Card */}
          <Link
            href="/download"
            className="group bg-white border border-amber-100 hover:border-amber-300 rounded-2xl p-6 flex items-center justify-between shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-lg">🎬</span>
              </div>
              <div>
                <p className="font-semibold text-stone-800">スライドショーをダウンロード</p>
                <p className="text-stone-400 text-sm">作成済みのスライドショーを保存</p>
              </div>
            </div>
            <span className="text-stone-300 group-hover:text-amber-500 transition-colors text-xl">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
