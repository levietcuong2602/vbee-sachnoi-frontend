import request from "@/utils/request";

export async function generateCaptcha() {
  return await request({
    url: "/api/v1/captcha",
    type: "GET",
    method: "GET"
  });
}
