import request from "@/utils/request";

export function getVoices() {
  return request({
    type: "GET",
    method: "GET",
    url: "/api/v1/voices"
  });
}
