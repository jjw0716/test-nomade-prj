import { cities } from "@/lib/data";
import { CityCard } from "./CityCard";

export function CityCardGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-zinc-500">
          <span className="text-violet-500">▸</span> 추천 도시 목록{" "}
          <span className="text-zinc-700">({cities.length}개)</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </section>
  );
}
