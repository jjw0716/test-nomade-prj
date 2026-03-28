import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CitySection } from "@/components/home/CitySection";
import { SidebarMeetup } from "@/components/home/SidebarMeetup";
import { SidebarMembers } from "@/components/home/SidebarMembers";
import { SidebarNomads } from "@/components/home/SidebarNomads";
import { getCities } from "@/lib/data";

export default async function HomePage() {
  const cities = await getCities();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <CitySection cities={cities} />
            </div>
            <aside className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0">
              <SidebarMeetup />
              <SidebarMembers />
              <SidebarNomads />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
