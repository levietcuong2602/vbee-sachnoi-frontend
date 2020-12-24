import request from "@/utils/request";
import { getToken } from "@/utils/auth";

export async function getBooks(params) {
  return await request({
    url: "/api/v1/books",
    method: "GET",
    params
  });
}

export async function getBookInfo(bookId) {
  return await request({
    url: `/api/v1/books/${bookId}`,
    method: "GET",
    type: "GET"
  });
}

export async function createBook({
  userId,
  title,
  author,
  publicYear,
  status,
  numberChapter,
  voiceId,
  bitRate,
  rate,
  soundBackground,
  usedSoundBackground,
  soundBackgroundVolumn,
  audioType,
  file
}) {
  return await request({
    url: "/api/v1/books",
    method: "POST",
    data: {
      user_id: userId,
      title,
      author,
      public_year: publicYear,
      status,
      number_chapter: numberChapter,
      voice_id: voiceId,
      bit_rate: bitRate,
      rate,
      sound_background: soundBackground,
      used_sound_background: usedSoundBackground,
      sound_background_volumn: soundBackgroundVolumn,
      audio_type: audioType,
      file
    }
  });
}

export async function updateBook(bookId, data) {
  return await request({
    url: `/api/v1/books/${bookId}`,
    method: "PUT",
    data
  });
}

export async function deleteBook(bookId) {
  return await request({
    url: `/api/v1/books/${bookId}`,
    method: "DELETE",
    type: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + getToken()
    }
  });
}
