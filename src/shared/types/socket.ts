export interface ServerToClientEvents {
  summary: (data: { jobId: string; summary: string }) => void;
  position: (data: { position: number }) => void;
  error: (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  summarize_request: (data: { text: string }) => void;
} 