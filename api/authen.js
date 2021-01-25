import request from "@/utils/request";

export async function register(params) {
  return await request({
    type: "POST",
    method: "POST",
    url: "/api/v1/auth/register",
    data: params,
  });
}

export async function login(params) {
  return await request({
    type: "POST",
    method: "POST",
    url: "/api/v1/auth/login",
    data: params,
  });
}

export async function getUserInfo() {
  return await request({
    method: "GET",
    type: "GET",
    url: "/api/v1/auth/user",
  });
}

export async function updateUser(data) {
  return await request({
    method: "POST",
    type: "POST",
    url: "/api/v1/auth/user",
    data,
  });
}

export async function changePassword({ passwordOld, passwordNew }) {
  return await request({
    type: "POST",
    method: "POST",
    url: "/api/v1/auth/password",
    data: {
      password_old: passwordOld,
      password_new: passwordNew,
    },
  });
}

export async function logout() {
  return await request({});
}

export async function verifyToken() {
  return await request({
    type: "POST",
    method: "POST",
    url: "api/v1/auth/verify-token",
  });
}
