import React from 'react';

function SPIDButton() {            
  /* todo: trovare il modo di includere anche il CSS + JS in webpack altrimenti non va 
  utils/spid-smart-button/dist/spid-button.min.js + css
  */
/*
  SPID.init({
    selector: 'custom-spid-btn',
    lang: 'it',
    url: '/iam/Login1?target=https://devnilde.bo.cnr.it/whoami&entityID={{idp}}',
    supported: ['http://spid-idp.inkode.it:8088'],
    extraProviders: [
        { "entityID": "http://spid-idp.inkode.it:8088", "entityName": "Test IdP", "active": true }
    ]
  }); */

  return (      
    <div>          
      <div id="custom-spid-btn">
          custom SPID button (non va)      
      </div>
    </div>
  );
}

export default SPIDButton;
