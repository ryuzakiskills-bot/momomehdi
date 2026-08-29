import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedPropertiesSection } from "@/components/sections/FeaturedPropertiesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { WhatsAppCTA } from "@/components/sections/WhatsAppCTA";
import { getFeaturedProperties } from "@/lib/properties";
import { getPublicSettings } from "@/lib/settings";

export default async function Home() {
  const [featuredProperties, settings] = await Promise.all([
    getFeaturedProperties(),
    getPublicSettings(),
  ]);

  const promoActive = settings.promo_banner_active === "true";

  return (
    <main className="relative">
      <Navbar />
      {/* Promo Banner */}
      {promoActive && settings.promo_banner_text && (
        <div className="bg-yellow-500 text-black text-center text-sm font-semibold py-2 px-4">
          {settings.promo_banner_text}
        </div>
      )}
      <HeroSection
        title={settings.hero_title}
        subtitle={settings.hero_subtitle}
        bgImage={settings.hero_image_url}
      />
      <AboutSection />
      <FeaturedPropertiesSection properties={featuredProperties} />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <LeadFormSection />
      <WhatsAppCTA whatsapp={settings.whatsapp_number} />
      <Footer settings={settings} />
    </main>
  );
}

