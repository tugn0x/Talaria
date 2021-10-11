import moment from "moment";
import { useIntl } from 'react-intl';

export function formatDate(date/*, type*/) {
  /*switch(type){
    case 'en':
      return moment(date).format('YYYY-MM-DD');  
    break;
    case 'it':
      return moment(date).format('DD/MM/YYYY');  
    break;
    default:  return moment(date).format('YYYY-MM-DD');
  }*/  
  let intl=useIntl();
  let mymoment=moment(date)
  mymoment.locale(intl.locale)
  return mymoment.utc().local().format('L');
}

//NB: tutte le date ricevute dal frontend saranno in UTC (laravel le salva cosi)
//quindi occorre trasformarle nel localtime dell'utente
export function formatDateTime(date/*, type*/) {
  /*switch(type){
    
    case 'en':
      return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');  
    break;
    case 'it':
      return moment.utc(date).local().format('DD/MM/YYYY HH:mm:ss'); 
    break;
    default:  return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss');
  }*/    
  let intl=useIntl();
  let mymoment=moment(date)
  mymoment.locale(intl.locale)
  return mymoment.utc().local().format('L LT');
}

export function daysFromToday(date) {  
  var given = moment(date, "YYYY-MM-DD hh:mm:ss");
  var current = moment();

  //Difference in number of days
  return current.diff(given,'days');
}
