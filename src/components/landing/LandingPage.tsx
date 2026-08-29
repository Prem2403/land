import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Problem } from '@/components/landing/Problem';
import { Solution } from '@/components/landing/Solution';
import { Features } from '@/components/landing/Features';
import { Lifecycle } from '@/components/landing/Lifecycle';
import { PredictionDemo } from '@/components/landing/PredictionDemo';
import { ExplainableAI } from '@/components/landing/ExplainableAI';
import { GISMapSection } from '@/components/landing/GISMapSection';
import { Recommendations } from '@/components/landing/Recommendations';
import { Impact } from '@/components/landing/Impact';
import { PublicPortal } from '@/components/landing/PublicPortal';
import { Footer } from '@/components/landing/Footer';
import { AmbientScene } from '@/components/visuals/AmbientScene';

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <AmbientScene />
      <div className="relative z-10">
        <Navbar onLogin={onLogin} />
      <main>
        <Hero onExplore={onLogin} />
        <Problem />
        <Solution />
        <Features />
        <Lifecycle />
        <PredictionDemo />
        <ExplainableAI />
        <GISMapSection />
        <Recommendations />
        <Impact />
        <PublicPortal />
      </main>
        <Footer />
      </div>
    </div>
  );
}
