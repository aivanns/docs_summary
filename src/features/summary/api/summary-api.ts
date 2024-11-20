import { apiRequest } from "@/shared/api";

export const SummaryApi = {
  getSelf: () => apiRequest.get('/users/me'),
  summarizeText: (text: string) => apiRequest.post('/summarizer/text', { text }),
  summarizeFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiRequest.post('/summarizer/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};