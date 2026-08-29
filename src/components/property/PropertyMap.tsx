export function PropertyMap({ address }: { address: string }) {
  // We use a simple generic Google Maps iframe query based on the address
  const mapQuery = encodeURIComponent(address || "Casablanca, Morocco");
  
  return (
    <div className="mb-12">
      <h3 className="font-serif text-2xl font-bold text-white mb-6">Emplacement</h3>
      <div className="w-full h-[400px] rounded-sm overflow-hidden border border-white/10">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${mapQuery}`}
          allowFullScreen
          // Since the API key is not provided, this might show an error. 
          // A safer fallback without API key is using standard maps iframe.
        ></iframe>
      </div>
    </div>
  );
}

// Fallback Map implementation since API key is likely missing
export function PropertyMapFallback({ address }: { address: string }) {
  const mapQuery = encodeURIComponent(address || "Casablanca, Morocco");
  return (
    <div className="mb-12">
      <h3 className="font-serif text-2xl font-bold text-white mb-6">Emplacement</h3>
      <div className="w-full h-[400px] rounded-sm overflow-hidden border border-white/10">
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen 
          referrerPolicy="no-referrer-when-downgrade" 
          src={`https://maps.google.com/maps?q=${mapQuery}&t=m&z=13&output=embed&iwloc=near`}
        >
        </iframe>
      </div>
    </div>
  );
}
