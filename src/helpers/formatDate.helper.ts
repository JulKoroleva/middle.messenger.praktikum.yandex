import Handlebars from "handlebars";

// Регистрация хелпера formatDate
Handlebars.registerHelper("formatDate", function (time: string) {
    const date = new Date(time);
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();
    const day = date.getDate();
    const monthNames = [
        "января", "февраля", "марта", "апреля", "мая", "июня", 
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const month = monthNames[date.getMonth()];

    // Если год текущий, не выводим его
    if (year === currentYear) {
        return `${day} ${month}`;
    } else {
        // Если год предыдущий, выводим год
        return `${day} ${month} ${year}`;
    }
});
