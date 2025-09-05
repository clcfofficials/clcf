import { Leaf } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">CropLife Navigator</span>
          </div>
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} CropLife Care Fertilizers. All Rights Reserved.</p>
            <p>Your Partner in Growth and Success.</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>This is a fictional website created for demonstration purposes.</p>
          <Link href="/admin" className="hover:text-primary transition-colors">Admin Panel</Link>
        </div>
      </div>
    </footer>
  );
}
