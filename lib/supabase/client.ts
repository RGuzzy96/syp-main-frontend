// src/lib/supabase/client.ts
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./types"; // 없으면 이 줄 삭제

export const supabase = createClientComponentClient<Database>(); // 제네릭 모르면 supabase = createClientComponentClient();
