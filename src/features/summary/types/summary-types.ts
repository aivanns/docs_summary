export interface CreateSummaryPayload {
  // Define create payload here
}

export interface UpdateSummaryPayload {
  // Define update payload here
}

export interface SummaryResponse {
  // Define API response here
}

export interface SummaryListResponse {
  items: SummaryResponse[];
  total: number;
}

export interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList;
  };
}

export type SupportedFileTypes = '.txt' | '.doc' | '.docx' | '.pdf';
