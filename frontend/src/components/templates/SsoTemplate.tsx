"use client";

import { SsoHero } from "@/components/organisms/sso/SsoHero";
import { SsoAppGrid } from "@/components/organisms/sso/SsoAppGrid";
import { SsoSecurityOverview } from "@/components/organisms/sso/SsoSecurityOverview";
import { SsoActivityTimeline } from "@/components/organisms/sso/SsoActivityTimeline";

export function SsoTemplate() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-black/5">
      {/* Hero Section - Gradient & Modern */}
      <SsoHero />

      <main className="container mx-auto px-4 -mt-10 relative z-10 pb-20 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Column: Security & Activity */}
           <div className="lg:col-span-1 space-y-8">
              <SsoSecurityOverview />
              <SsoActivityTimeline />
           </div>

           {/* Right Column: Applications */}
           <div className="lg:col-span-2">
              <SsoAppGrid />
           </div>
        </div>
      </main>
    </div>
  );
}
