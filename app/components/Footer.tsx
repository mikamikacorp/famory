import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-white/60 px-6 py-6 text-center text-sm text-stone-400">
      <div className="flex items-center justify-center gap-6 mb-2">
        <Link href="/privacy" className="hover:text-amber-500 transition-colors">
          プライバシーポリシー
        </Link>
        <Link href="/company" className="hover:text-amber-500 transition-colors">
          運営会社
        </Link>
      </div>
      <p>© 2026 famory</p>
    </footer>
  );
}
