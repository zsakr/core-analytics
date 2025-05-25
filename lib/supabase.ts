// Replace the entire createServerSupabaseClient function with this simplified version
export const createServerSupabaseClient = () => {
  try {
    const { createServerComponentClient } = require("@supabase/auth-helpers-nextjs")
    const { cookies } = require("next/headers")

    // Create the server client directly
    return createServerComponentClient({ cookies })
  } catch (error: any) {
    console.error("Error creating server Supabase client:", error)
    // Return a mock client that won't throw errors when methods are called
    return {
      auth: {
        getSession: async () => ({ data: { session: null } }),
      },
      from: () => ({
        insert: async () => ({ data: null, error: new Error("Supabase client not available") }),
        select: async () => ({ data: null, error: new Error("Supabase client not available") }),
        update: async () => ({ data: null, error: new Error("Supabase client not available") }),
      }),
    }
  }
}

