import { apiClient } from "../../api/apiClient";
import { API_ENDPOINTS } from "../../api/endpoints";
import type { KonsultasiDraft } from "../konsultasiDraft";
import { uploadFileToApi } from "../upload/uploadService";

export type ConsultationResult = {
  requestId: string;
  submittedAt: string;
  status: "received";
};

export type StoredConsultationRequest = KonsultasiDraft & ConsultationResult;

export const readConsultationRequests = async (): Promise<StoredConsultationRequest[]> => {
  try {
    const data = await apiClient<{ requests: StoredConsultationRequest[] }>(
      API_ENDPOINTS.clientDashboard.overview,
    );
    // The client dashboard returns consultation data as part of the overview
    // For now, return empty array as there's no dedicated list endpoint
    return [];
  } catch {
    return [];
  }
};

const submitToApi = async (draft: KonsultasiDraft, files: File[]) => {
  const uploadedFiles = await Promise.all(files.map(uploadFileToApi));
  return apiClient<ConsultationResult>(API_ENDPOINTS.consultations.create, {
    method: "POST",
    body: {
      ...draft,
      fileIds: uploadedFiles.map((file) => file.fileId),
    },
  });
};

export const consultationService = {
  submit(draft: KonsultasiDraft, files: File[]) {
    return submitToApi(draft, files);
  },
};
