import type { City } from "@/lib/data";
import { CityCard } from "./CityCard";

interface CityCardGridProps {
  cities: City[];
}

export function CityCardGrid({ cities }: CityCardGridProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-zinc-500">
          <span className="text-violet-500">▸</span> 도시 리스트{" "}
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
