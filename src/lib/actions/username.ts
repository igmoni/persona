"use server";

import { createClient } from "@/lib/supabase/server";

export async function checkUsernameAvailability(username: string) {
  const normalizedUsername = username.trim().toLowerCase();

  // Validate format first
  if (!/^[a-z0-9_]{3,30}$/.test(normalizedUsername)) {
    return {
      available: false,
      error:
        "Username must be 3-30 characters (letters, numbers, underscores).",
    };
  }

  const supabase = await createClient();

  // Verify authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      available: false,
      error: "You must be logged in.",
    };
  }

  // Check availability using PostgreSQL function
  const { data, error } = await supabase.rpc("check_username_availability", {
    p_username: normalizedUsername,
  });

  if (error) {
    return {
      available: false,
      error: "Unable to check username availability.",
    };
  }

  return {
    available: data === true,
    error: data ? null : "This username is already taken.",
  };
}
