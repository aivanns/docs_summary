import { apiRequest } from "@/shared/api";

export const SummaryApi = {
  summarize: (text: string) => apiRequest.post('/summarizer/text', { text }),
};