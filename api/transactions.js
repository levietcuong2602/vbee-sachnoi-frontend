import request from "@/utils/request";

export async function getTransactions(params) {
  return await request({
    url: "/api/v1/transactions",
    method: "GET",
    type: "GET",
    params
  });
}
