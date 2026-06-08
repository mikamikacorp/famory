"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Logo from "../components/Logo";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

type UploadState = "idle" | "uploading" | "done" | "error";

export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const { signOut } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setUploadState("idle");
    setUploadMessage("");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploadState("uploading");
    setUploadMessage("");

    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      if (!token) throw new Error("認証トークンを取得できませんでした");

      const apiBase = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
      if (!apiBase) throw new Error("API Gateway URLが設定されていません");

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        // 1. Presigned URL取得
        const res = await fetch(`${apiBase}/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        });

        if (!res.ok) {
          throw new Error(`Presigned URL取得失敗 (${res.status})`);
        }

        const { uploadUrl } = await res.json();

        // 2. S3へ直接PUT
        const putRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!putRes.ok) {
          throw new Error(`S3アップロード失敗 (${putRes.status})`);
        }
      }

      setUploadState("done");
      setUploadMessage(`${selectedFiles.length}枚のアップロードが完了しました`);
      setSelectedFiles(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setUploadState("error");
      setUploadMessage(err instanceof Error ? err.message : "アップロードに失敗しました");
    }
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
                disabled={uploadState === "uploading"}
                className="flex-1 py-3 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50 text-stone-600 text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {selectedFiles && selectedFiles.length > 0
                  ? `${selectedFiles.length}枚選択中`
                  : "写真を選択"}
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFiles || selectedFiles.length === 0 || uploadState === "uploading"}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {uploadState === "uploading" ? "アップロード中..." : "アップロードを実行"}
              </button>
            </div>

            {uploadMessage && (
              <p className={`mt-3 text-sm text-center ${uploadState === "error" ? "text-red-500" : "text-green-600"}`}>
                {uploadMessage}
              </p>
            )}
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
