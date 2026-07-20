
export default function HomePage() {
  return (
    <div className=" bg-gray-50 flex flex-col pt-16">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-r from-[#80c5f3] to-[#30629f] text-white">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur MyCV</h1>
        <p className="text-lg mb-6">
          Créez facilement votre CV, explorez les offres et suivez vos entretiens.
        </p>
        <button
          onClick={() => (window.location.href = "/profile")}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Commencer
        </button>
      </section>

      {/* Features Section */}
      <section className="py-6 px-6 m-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <a href="/cvs">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">📝 Créer votre CV</h2>
          <p className="text-gray-600">Un éditeur simple pour construire votre CV.</p>
        </div>
        </a>
        <a href="/offer">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">💼 Postuler aux offres</h2>
          <p className="text-gray-600">Accédez aux offres et postulez en un clic.</p>
        </div>
        </a>
        <a href="/interview">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">📅 Suivre vos entretiens</h2>
          <p className="text-gray-600">Gardez vos rendez-vous organisés.</p>
        </div>
        </a>
      </section>

    </div>
  );
}
