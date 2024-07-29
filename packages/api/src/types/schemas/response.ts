export interface SuccessResponse<B> {
  success: true;
  data: B;
}

export interface ErrorResponse {
  success: false;
  data: { errors: string[] };
}
