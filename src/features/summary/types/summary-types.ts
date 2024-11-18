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
