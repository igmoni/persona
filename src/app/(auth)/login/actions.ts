"use server";

import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  identifier: z.string().trim().min(1).max(254),
  password: z.string().min(8).max(128),
});

export async function loginWithEmailOrUsername(
  identifier: string,
  password: string
) {
  const parsed = loginSchema.safeParse({ identifier, password });

  if (!parsed.success) {
    return { error: "Enter a valid email/username and password." };
  }

  const value = parsed.data.identifier.toLowerCase();

  try {
    let email = value;

    if (!value.includes("@")) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!url || !key) {
        return { error: "Authentication is temporarily unavailable." };
      }

      const admin = createSupabaseAdmin(url, key, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { data: profile, error: lookupError } = await admin
        .from("profiles")
        .select("user_id")
        .eq("username", value)
        .maybeSingle();

      if (lookupError || !profile) {
        return { error: "Invalid username/email or password." };
      }

      const { data, error } = await admin.auth.admin.getUserById(
        profile.user_id
      );

      if (error || !data.user.email) {
        return { error: "Invalid username/email or password." };
      }

      email = data.user.email;
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: parsed.data.password,
    });

    if (error) {
      return { error: "Invalid username/email or password." };
    }

    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
