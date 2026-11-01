import { Send, Share2 } from "lucide-react";

import { jetbrainsMono } from "@/lib/font";

import { FlipButton } from "../common/flip-button";

const Navbar = () => {
  return (
    <header className="border-border bg-background sticky top-0 flex h-16 w-full shrink-0 items-center justify-between border-b px-6">
      <p
        className={`text-muted-foreground text-sm font-medium ${jetbrainsMono.className}`}
      >
        persona.com/igmoni
      </p>
      <div className="flex items-center gap-2">
        <FlipButton >
          <Share2 className="size-4" />
          Share
        </FlipButton>
        <FlipButton
          variant="secondary"
        >
          <Send className="size-4" />
          Publish your page
        </FlipButton>
      </div>
    </header>
  );
};

export { Navbar };
