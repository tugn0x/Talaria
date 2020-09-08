import moment from "moment";

export function formatDate(date, type) {
  switch(type){
    case 'en':
      return moment(date).format('YYYY-MM-DD');  
    break;
    case 'it':
      return moment(date).format('DD/MM/YYYY');  
    break;
    default:  return moment(date).format('YYYY-MM-DD');
  }
}

//NB: tutte le date ricevute dal frontend saranno in UTC (laravel le salva cosi)
//quindi occorre trasformarle nel localtime dell'utente
export function formatDateTime(date, type) {
  switch(type){
    case 'en':
      return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');  
    break;
    case 'it':
      return moment.utc(date).local().format('DD/MM/YYYY HH:mm:ss'); 
    break;
    default:  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
  }
}
