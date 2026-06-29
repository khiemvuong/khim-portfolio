import HomeMeshBackground from "@/components/home/HomeMeshBackground";
import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Dynamic WebGL Mesh Gradient Background */}
      <HomeMeshBackground />
      
      {/* Primary Hero Section and Glassmorphic Content */}
      <HomeContent />
    </main>
  );
}
