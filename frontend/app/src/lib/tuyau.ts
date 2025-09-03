import { api } from "@folie/backend-core/api";
import { createTuyau } from "@tuyau/client";

export const tuyau = createTuyau({
  api,
  baseUrl: "http://localhost:3333",
});
