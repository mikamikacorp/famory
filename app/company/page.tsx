import Logo from "../components/Logo";

export const metadata = {
  title: "運営会社 | famory",
};

export default function Company() {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
        <Logo />
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">運営会社</h1>

        <div className="bg-white border border-amber-100 rounded-2xl shadow-sm overflow-hidden">
          {[
            { label: "会社名", value: "株式会社famory" },
            { label: "設立", value: "2026年" },
            { label: "事業内容", value: "家族向け写真・動画サービスの開発・運営" },
            { label: "所在地", value: "東京都渋谷区" },
            { label: "お問い合わせ", value: "support@famory.app" },
          ].map(({ label, value }) => (
            <div key={label} className="flex border-b border-amber-50 last:border-0 px-6 py-4">
              <dt className="w-32 shrink-0 text-sm text-stone-400">{label}</dt>
              <dd className="text-stone-700">{value}</dd>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
