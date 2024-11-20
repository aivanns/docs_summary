import { apiRequest } from "@/shared/api";

export const SummaryApi = {
  getSelf: () => apiRequest.get('/users/me'),
  summarize: (text: string) => apiRequest.post('/summarizer/text', { text }),
};