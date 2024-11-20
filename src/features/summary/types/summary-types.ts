export interface SummaryResponse {
  message: string;
  jobId: string;
}

export interface SummarySocketResponse {
  summary: string;
  jobId: string;
}

export interface SummaryPositionSocketResponse {
  position: string;
  jobId: string;
}

export interface SummaryErrorSocketResponse {
  error: string;
  jobId: string;
}

export interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList;
  };
}

export type SupportedFileTypes = '.txt' | '.doc' | '.docx' | '.pdf';
