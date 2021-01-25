export function changeToSlug(title = "vbee", replace = "_") {
  var slug = "";
  var titleLower = title.toLowerCase();
  slug = titleLower.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  slug = slug.replace(/ /gi, replace);
  slug = slug.replace(/\-\-\-\-\-/gi, replace);
  slug = slug.replace(/\-\-\-\-/gi, replace);
  slug = slug.replace(/\-\-\-/gi, replace);
  slug = slug.replace(/\-\-/gi, replace);
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
}

export function convertDate(inputFormat, format = "DD/MM/YYYY") {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  if (format === "DD/MM/YYYY") {
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  } else if (format === "YYYY-MM-DD") {
    return [pad(d.getFullYear()), pad(d.getMonth() + 1), d.getDate()].join("-");
  }
}

export function getTotalCharacters(text) {
  const words = text.split(/[ -./\\()"',;<>~!@#$%^&*|+=[\]{}`~?:]/u);
  var totalCount = 0;
  for (const word of words) {
    totalCount += word.length;
  }
  return totalCount;
}

export function normalizeString(string) {
  return (
    string
      .replace(/-+/gi, "-")
      .replace(/@-|-@|@/gi, "")
      .replace(/[\n\r]+/gi, "")
      .replace(/\`/gi, "")
      .replace(/(\.|:|!|\?|\. )(\-)/gi, "$1\n$2")
      // .replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\n|\r|\r\n)/gm, "$1$2\n")
      .trim()
  );
}

export function getPageWithLines(string, maxLineOfPage, maxCharacterOfLine) {
  string = normalizeString(string);

  const pages = [];
  // const words = string.split(/[ -./\\()"',;<>~!@#$%^&*|+=[\]{}`~?:]/u);
  const words = string.split(/ /u);
  let linesOfPage = [];
  let line = "";

  for (let word of words) {
    line += word;
    line = line.trim() + " ";
    if (line.length >= maxCharacterOfLine) {
      line += "\n";
      linesOfPage.push(line);
      line = "";
    }
    if (linesOfPage.length >= maxLineOfPage) {
      pages.push(linesOfPage.join(" "));
      linesOfPage = [];
    }
  }
  if (linesOfPage.length > 0) {
    pages.push(linesOfPage.join(" "));
  }

  return pages;
}

export function getSentences(string) {
  return string
    .replace(/(\.|:|!|\?|\. )(\-)/gi, "$1\n$2")
    .replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2$3|")
    .trim()
    .split("|");
}

export function getPageSentences(characters, limit) {
  var pages = [];
  var sentences = getSentences(characters);

  var totalSentence = sentences.length;
  var pageLength = 0;
  var start = 0;

  for (var i = 0; i < totalSentence; ++i) {
    pageLength += sentences[i].length;
    if (pageLength > limit) {
      pages.push(sentences.slice(start, i).join(" "));
      start = i;
      pageLength = sentences[i].length;
    }
  }
  if (pageLength > 0) {
    pages.push(sentences.slice(start).join(" "));
  }
  if (totalSentence <= 0) {
    pages = [characters];
  }
  return pages;
}

export function pagination({ characters, limit, pageNum }) {
  var pages = getPageSentences(characters, limit);

  const totalPage = pages.length;
  const currentPageNum = totalPage >= pageNum ? pageNum : 1; // <= totalPage ? pageNum : totalPage;
  const hasPrev = currentPageNum > 1;
  const hasNext = currentPageNum < totalPage;
  const data = pages.length > 0 ? pages[currentPageNum - 1] : "";
  return {
    pager: {
      currentPageNum,
      hasPrev,
      hasNext,
      limit,
      prevPageNum: hasPrev ? currentPageNum - 1 : undefined,
      nextPageNum: hasNext ? currentPageNum + 1 : undefined,
      lastPageNum: totalPage
    },
    data
  };
}

export function formatNumber(value) {
  const val = (value / 1).toFixed().replace(",", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
