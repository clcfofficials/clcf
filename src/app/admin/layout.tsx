export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 min-h-[calc(100vh-4rem)]">
      <div className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-primary">CLCF Admin Panel</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
