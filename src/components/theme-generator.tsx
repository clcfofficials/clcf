"use client";

import { useState } from "react";
import { generateNewTheme } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ThemeGenerator() {
  const [loading, setLoading] = useState(false);
  const [themeApplied, setThemeApplied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    const css = await generateNewTheme();

    if (css.includes("Error generating theme")) {
      toast({
        title: "Theme Generation Failed",
        description: "Could not generate a new theme. Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    let styleTag = document.getElementById("ai-theme-styles");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "ai-theme-styles";
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = css;
    setLoading(false);
    setThemeApplied(true);
    toast({
      title: "AI Theme Applied!",
      description: "A new theme has been generated and applied.",
    });
  };

  const handleReset = () => {
    const styleTag = document.getElementById("ai-theme-styles");
    if (styleTag) {
      styleTag.remove();
    }
    setThemeApplied(false);
    toast({
      title: "Theme Reset",
      description: "The default theme has been restored.",
    });
  };

  return (
    <div className="mt-8 flex justify-center gap-4">
      <Button onClick={handleGenerate} disabled={loading} size="lg">
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-5 w-5" />
        )}
        {loading ? "Generating..." : "Generate AI Theme"}
      </Button>
      {themeApplied && (
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset Theme
        </Button>
      )}
    </div>
  );
}
