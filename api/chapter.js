import request from "@/utils/request";

export async function getChapters(params) {
  return await request({
    url: "/api/v1/chapters",
    method: "GET",
    params
  });
}

export async function getChapter(chapterId) {
  return await request({
    url: `/api/v1/chapters/${chapterId}`,
    method: "GET",
    type: "GET"
  });
}

export async function updateChapter(chapterId, params) {
  return await request({
    url: `/api/v1/chapters/${chapterId}`,
    method: "PUT",
    data: params
  });
}

export async function createChapters({ chapters }) {
  return await request({
    url: "/api/v1/chapters-mutils",
    method: "POST",
    data: {
      chapters
    }
  });
}

export async function downloadChapter(url) {
  return await request({
    url,
    method: "GET",
    responseType: "blob"
  });
}
export async function deleteChapter(chapterId) {
  return await request({
    method: "DELETE",
    url: `/api/v1/chapters/${chapterId}`
  });
}
