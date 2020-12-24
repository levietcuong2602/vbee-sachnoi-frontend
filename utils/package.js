export function setStringPackage(name) {
  if (name === "") {
    return name;
  } else {
    switch (name) {
      case "Gói TTS1":
        return "TTS1";
      case "Gói TTS7":
        return "TTS7";
      case "Gói TTS30":
        return "TTS30";
      case "Gói TTSVIP30":
        return "TTSVIP30";
      case "Gói TTSVIP45":
        return "TTSVIP45";
      case "Gói TTSVIP60":
        return "TTSVIP60";
      case "Gói miễn phí":
        return "miễn phí";
    }
  }
}
export function setTradCode(
  namePacake = "vbee",
  number = "0988123456",
  userName
) {
  const radomNumber = Math.floor(Math.random() * 999);
  var day = new Date().getDate().toString();
  var month = (new Date().getMonth() + 1).toString();
  var year = new Date()
    .getFullYear()
    .toString()
    .slice(2);
  var hour = new Date().getHours().toString();
  var min = new Date().getMinutes().toString();
  const stringDate = day + month + year + hour + min;
  const string = `${namePacake}${stringDate}_${radomNumber}`;
  if (namePacake !== undefined) {
    return string.toUpperCase();
  }
  return userName;
}
