"use client";

import { useState } from "react";

import { ArrowRight, BookOpen, Check } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jetbrainsMono } from "@/lib/font";

const steps = [1, 2, 3, 4, 5];

const Page = () => {
  const [username, setUsername] = useState("");

  const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (isValid) {
      // Connect your username availability API and next onboarding step here.
    }
  };

  return (
    <div className="flex">
      <div className="bg-background text-foreground min-h-screen w-3/4">
        {/* Header */}
        <header className="flex h-20 items-center justify-between px-6 md:px-9">
          {/* Logo */}
          <Logo />

          {/* Progress */}
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex size-7 items-center justify-center rounded-full border text-xs font-medium transition-all ${
                    step === 1
                      ? "border-primary bg-primary text-primary-foreground ring-primary/20 ring-4"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {step}
                </div>

                {index !== steps.length - 1 && (
                  <div className="bg-border mx-1.5 h-px w-4 md:w-5" />
                )}
              </div>
            ))}
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto w-full max-w-[448px] px-5 pt-8 md:pt-9">
          <div className="space-y-4">
            <div className="space-y-3">
              <h1 className="text-3xl leading-[1.2] font-medium tracking-tight md:text-[36px]">
                Claim an address for this page
              </h1>

              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                Each workspace gets its own public link and its own plan when
                you publish.
              </p>
            </div>

            {/* Username form */}
            <form onSubmit={handleSubmit} className="space-y-2 pt-4">
              <label htmlFor="username" className="text-sm font-semibold">
                Username
              </label>

              <div
                className={`border-input bg-background focus-within:border-ring flex h-12 items-center rounded-xl border px-4 transition-colors ${jetbrainsMono.className}`}
              >
                <span className="text-muted-foreground shrink-0 text-sm">
                  persona.com/
                </span>

                <Input
                  id="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))
                  }
                  className="-ml-2.5 border-0! bg-transparent! shadow-none! ring-0! outline-none! focus-visible:border-0! focus-visible:bg-transparent! focus-visible:ring-0!"
                  autoComplete="off"
                  maxLength={20}
                  required
                />
              </div>

              <div className="flex items-center gap-1.5 pt-0.5 text-xs">
                {isValid ? (
                  <>
                    <Check className="size-3.5 text-emerald-600" />
                    <span className="text-emerald-600">
                      Username format looks good
                    </span>
                  </>
                ) : (
                  <span className="text-destructive">
                    Use 3–20 letters, numbers or underscores.
                  </span>
                )}
              </div>

              {/* Continue */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="h-13 rounded-full px-10 text-sm font-semibold"
                >
                  Continue
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <div className="bg-accent w-1/4"></div>
    </div>
  );
};

export default Page;
