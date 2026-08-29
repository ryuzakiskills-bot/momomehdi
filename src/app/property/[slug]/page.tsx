import { getPropertyBySlug } from "@/lib/properties";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyInfo } from "@/components/property/PropertyInfo";
import { PropertyFeatures } from "@/components/property/PropertyFeatures";
import { AgentContact } from "@/components/property/AgentContact";
import { LeadForm } from "@/components/property/LeadForm";
import { PropertyMapClient as PropertyMap } from "@/components/property/PropertyMapClient";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { BackButton } from "@/components/ui/back-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);
  if (!property) return { title: 'Propriété introuvable' };

  return {
    title: `${property.title} | Mehdi Moumou Immobilier`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-24">
      {/* Container for main content */}
      <div className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        
        {/* Navigation / Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <BackButton 
            fallbackUrl="/#properties" 
            className="self-start md:self-auto -ml-4 md:ml-0 sticky top-24 z-40 bg-[#050505]/80 backdrop-blur-md md:static md:bg-transparent"
          />
          <Breadcrumbs 
            items={[
              { label: "Propriétés", href: "/#properties" },
              { label: property.type },
              { label: property.title }
            ]} 
          />
        </div>

        {/* Gallery Section */}
        <div className="mb-12">
          <PropertyGallery images={property.images || []} />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left, 2/3 width) */}
          <div className="lg:col-span-2">
            <PropertyInfo property={property} />
            
            <div className="mb-12">
              <h3 className="font-serif text-2xl font-bold text-white mb-6">Description</h3>
              <div className="text-white/70 font-light leading-relaxed space-y-4">
                {/* We split by newlines just in case description has them */}
                {property.description.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <PropertyFeatures property={property} />
            
            <PropertyMap address={property.address || property.city} />
          </div>

          {/* Sidebar (Right, 1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <AgentContact />
              <LeadForm propertyId={property.id} />
            </div>
          </div>

        </div>
      </div>

      {/* Similar Properties Section */}
      <SimilarProperties propertyId={property.id} city={property.city} type={property.type} />
    </main>
  );
}
