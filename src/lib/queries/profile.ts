import "server-only";

import { createClient } from "@/lib/supabase/server";

// Get the currently authenticated user's profile
export async function getCurrentProfile() {
  const supabase = await createClient();

  // Verify authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: "Unauthorized",
      profile: null,
    };
  }

  // Fetch profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      error: "Failed to fetch profile",
      profile: null,
    };
  }

  if (!profile) {
    return {
      success: false,
      error: "Profile not found",
      profile: null,
    };
  }

  return {
    success: true,
    error: null,
    profile,
  };
}

// Get a public profile using username
export async function getProfileByUsername(username: string) {
  const supabase = await createClient();

  const normalizedUsername = username.trim().toLowerCase();

  if (!/^[a-z0-9_]{3,30}$/.test(normalizedUsername)) {
    return {
      success: false,
      error: "Invalid username",
      profile: null,
    };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", normalizedUsername)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      error: "Failed to fetch profile",
      profile: null,
    };
  }

  if (!profile) {
    return {
      success: false,
      error: "Profile not found",
      profile: null,
    };
  }

  return {
    success: true,
    error: null,
    profile,
  };
}
