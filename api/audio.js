import request from "@/utils/request";

export function getAudios() {
  return request({
    method: "GET",
    url: "/api/v1/audios"
  });
}
