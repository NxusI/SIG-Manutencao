'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '../ui/breadcrumb';

export function SiteHeader() {
  const pathname = usePathname();

  const isHome = pathname === '/home';

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean); 
    return segments.map((segment, idx) => {
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);

      const isLast = idx === segments.length - 1;

      if (isLast) {
        return (
          <BreadcrumbItem key={idx}>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        )
      }

      return (
          <BreadcrumbItem key={idx}>
            <BreadcrumbLink>{label}</BreadcrumbLink>
            <ChevronRight size={13} className='text-muted-foreground'/>
          </BreadcrumbItem>
      );
    });
  }, [pathname]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />

        {isHome ? (
          <h1 className="text-base font-medium flex">
            Bem vindo!
          </h1>
        ) : (
          <div className="flex items-center space-x-1">
            {breadcrumbs}
          </div>
        )}
      </div>
    </header>
  );
}