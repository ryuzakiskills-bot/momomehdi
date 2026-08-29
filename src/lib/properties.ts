import { cache } from 'react';
import { supabase } from './supabase';

export type Property = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  type: string;
  status: string;
  city: string;
  address: string;
  surface: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  security: boolean;
  elevator: boolean;
  swimming_pool: boolean;
  garden: boolean;
  featured: boolean;
  created_at: string;
};

export type PropertyImage = {
  id: string;
  property_id: string;
  image_url: string;
  is_featured: boolean;
};

// Mock data for development when Supabase is not configured
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    slug: 'villa-oasis-moderne',
    title: 'Villa Oasis Moderne',
    description: 'Une villa spectaculaire située dans le quartier le plus prestigieux de Casablanca. Elle offre un design contemporain épuré, des finitions de luxe irréprochables, et une vue imprenable sur la ville. Équipée d\'une piscine à débordement, d\'un jardin paysager et d\'un système de sécurité de pointe, cette villa est le symbole absolu du raffinement et de l\'exclusivité.',
    price: 15000000,
    type: 'Villa',
    status: 'Available',
    city: 'Casablanca',
    address: 'Anfa Supérieur, Casablanca',
    surface: '850 m²',
    bedrooms: 5,
    bathrooms: 6,
    parking: 3,
    security: true,
    elevator: false,
    swimming_pool: true,
    garden: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'penthouse-panoramique',
    title: 'Penthouse Panoramique',
    description: 'Penthouse exclusif avec vue panoramique à 360° sur l\'océan Atlantique et la skyline de Casablanca. Matériaux nobles, finitions haut de gamme, et service de conciergerie 24h/24. Un bien d\'exception pour un style de vie exceptionnel, situé au cœur de la Marina.',
    price: 8500000,
    type: 'Appartement',
    status: 'Available',
    city: 'Casablanca',
    address: 'Marina, Casablanca',
    surface: '320 m²',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    security: true,
    elevator: true,
    swimming_pool: false,
    garden: false,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'bureau-corporate-premium',
    title: 'Bureau Corporate Premium',
    description: 'Espace de bureaux d\'exception au cœur du Casablanca Finance City, le centre névralgique des affaires en Afrique. Cet espace offre des prestations cinq étoiles : infrastructure technologique de pointe, salles de conférence modulables, et accès sécurisé 24h/24. Idéal pour les entreprises internationales cherchant à s\'établir au Maroc.',
    price: 12000000,
    type: 'Bureau',
    status: 'Available',
    city: 'Casablanca',
    address: 'CFC, Casablanca',
    surface: '500 m²',
    bedrooms: 0,
    bathrooms: 2,
    parking: 10,
    security: true,
    elevator: true,
    swimming_pool: false,
    garden: false,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'terrain-pour-dveloppement',
    title: 'Terrain pour développement',
    description: 'Terrain exceptionnel de 5000 m² idéalement situé à Bouskoura, une des zones résidentielles les plus prisées de la périphérie casablancaise. Tous les permis de construire sont disponibles, et le terrain est viabilisé. Une opportunité d\'investissement rare pour un projet résidentiel ou hôtelier de grand standing.',
    price: 25000000,
    type: 'Terrain',
    status: 'Available',
    city: 'Casablanca',
    address: 'Bouskoura, Casablanca',
    surface: '5000 m²',
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    security: false,
    elevator: false,
    swimming_pool: false,
    garden: false,
    featured: true,
    created_at: new Date().toISOString(),
  },
];

const MOCK_IMAGES: PropertyImage[] = [
  { id: '1', property_id: '1', image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop', is_featured: true },
  { id: '2', property_id: '1', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', is_featured: false },
  { id: '3', property_id: '1', image_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop', is_featured: false },
  { id: '4', property_id: '2', image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', is_featured: true },
  { id: '5', property_id: '2', image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop', is_featured: false },
  { id: '6', property_id: '3', image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', is_featured: true },
  { id: '7', property_id: '3', image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop', is_featured: false },
  { id: '8', property_id: '4', image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop', is_featured: true }
];

export const getPropertyBySlug = cache(async (slug: string) => {
  if (supabase) {
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching property:', error);
      return null;
    }
    
    const { data: images } = await supabase
      .from('property_images')
      .select('*')
      .eq('property_id', property.id);

    return { ...property, images: images || [] };
  }

  // Fallback to mock
  const property = MOCK_PROPERTIES.find(p => p.slug === slug);
  if (!property) return null;
  const images = MOCK_IMAGES.filter(i => i.property_id === property.id);
  return { ...property, images };
});

export async function getSimilarProperties(propertyId: string, city: string, type: string) {
  if (supabase) {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*, property_images(image_url)')
      .eq('city', city)
      .eq('type', type)
      .neq('id', propertyId)
      .limit(3);

    if (error) {
      console.error('Error fetching similar properties:', error);
      return [];
    }
    return properties;
  }

  // Fallback to mock
  return MOCK_PROPERTIES
    .filter(p => p.id !== propertyId && p.city === city && p.type === type)
    .map(p => ({
      ...p,
      property_images: MOCK_IMAGES.filter(i => i.property_id === p.id)
    }))
    .slice(0, 3);
}

export async function submitLead(data: { property_id: string; name: string; phone: string; email: string; message: string }) {
  if (supabase) {
    const { error } = await supabase
      .from('leads')
      .insert([data]);
    if (error) throw error;
    return true;
  }
  // Mock success
  console.log('Mock lead submitted:', data);
  return true;
}

export async function getFeaturedProperties() {
  if (supabase) {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*, property_images(image_url)')
      .eq('featured', true)
      .limit(4);
    
    if (error) {
      console.error('Error fetching featured properties:', error);
      return [];
    }
    
    // Map data to match the expected format of the frontend
    return properties.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      type: p.type,
      price: `MAD ${p.price.toLocaleString()}`,
      location: p.address || p.city,
      area: p.surface || 'N/A',
      beds: p.bedrooms,
      baths: p.bathrooms,
      image: p.property_images && p.property_images.length > 0 ? p.property_images[0].image_url : '/placeholder.jpg'
    }));
  }
  
  // Fallback to mock data format
  return MOCK_PROPERTIES.filter(p => p.featured).map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    type: p.type,
    price: `MAD ${p.price.toLocaleString()}`,
    location: p.address || p.city,
    area: p.surface || 'N/A',
    beds: p.bedrooms,
    baths: p.bathrooms,
    image: MOCK_IMAGES.find(i => i.property_id === p.id)?.image_url || '/placeholder.jpg'
  })).slice(0, 4);
}
