
import { SpaceWrapper } from "@/components/space-wrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-green-50/20 via-background to-emerald-50/10 min-h-[calc(100vh-4rem)] pt-20 dark:from-green-950/20 dark:to-emerald-950/10">
      <div className="border-b bg-background/80 backdrop-blur-sm shadow-sm sticky top-16 z-40">
        <SpaceWrapper className="py-3">
          <h1 className="text-xl font-bold text-primary">CLCF Admin Panel</h1>
        </SpaceWrapper>
      </div>
      <SpaceWrapper className="py-8">
        {children}
      </SpaceWrapper>
    </div>
  );
}
