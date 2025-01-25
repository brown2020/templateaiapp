import * as z from "zod";

export const profileFormSchema = z.object({
    displayName: z.string().min(2, "Display name must be at least 2 characters"),
    email: z.string().email(),
    phone: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
});
