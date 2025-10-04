import z from "zod";

export const QuestIdSchema = z.uuid()

export const QuestSchema = z.object({
  id: QuestIdSchema,
  category: z.enum(["sleep","meals","activity"]),
  difficulty: z.enum(["easy","normal","hard"]),
  content: z.string(),
});

export type Quest = z.infer<typeof QuestSchema>;