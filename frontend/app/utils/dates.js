import moment from 'moment/min/moment-with-locales'
import { useIntl } from 'react-intl';

export function formatDate(date) {
  let intl=useIntl();
  let mymoment=moment(date)
  if(mymoment.isValid())
  {
    mymoment.locale(intl.locale)
    return mymoment.utc().local().format('L');
  }
  return '';
}

//NB: tutte le date ricevute dal frontend saranno in UTC (laravel le salva cosi)
//quindi occorre trasformarle nel localtime dell'utente
export function formatDateTime(date/*, type*/) {
  let intl=useIntl();
  let mymoment=moment(date)
  if(mymoment.isValid())
  {
    mymoment.locale(intl.locale)
    return mymoment.utc().local().format('L LT');  
  }
  
  return '';
}

export function daysFromToday(date) {  
  var given = moment(date, "YYYY-MM-DD hh:mm:ss");
  var current = moment();

  //Difference in number of days
  if(current.isValid() && given.isValid()) return current.diff(given,'days');

  return 0;
}
