import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CityDetail } from "@/components/city/CityDetail";
import { getCityById } from "@/lib/data";

interface CityPageProps {
  params: Promise<{ id: string }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { id } = await params;
  const city = getCityById(Number(id));

  if (!city) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <CityDetail city={city} />
      </main>
      <Footer />
    </div>
  );
}
