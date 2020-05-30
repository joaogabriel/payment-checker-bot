const format = require('date-fns/format');
const dateFnsLocale = require('date-fns/locale');

exports.getTodayMonthAndYear = () => {
    return format(new Date(), 'MMMM/yy', { locale: dateFnsLocale.ptBR });
}

exports.getTodayComplete = () => {
    return format(new Date(), 'dd/MM/yyyy', { locale: dateFnsLocale.ptBR });
}