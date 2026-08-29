import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#050505] pt-24">
      <div className="container mx-auto px-4 md:px-6 pb-24">
        
        {/* Gallery Skeleton */}
        <div className="mb-12 space-y-4">
          <Skeleton className="w-full aspect-video md:aspect-[21/9] rounded-sm bg-white/5" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-24 h-24 md:w-32 md:h-24 shrink-0 rounded-sm bg-white/5" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="border-b border-white/10 pb-8 mb-8 space-y-4">
              <div className="flex gap-3">
                <Skeleton className="w-20 h-6 bg-white/5" />
                <Skeleton className="w-20 h-6 bg-white/5" />
              </div>
              <Skeleton className="w-3/4 h-12 bg-white/5" />
              <Skeleton className="w-1/2 h-6 bg-white/5" />
            </div>
            
            <div className="space-y-4 mb-12">
              <Skeleton className="w-1/4 h-8 bg-white/5" />
              <Skeleton className="w-full h-4 bg-white/5" />
              <Skeleton className="w-full h-4 bg-white/5" />
              <Skeleton className="w-5/6 h-4 bg-white/5" />
            </div>

            <div className="space-y-4 mb-12">
              <Skeleton className="w-1/4 h-8 bg-white/5" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-full h-20 bg-white/5" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-8">
            <Skeleton className="w-full h-64 bg-white/5" />
            <Skeleton className="w-full h-[400px] bg-white/5" />
          </div>

        </div>
      </div>
    </main>
  );
}
