import { Send, Share2 } from "lucide-react";

import { jetbrainsMono } from "@/lib/font";

import { CustomButton } from "../common/custom-button";

const Navbar = () => {
  return (
    <header className="border-border bg-background sticky top-0 flex h-16 w-full shrink-0 items-center justify-between border-b px-6">
      <p
        className={`text-muted-foreground text-sm font-medium ${jetbrainsMono.className}`}
      >
        persona.com/igmoni
      </p>
      <div className="flex items-center gap-2">
        <CustomButton className="flex gap-2 rounded-full py-5 text-sm">
          <Share2 className="size-4" />
          Share
        </CustomButton>
        <CustomButton
          className="flex gap-2 rounded-full py-5 text-sm"
          variant={"outline"}
        >
          <Send className="size-4" />
          Publish your page
        </CustomButton>
      </div>
    </header>
  );
};

export { Navbar };
