"use server";

import { createClient } from "../supabase/server";

type OnboardingResult =
  { success: true; username: string } | { success: false; error: string };

export const completeOnboarding = async (
  username: string
): Promise<OnboardingResult> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const normalizedUsername = username.trim().toLowerCase();

  if (!/^[a-z0-9_]{3,30}$/.test(normalizedUsername)) {
    return {
      success: false,
      error:
        "Username must be 3-30 characters and contain only letters, numbers and underscores.",
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return { success: false, error: "Profile not found. Please try again." };
  }

  if (profile.username) {
    return { success: false, error: "You have already completed onboarding" };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      username: normalizedUsername,
    })
    .eq("user_id", user.id);

  if (updateError) {
    if (updateError.code === "23505") {
      return {
        success: false,
        error: "This username is already taken.",
      };
    }
    return { success: false, error: updateError.message };
  }

  return { success: true, username: normalizedUsername };
};
