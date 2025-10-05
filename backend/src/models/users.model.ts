import z from "zod";

export const UserIdSchema = z.uuid();
export type UserId = z.infer<typeof UserIdSchema>

export const UserSchema = z.object({

  id: UserIdSchema,
  username: z.string(),
  hp: z.int(),
  xp: z.int().describe("200xp = 1 lvl"),
  spentPrestige: z.int().describe("field should increment only if result is not greater than xp//200 + count of 7-days-in-row streaks"),

});
export type User = z.infer<typeof UserSchema>

