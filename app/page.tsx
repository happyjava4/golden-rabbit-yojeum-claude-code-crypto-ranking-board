import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { CityGrid } from "@/components/city-grid";
import { ReviewCTA } from "@/components/review-cta";
import { cities } from "@/lib/data/cities";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <CityGrid cities={cities} />
      <ReviewCTA />
      
      {/* Footer */}
      <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--panel))] py-8">
        <div className="container mx-auto px-4 text-center text-sm text-[rgb(var(--dim))]">
          <p>© 2026 워케이션 코리아 · Made with ❤️ for Digital Nomads</p>
        </div>
      </footer>
    </main>
  );
}

