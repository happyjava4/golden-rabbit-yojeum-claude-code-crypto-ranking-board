import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { CityGrid } from "@/components/city-grid";
import { cities } from "@/lib/data/cities";

export default function Home() {
  const sortedCities = [...cities].sort((a, b) => b.likes - a.likes);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <section className="border-b border-[rgb(var(--border))] bg-[rgb(var(--panel))] py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[rgb(var(--green))]">
            📍 도시 리스트
          </h2>
        </div>
      </section>
      <CityGrid cities={sortedCities} />
      
      {/* Footer */}
      <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--panel))] py-8">
        <div className="container mx-auto px-4 text-center text-sm text-[rgb(var(--dim))]">
          <p>© 2026 워케이션 코리아 · Made with ❤️ for Digital Nomads</p>
        </div>
      </footer>
    </main>
  );
}

