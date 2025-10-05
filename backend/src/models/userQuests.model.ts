import z from "zod";
import { QuestIdSchema } from "./quests.model";
import { UserIdSchema } from "./users.model";

export const UserQuestIdSchema = z.uuid()
export type UserQuestId = z.infer<typeof UserQuestIdSchema>

export const UserQuestSchema = z.object({
  id: UserQuestIdSchema,
  questId: QuestIdSchema, 
  userId: UserIdSchema,
  completed: z.boolean(),
  date: z.date(),
});

// Questy są losowane przy logowaniu, wraz ze sprawdzeniem, czy quest nie powtarza się w stosunku do dnia poprzedniego (lub obecnego rozdania ofc). 
// W przypadku, gdy dzień temu użytkownik się nie zalogował (nie ma userquestów za dzień wczorajszy)

export type UserQuest = z.infer<typeof UserQuestSchema>;