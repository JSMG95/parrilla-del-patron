import React from 'react';

const divStyles = {
  padding: '1em 2em',
  textAlign: 'center'

}

const iconStyles = {
  fontSize: '3.2em',
  marginBottom: '.25em',
  lineHeight: 0,
  marginTop: '30px'
}

const NotFound = () => (


  <div style={divStyles}>
    <i className='material-icons icn-error' style={iconStyles}>error_outline</i>
    <h2>Page Not Found</h2>
  </div>
);

export default NotFound;