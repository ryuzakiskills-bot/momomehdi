import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm text-white/50 ${className}`} aria-label="Breadcrumb">
      <Link href="/" className="hover:text-white transition-colors flex items-center touch-manipulation min-h-[44px]">
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.label} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4" />
            {isLast || !item.href ? (
              <span className="text-white/90 font-medium truncate max-w-[200px] md:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-white transition-colors touch-manipulation min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
