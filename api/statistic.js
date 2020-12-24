import request from "@/utils/request";

export async function statisticsBooks({ startTime, endTime }) {
  return await request({
    type: "GET",
    method: "GET",
    url: "/api/v1/statistics/books/day",
    params: {
      start_time: startTime,
      end_time: endTime
    }
  });
}

export async function statisticsChapters({ startTime, endTime }) {
  return await request({
    type: "GET",
    method: "GET",
    url: "/api/v1/statistics/chapters/day",
    params: {
      start_time: startTime,
      end_time: endTime
    }
  });
}

export async function statisticsSentences({ startTime, endTime }) {
  return await request({
    type: "GET",
    method: "GET",
    url: "/api/v1/statistics/sentences/day",
    params: {
      start_time: startTime,
      end_time: endTime
    }
  });
}

export async function statisticsPeriod({ startTime, endTime }) {
  return await request({
    type: "GET",
    method: "GET",
    url: "/api/v1/statistics/period/day",
    params: {
      start_time: startTime,
      end_time: endTime
    }
  });
}
