import request from "@/utils/request";

export async function getPackages() {
  return await request({
    type: "GET",
    method: "GET",
    url: "/api/v1/packages"
  });
}
