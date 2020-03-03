import moment from 'moment'

export const formatDate = (date, locale) => {
    switch(locale){
        case "it":
            return moment(date).format("DD/MM/YYYY");
            break;
        case "en":
            return moment(date).format("MM/DD/YYYY");
            break;
        default:
            return moment(date).format("MM/DD/YYYY");
            break;
    }
}