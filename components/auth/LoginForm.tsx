export default function LoginForm() {
  return (
    <div className="flex w-full items-center justify-center bg-[#F8F7F3] px-6 py-10 lg:w-[55%] xl:w-1/2">
      <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-xl md:p-12">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/logo/logo.png"
            alt="French Around the World"
            className="h-14 w-auto"
          />
        </div>

        {/* Titre */}
        <h2 className="text-center text-4xl font-bold text-slate-900">
          Bon retour 👋
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Connecte-toi pour continuer ton aventure.
        </p>

        {/* Formulaire */}
        <form className="mt-10 space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Adresse e-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="nom@exemple.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Mot de passe
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Se souvenir de moi
            </label>

            <button
              type="button"
              className="font-medium text-blue-600 transition hover:text-blue-700"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
          >
            Continuer →
          </button>
        </form>

        {/* Séparateur */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-sm text-slate-400">
            ou continuer avec
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-medium text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-slate-50 hover:shadow-md"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.3c-2.1 1.6-4.7 2.6-7.3 2.6-5.3 0-9.8-3.3-11.4-8l-6.6 5.1C9.3 39.6 16.1 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l.1-.1 6.3 5.3C37.1 38.4 44 33 44 24c0-1.3-.1-2.3-.4-3.5z"/>
          </svg>

          Continuer avec Google
        </button>

        {/* Bas */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Pas encore de compte ?{" "}
          <a
            href="/signup"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}