"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./components/Logo";

const PHOTOS = [
  { id: 1, src: "https://loremflickr.com/400/500/family?lock=1" },
  { id: 2, src: "https://loremflickr.com/400/300/children?lock=2" },
  { id: 3, src: "https://loremflickr.com/400/400/baby?lock=3" },
  { id: 4, src: "https://loremflickr.com/400/600/family?lock=4" },
  { id: 5, src: "https://loremflickr.com/400/350/parents,child?lock=5" },
  { id: 6, src: "https://loremflickr.com/400/450/birthday,family?lock=6" },
  { id: 7, src: "https://loremflickr.com/400/300/children,smile?lock=7" },
  { id: 8, src: "https://loremflickr.com/400/500/family,outdoor?lock=8" },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
        <Logo />
      </header>

      {/* Hero */}
      <section className="text-center px-6 pt-16 pb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 leading-tight">
          家族の写真を、
          <br />
          <span className="text-amber-500">美しい思い出</span>に。
        </h1>
        <p className="mt-4 text-stone-500 text-lg max-w-md mx-auto">
          写真をアップロードするだけで、スライドショーを自動で作成します。
        </p>
      </section>

      {/* CTA */}
      <section className="text-center px-6 pb-12">
        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-md transition-colors"
          >
            <span>📷</span>
            家族の写真をアップロード
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-stone-500">始めるにはログインしてください</p>
            <Link
              href="/login"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-md transition-colors"
            >
              ログイン / アカウント作成
            </Link>
          </div>
        )}
      </section>

      {/* Photo Grid */}
      <section className="px-3 sm:px-6 max-w-6xl mx-auto pb-12">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2">
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="mb-2 overflow-hidden rounded-xl break-inside-avoid shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt=""
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
