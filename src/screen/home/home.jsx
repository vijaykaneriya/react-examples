import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';

import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';



class DefaultScreen extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            "home": "homepage",
        }
    }
    render() {

        return (
            <h3>home page content</h3>
        )
    }
}

function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps)(DefaultScreen);