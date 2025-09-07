
import { SpaceWrapper } from "@/components/space-wrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 min-h-[calc(100vh-4rem)] pt-20">
      <div className="border-b bg-background shadow-sm">
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
