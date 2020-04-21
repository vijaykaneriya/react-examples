import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'

class BaseComponent extends Component {
  strings(name) {
    if (name !== undefined)
      return <FormattedMessage
        id={name}
      />
  };

  goBack = () => { window.history.back(); }
}
export default BaseComponent;
