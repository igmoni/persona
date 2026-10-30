"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Layers3 } from "lucide-react";
import { toast } from "sonner";

import { loginWithEmailOrUsername } from "@/app/(auth)/login/actions";
import { createClient } from "@/lib/supabase/client";
import {
  type AuthFormValues,
  loginSchema,
  signupSchema,
} from "@/lib/validations/auth";
import { GoogleSvg } from "@/svgs/google-svg";

import { Container } from "../common/Container";
import { CustomButton } from "../common/custom-button";
import { Button } from "../ui/button";

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const supabase = createClient();

  const [oauthLoading, setOAuthLoading] = useState(false);

  const isSignup = mode === "signup";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    try {
      if (!isSignup) {
        const result = await loginWithEmailOrUsername(
          values.identifier,
          values.password
        );

        if (result.error) {
          toast.error("Login failed", {
            description: result.error,
          });
          return;
        }

        toast.success("Logged in successfully!");
        router.push("/dashboard");
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: values.identifier,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("Signup failed", {
          description: error.message,
        });
        return;
      }

      if (data.session) {
        toast.success("Account created successfully!");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.success("Account created!", {
          description: "Check your email to verify your account.",
        });
      }
    } catch (error) {
      toast.error(isSignup ? "Signup failed" : "Login failed", {
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setOAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("Google sign-in URL was not returned.");
      }
    } catch (error) {
      toast.error("Google sign-in failed", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });

      setOAuthLoading(false);
    }
  };

  const loading = isSubmitting || oauthLoading;

  const inputClassName =
    "w-full rounded-xl border border-black/[0.08] bg-card text-[15px] text-ink placeholder:text-ink-3/75 transition-[border-color,box-shadow] outline-none hover:border-black/15 focus:border-accent/50 focus:shadow-ring disabled:opacity-60 aria-[invalid=true]:border-ember h-11 px-3.5";

  return (
    <Container className="relative flex min-h-dvh w-full flex-col bg-white text-black">
      {/* Logo */}
      <header className="absolute top-0 left-0 z-10 p-7 sm:px-10 sm:py-7">
        <a href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-black text-white">
            <Layers3 size={22} strokeWidth={2} />
          </div>

          <span className="text-base font-semibold tracking-tight">
            Persona
          </span>
        </a>
      </header>

      {/* Auth form */}
      <section className="flex flex-1 items-center justify-center px-6 py-28">
        <div className="w-full max-w-[420px]">
          {/* Heading */}
          <div className="mb-7">
            {!isSignup && (
              <p className="text-ink-2 mb-2 text-[11px] font-medium tracking-[0.22em] uppercase">
                Welcome back
              </p>
            )}

            <h1 className="text-[32px] leading-tight font-medium tracking-[-0.045em]">
              {isSignup ? "Let's build your page." : "Your page missed you."}
            </h1>
          </div>

          {/* Google OAuth */}
          <CustomButton
            variant={"secondary"}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-black/[0.09] bg-white text-sm font-semibold transition-colors hover:bg-black/[0.025] disabled:opacity-50"
          >
            <GoogleSvg />

            {oauthLoading ? "Please wait..." : "Continue with Google"}
          </CustomButton>

          {/* Divider */}
          <div className="text-ink-2 my-6 flex items-center gap-3 text-xs">
            <div className="h-px flex-1 bg-black/[0.09]" />
            <span>or</span>
            <div className="h-px flex-1 bg-black/[0.09]" />
          </div>

          {/* Email/password form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="block text-[13px] font-medium"
              >
                Email
              </label>

              <input
                id="identifier"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.identifier}
                {...register("identifier")}
                placeholder="you@example.com"
                className={inputClassName}
              />

              {errors.identifier && (
                <p className="text-ember text-xs">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[13px] font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                aria-invalid={!!errors.password}
                {...register("password")}
                placeholder={isSignup ? "Create a password" : "Your password"}
                className={inputClassName}
              />

              {errors.password && (
                <p className="text-ember text-xs">{errors.password.message}</p>
              )}

              {isSignup && (
                <p className="text-ink-2 text-xs">At least 8 characters.</p>
              )}
            </div>

            {/* Submit */}
            <CustomButton
              type="submit"
              disabled={loading}
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-black px-4 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {isSubmitting
                ? "Please wait..."
                : isSignup
                  ? "Continue"
                  : "Log in"}
            </CustomButton>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`text-ink-2 absolute ${isSignup ? "right-0" : "left-0"} bottom-5 p-7 text-[13px] sm:px-10 sm:py-7`}
      >
        {isSignup ? (
          <p>
            Already have a page?{" "}
            <Link
              href="/login"
              className="cursor-pointer font-semibold text-black underline underline-offset-2"
            >
              Log in
            </Link>
          </p>
        ) : (
          <p>
            New here?{" "}
            <Link
              href="/signup"
              className="cursor-pointer font-semibold text-black underline underline-offset-2"
            >
              Start building for free
            </Link>
          </p>
        )}
      </footer>
    </Container>
  );
};

export { AuthForm };
