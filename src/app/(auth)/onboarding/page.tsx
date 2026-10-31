"use client";

import { type FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowRight, Check, Loader2, X } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "@/lib/actions/onboarding";
import { checkUsernameAvailability } from "@/lib/actions/username";
import { jetbrainsMono } from "@/lib/font";

const steps = [1, 2, 3, 4, 5];

const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  const handleUsernameChange = (value: string) => {
    setUsername(value.replace(/[^a-zA-Z0-9_]/g, ""));
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setStatus("checking");
    setMessage("Checking username availability...");

    try {
      // 1. Check username availability
      const availability = await checkUsernameAvailability(username);

      if (!availability.available) {
        setStatus("taken");
        setMessage(availability.error ?? "Username is unavailable.");
        return;
      }

      // 2. Save username to the database
      const result = await completeOnboarding(username);

      if (!result.success) {
        setStatus("error");
        setMessage(result.error);
        return;
      }

      // 3. Redirect to dashboard
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <div className="bg-background text-foreground min-h-screen w-3/4">
        {/* Header */}
        <header className="flex h-20 items-center justify-between px-6 md:px-9">
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
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="-ml-2.5 border-0! bg-transparent! shadow-none! ring-0! outline-none! focus-visible:border-0! focus-visible:bg-transparent! focus-visible:ring-0!"
                  autoComplete="off"
                  maxLength={20}
                  required
                />
              </div>

              {/* Username validation */}
              <div className="flex items-center gap-1.5 pt-0.5 text-xs">
                {status === "available" ? (
                  <>
                    <Check className="size-3.5 text-emerald-600" />
                    <span className="text-emerald-600">{message}</span>
                  </>
                ) : status === "taken" || status === "error" ? (
                  <>
                    <X className="text-destructive size-3.5" />
                    <span className="text-destructive">{message}</span>
                  </>
                ) : status === "checking" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span className="text-muted-foreground">{message}</span>
                  </>
                ) : (
                  <span
                    className={
                      username.length > 0 && !isValid
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  >
                    Use 3–20 letters, numbers or underscores.
                  </span>
                )}
              </div>

              {/* Continue */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="h-13 rounded-full px-10 text-sm font-semibold"
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                  {!isSubmitting && <ArrowRight className="ml-1 size-4" />}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <div className="bg-accent w-1/4" />
    </div>
  );
};

export default Page;
