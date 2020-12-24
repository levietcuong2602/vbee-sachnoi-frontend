import request from "@/utils/request";

export function convertTTS(options) {
  return request({
    method: "POST",
    url: "/api/v1/tts/convert",
    data: options
  });
}

export function convertBook(bookId) {
  return request({
    method: "GET",
    url: `/api/v1/tts/convert/book`,
    params: {
      book_id: bookId
    }
  });
}

export function reconvertChapter(chapterId) {
  return request({
    method: "GET",
    url: "/api/v1/tts/reconvert/chapter",
    params: {
      chapter_id: chapterId
    }
  });
}
