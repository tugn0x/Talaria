import React from 'react';

function Fake(props) {
  console.log('Fake',props)

  

  return (
      <div class="fake">
        <h4>fake component</h4>
        <p>bla bla bla</p>
        {props.match && <p>
          URL:{props.match.url}<br/>
          PATH:{props.match.path}<br/>             
        </p>}
      </div>
    
  );
}

export default Fake;