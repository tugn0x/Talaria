import React from 'react';

function Fake(props) {
  console.log('Fake',props)

  

  return (
      <div className="fake">
        <h4>fake component</h4>
        <p>bla bla bla</p>
        {props.history && props.history.location &&
          <p>Location: {props.history.location.pathname}{props.history.location.search}</p>
        }
        {props.match && <p>
          URL:{props.match.url}<br/>
          PATH:{props.match.path}<br/>             
        </p>}
      </div>
    
  );
}

export default Fake;