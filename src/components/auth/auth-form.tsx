"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginWithEmailOrUsername } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/client";
import {
  type AuthFormValues,
  loginSchema,
  signupSchema,
} from "@/lib/validations/auth";

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const supabase = createClient();
  const [message, setMessage] = useState("");
  const [oauthLoading, setOAuthLoading] = useState(false);

  const isSignup = mode === "signup";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setMessage("");
    if (!isSignup) {
      const result = await loginWithEmailOrUsername(
        values.identifier,
        values.password
      );

      if (result.error) {
        setMessage(result.error);
        return;
      }

      router.push("/dashboard");
      router.refresh();
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.identifier,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setMessage(
        data.session
          ? "Account created successfully!"
          : "Check your email to confirm your account"
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  const handleGoogleSignIn = async () => {
    setOAuthLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Google sign-in failed."
      );
      setOAuthLoading(false);
    }
  };

  const loading = isSubmitting || oauthLoading;

  return (
    <div className="mx-auto w-full max-w-sm space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">
          {isSignup ? "Create your Persona" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {isSignup
            ? "Create your account to get started."
            : "Log in to manage your profile."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="identifier" className="text-sm font-medium">
            {isSignup ? "Email" : "Email or username"}
          </label>
          <input
            id="identifier"
            type={isSignup ? "email" : "text"}
            autoComplete="username"
            aria-invalid={!!errors.identifier}
            {...register("identifier")}
            className="w-full rounded-md border bg-transparent px-3 py-2"
          />
          {errors.identifier && (
            <p className="text-sm text-red-500">{errors.identifier.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            aria-invalid={!!errors.password}
            {...register("password")}
            className="w-full rounded-md border bg-transparent px-3 py-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground w-full rounded-md px-4 py-2 disabled:opacity-50"
        >
          {isSubmitting
            ? "Please wait..."
            : isSignup
              ? "Create account"
              : "Log in"}
        </button>
      </form>

      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <div className="bg-border h-px flex-1" />
        or
        <div className="bg-border h-px flex-1" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full rounded-md border px-4 py-2 disabled:opacity-50"
      >
        {oauthLoading ? "Please wait..." : "Continue with Google"}
      </button>

      {message && (
        <p role="status" aria-live="polite" className="text-sm">
          {message}
        </p>
      )}

      <p className="text-muted-foreground text-sm">
        {isSignup ? "Already have an account?" : "New to Persona?"}{" "}
        <a
          href={isSignup ? "/login" : "/signup"}
          className="underline underline-offset-4"
        >
          {isSignup ? "Log in" : "Create an account"}
        </a>
      </p>
    </div>
  );
};

export { AuthForm };
