"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowRight, Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { createWorkspace, updateWorkspace } from "@/actions/workspace";
import { Logo } from "@/components/common/Logo";
import { PersonaPagePreview } from "@/components/preview/page-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jetbrainsMono } from "@/lib/font";
import type { PersonaPreviewData } from "@/types/persona";

import { ChoiceDialog } from "./choice-dialog";
import { Progress } from "./progress";
import { Introduction } from "./steps/introduction";
import { Profession } from "./steps/profession";
import { Socials } from "./steps/socials";
import { Theme } from "./steps/theme";

const initialData: PersonaPreviewData = {
  username: "",
  fullName: "",
  profession: "developer",
  bio: "",
  avatarUrl: null,
  theme: "linen",
  socials: [],
  blocks: [],
};

const Wizard = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<PersonaPreviewData>(initialData);

  const [showBuildDialog, setShowBuildDialog] = useState(false);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");

  const [usernameMessage, setUsernameMessage] = useState("");

  const isValidUsername = /^[a-zA-Z0-9_]{3,20}$/.test(data.username);

  // Username availability check
  useEffect(() => {
    if (!isValidUsername) return;

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setUsernameStatus("checking");
      setUsernameMessage("Checking availability...");

      try {
        const response = await fetch(
          `/api/onboarding/username?username=${encodeURIComponent(
            data.username.toLowerCase()
          )}`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        setUsernameStatus(result.available ? "available" : "taken");
        setUsernameMessage(result.message);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setUsernameStatus("error");
        setUsernameMessage("Unable to check availability. Try again.");
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [data.username, isValidUsername]);

  // Update onboarding data
  const updateData = <K extends keyof PersonaPreviewData>(
    key: K,
    value: PersonaPreviewData[K]
  ) => {
    setData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // Username input
  const handleUsernameChange = (value: string) => {
    setUsernameStatus("idle");
    setUsernameMessage("");

    updateData("username", value.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase());
  };

  // Continue onboarding / create workspace
  const handleContinue = async () => {
    if (isSaving) return;

    if (step === 1) {
      if (!isValidUsername || usernameStatus !== "available") {
        return;
      }

      setIsSaving(true);

      try {
        const result = await createWorkspace(data.username);

        if (!result.success) {
          toast.error(result.error);

          if (result.error === "Username is already taken") {
            setUsernameStatus("taken");
            setUsernameMessage(result.error);
          }

          return;
        }

        setWorkspaceId(result.workspace.id);
        setShowBuildDialog(true);
      } catch (error) {
        console.error("Workspace creation error:", error);
        toast.error("Unable to create workspace. Please try again.");
      } finally {
        setIsSaving(false);
      }

      return;
    }

    if (step < 5) {
      setStep((previous) => previous + 1);
    }
  };

  // Go back
  const handleBack = () => {
    if (step > 1 && !isSaving) {
      setStep((previous) => previous - 1);
    }
  };

  // Build it myself
  const handleBuildMyself = () => {
    if (!workspaceId) {
      toast.error("Please create your workspace first.");
      return;
    }

    setShowBuildDialog(false);
    router.push("/dashboard");
    router.refresh();
  };

  // Help me build it
  const handleGetHelp = () => {
    if (!workspaceId) {
      toast.error("Please create your workspace first.");
      return;
    }

    setShowBuildDialog(false);
    setStep(2);
  };

  // Finish onboarding and update existing workspace
  const handleFinish = async () => {
    if (!workspaceId || isSaving) {
      toast.error("Your workspace could not be found.");
      return;
    }

    setIsSaving(true);

    try {
      const result = await updateWorkspace({
        workspaceId,
        fullName: data.fullName,
        bio: data.bio,
        profession: data.profession,
        theme: data.theme,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Your Persona has been created!");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Workspace update error:", error);
      toast.error("Unable to save your Persona. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const canContinue = step !== 3 || data.fullName.trim().length >= 2;

  return (
    <div className="bg-background text-foreground min-h-dvh">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_440px]">
        {/* Onboarding panel */}
        <section className="flex min-h-dvh flex-col">
          <header className="flex h-20 items-center justify-between border-b px-6 md:px-10">
            <Logo />

            <span className="text-muted-foreground text-xs">
              Step {step} of 5
            </span>
          </header>

          <div className="px-6 pt-6 md:px-10">
            <Progress currentStep={step} />
          </div>

          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12 md:px-10">
            {/* Step 1: Username */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
                    Step 01 — Your identity
                  </p>

                  <h1 className="text-3xl leading-tight font-medium tracking-tight md:text-4xl">
                    Claim an address for your page.
                  </h1>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Choose a unique username. This will become your public
                    Persona link.
                  </p>
                </div>

                <div className="space-y-2">
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
                      value={data.username}
                      onChange={(event) =>
                        handleUsernameChange(event.target.value)
                      }
                      placeholder="yourname"
                      className="-ml-2.5 border-0! bg-transparent! shadow-none! ring-0! outline-none! focus-visible:border-0! focus-visible:bg-transparent! focus-visible:ring-0!"
                      autoComplete="off"
                      maxLength={20}
                      disabled={isSaving || !!workspaceId}
                    />
                  </div>

                  <div className="flex min-h-5 items-center gap-1.5 text-xs">
                    {usernameStatus === "checking" && (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        <span className="text-muted-foreground">
                          {usernameMessage}
                        </span>
                      </>
                    )}

                    {usernameStatus === "available" && (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span className="text-emerald-600">
                          {usernameMessage}
                        </span>
                      </>
                    )}

                    {(usernameStatus === "taken" ||
                      usernameStatus === "error") && (
                      <>
                        <X className="text-destructive size-3.5" />
                        <span className="text-destructive">
                          {usernameMessage}
                        </span>
                      </>
                    )}

                    {usernameStatus === "idle" && (
                      <span className="text-muted-foreground">
                        Use 3–20 letters, numbers or underscores.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Profession */}
            {step === 2 && (
              <Profession
                value={data.profession}
                onChange={(profession) => updateData("profession", profession)}
              />
            )}

            {/* Step 3: Introduction */}
            {step === 3 && (
              <Introduction
                fullName={data.fullName}
                bio={data.bio}
                avatarUrl={data.avatarUrl ?? null}
                onFullNameChange={(value) => updateData("fullName", value)}
                onBioChange={(value) => updateData("bio", value)}
                onAvatarChange={(value) => updateData("avatarUrl", value)}
              />
            )}

            {/* Step 4: Socials */}
            {step === 4 && (
              <Socials
                socials={data.socials}
                onChange={(socials) => updateData("socials", socials)}
                onSkip={() => setStep(5)}
              />
            )}

            {/* Step 5: Theme */}
            {step === 5 && (
              <Theme
                value={data.theme}
                onChange={(theme) => updateData("theme", theme)}
              />
            )}

            {/* Navigation */}
            <div className="mt-auto flex items-center justify-between pt-12">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={isSaving}
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                type="button"
                onClick={step === 5 ? handleFinish : handleContinue}
                disabled={
                  isSaving ||
                  (step === 1 && usernameStatus !== "available") ||
                  !canContinue
                }
                className="h-12 rounded-full px-8"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {step === 5 ? "Create my Persona" : "Continue"}
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </div>
          </main>
        </section>

        {/* Live preview */}
        <aside className="bg-muted/40 hidden items-center justify-center border-l p-6 lg:flex">
          <div className="sticky top-6 w-full">
            <div className="mb-6 text-center">
              <p className="text-sm font-medium">Live preview</p>

              <p className="text-muted-foreground mt-1 text-xs">
                Your Persona, taking shape.
              </p>
            </div>

            <PersonaPagePreview data={data} />
          </div>
        </aside>
      </div>

      {/* Build choice dialog */}
      <ChoiceDialog
        open={showBuildDialog}
        onBuildMyself={handleBuildMyself}
        onGetHelp={handleGetHelp}
      />
    </div>
  );
};

export { Wizard };
