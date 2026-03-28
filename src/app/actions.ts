"use server";

import { supabase } from "@/lib/supabase";

export async function incrementLikes(cityId: number) {
  await supabase.rpc("increment_likes", { city_id: cityId });
}

export async function incrementDislikes(cityId: number) {
  await supabase.rpc("increment_dislikes", { city_id: cityId });
}
