"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Layers3 } from "lucide-react";
import { toast } from "sonner";

import { signIn, signUp } from "@/lib/auth-client";
import {
  type AuthFormValues,
  loginSchema,
  signupSchema,
} from "@/lib/validations/auth";
import { GoogleSvg } from "@/svgs/google-svg";

import { Container } from "../common/Container";
import { FlipButton } from "../common/flip-button";

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
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

  const loading = isSubmitting || oauthLoading;

  const inputClassName =
    "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive";

  const onSubmit = async (values: AuthFormValues) => {
    try {
      if (isSignup) {
        const { error } = await signUp.email({
          email: values.identifier,
          password: values.password,
          name: values.identifier.split("@")[0],
        });

        if (error) {
          toast.error("Signup failed", {
            description: error.message,
          });
          return;
        }

        toast.success("Account created successfully!");

        router.push("/dashboard");
        router.refresh();
        return;
      }

      const { error } = await signIn.email({
        email: values.identifier,
        password: values.password,
      });

      if (error) {
        toast.error("Login failed", {
          description: error.message,
        });
        return;
      }

      toast.success("Welcome back!");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(isSignup ? "Signup failed" : "Login failed", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setOAuthLoading(true);

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error("Google sign-in failed", {
          description: error.message,
        });
        setOAuthLoading(false);
      }
    } catch (error) {
      toast.error("Google sign-in failed", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });

      setOAuthLoading(false);
    }
  };

  return (
    <Container className="bg-background text-foreground relative flex min-h-dvh w-full flex-col">
      {/* Logo */}
      <header className="absolute top-0 left-0 z-10 p-7 sm:px-10 sm:py-7">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl">
            <Layers3 size={22} strokeWidth={2} />
          </div>

          <span className="text-base font-semibold tracking-tight">
            Persona
          </span>
        </Link>
      </header>

      {/* Auth form */}
      <section className="flex flex-1 items-center justify-center px-6 py-28">
        <div className="w-full max-w-[420px]">
          {/* Heading */}
          <div className="mb-7">
            {!isSignup && (
              <p className="text-muted-foreground mb-2 text-[11px] font-medium tracking-[0.22em] uppercase">
                Welcome back
              </p>
            )}

            <h1 className="text-[32px] leading-tight font-medium tracking-[-0.045em]">
              {isSignup ? "Let's build your page." : "Your page missed you."}
            </h1>

            <p className="text-muted-foreground mt-2 text-sm">
              {isSignup
                ? "Create an account and start building your digital identity."
                : "Sign in to continue to your Persona account."}
            </p>
          </div>

          {/* Google OAuth */}
          <FlipButton
            type="button"
            variant="secondary"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
          >
            <GoogleSvg />
            {oauthLoading ? "Please wait..." : "Continue with Google"}
          </FlipButton>

          {/* Divider */}
          <div className="text-muted-foreground my-6 flex items-center gap-3 text-xs">
            <div className="bg-border h-px flex-1" />
            <span>or continue with email</span>
            <div className="bg-border h-px flex-1" />
          </div>

          {/* Email/password form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="identifier" className="block text-sm font-medium">
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
                disabled={loading}
              />

              {errors.identifier && (
                <p className="text-destructive text-xs">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  placeholder={isSignup ? "Create a password" : "Your password"}
                  className={`${inputClassName} pr-11`}
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}

              {isSignup && (
                <p className="text-muted-foreground text-xs">
                  At least 8 characters.
                </p>
              )}
            </div>

            {/* Submit */}
            <FlipButton type="submit" disabled={loading} className="w-full">
              {isSubmitting
                ? "Please wait..."
                : isSignup
                  ? "Create account"
                  : "Log in"}
            </FlipButton>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`text-muted-foreground absolute bottom-5 p-7 text-sm sm:px-10 sm:py-7 ${
          isSignup ? "right-0" : "left-0"
        }`}
      >
        {isSignup ? (
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-foreground hover:text-primary font-medium underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        ) : (
          <p>
            New here?{" "}
            <Link
              href="/signup"
              className="text-foreground hover:text-primary font-medium underline underline-offset-4"
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
