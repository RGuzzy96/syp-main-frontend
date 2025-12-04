import { Database } from "./supabase.types";

export type ProfilesRow = Database['public']['Tables']['profiles']['Row'];
export type ProfilesUpdate = Database['public']['Tables']['profiles']['Update'];

export type ProjectsRow = Database['public']['Tables']['projects']['Row'];
export type ProjectsUpdate = Database['public']['Tables']['projects']['Update'];

export type ExperimentsRow = Database['public']['Tables']['experiments']['Row'];
export type ExperimentsUpdate = Database['public']['Tables']['experiments']['Update'];