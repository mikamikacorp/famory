import Logo from "../components/Logo";

export const metadata = {
  title: "プライバシーポリシー | famory",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
        <Logo />
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">プライバシーポリシー</h1>

        <div className="flex flex-col gap-8 text-stone-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-2">1. 個人情報の収集について</h2>
            <p>当サービスでは、アカウント登録時にメールアドレス等の個人情報を収集します。収集した情報はサービスの提供・改善のみに利用します。</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-2">2. 写真データの取り扱い</h2>
            <p>アップロードされた写真はスライドショーの作成のみに使用し、第三者への提供は行いません。ユーザーはいつでもデータの削除を要求できます。</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-2">3. Cookieの使用</h2>
            <p>当サービスはログイン状態の維持のためにCookieを使用します。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-2">4. 個人情報の第三者提供</h2>
            <p>法令に基づく場合を除き、収集した個人情報を第三者に提供することはありません。</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800 mb-2">5. お問い合わせ</h2>
            <p>プライバシーに関するお問い合わせは、運営会社までご連絡ください。</p>
          </section>

          <p className="text-sm text-stone-400">最終更新日：2026年6月4日</p>
        </div>
      </main>
    </div>
  );
}
