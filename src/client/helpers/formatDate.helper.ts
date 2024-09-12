import Handlebars from "handlebars";

Handlebars.registerHelper("formatDate", function (time: string) {
  const messageDate = new Date(time.split(" ")[0]);
  const now = new Date();
  const yesterday = new Date();
  const dayBeforeYesterday = new Date(now);

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const optionsWithYear: Intl.DateTimeFormatOptions = {
    ...options,
    year: "numeric",
  };

  const isSameDay = (date1: Date, date2: Date): boolean =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  yesterday.setDate(now.getDate() - 1);

  dayBeforeYesterday.setDate(now.getDate() - 2);

  if (isSameDay(messageDate, now)) {
    return "сегодня";
  } else if (isSameDay(messageDate, yesterday)) {
    return "вчера";
  } else if (isSameDay(messageDate, dayBeforeYesterday)) {
    return "позавчера";
  } else if (messageDate.getFullYear() === now.getFullYear()) {
    return messageDate.toLocaleDateString("ru-RU", options);
  } else {
    return messageDate.toLocaleDateString("ru-RU", optionsWithYear);
  }
});
