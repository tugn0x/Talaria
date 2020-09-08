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

export function formatDateTime(date, type) {
  switch(type){
    case 'en':
      return moment(date).format('YYYY-MM-DD HH:mm:ss');  
    break;
    case 'it':
      return moment(date).format('DD/MM/YYYY HH:mm:ss'); 
    break;
    default:  return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }
}
