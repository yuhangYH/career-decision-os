import { HomeContent } from "@/components/public/home-content";
import { PublicHeader } from "@/components/public/public-header";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main id="main-content">
        <HomeContent />
      </main>
    </>
  );
}
