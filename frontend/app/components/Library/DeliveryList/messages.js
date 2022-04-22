import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeliveryList';

export default defineMessages({  
  ResetAll: {
    id: `app.global.resetAll`,
  },  

  DeliveryNotFound: {
    id: `${scope}.DeliveryNotFound`,
    defaultMessage: 'Delivery not found',
  },
});

