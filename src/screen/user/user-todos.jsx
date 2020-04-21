import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { reqGetUserWisetodosData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { UsertodosChild } from './user-child'

let id = ''
class userwisetodos extends BaseComponent {
    constructor(props) {
        super(props);
        if (this.props.location[Constants.KEY_USER_ID]) {
            id = this.props.location[Constants.KEY_USER_ID]
            console.log("idid1", id);
            
        }
        this.state = {
            [Constants.KEY_USER_WISE_TODOS]: undefined,
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        if (!id) {
            id = params.id
            console.log("idid2", id);
        }
        this.props.reqGetUserWisetodosData({[Constants.KEY_ID] : id})
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE) && nextProps[Constants.KEY_RESPONSE] !== '') {
            if (nextProps[Constants.KEY_TYPE] === types.URL_TODOS) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE]
                    respObj = { [Constants.KEY_USER_WISE_TODOS]: obj }
                }
            }
        }
        return respObj;
    }

    render() {
        return (
            <div className="content">
                <h3 className="page-title">User todos</h3>
                <div className="row">
                    {
                        this.state[Constants.KEY_USER_WISE_TODOS] && this.state[Constants.KEY_USER_WISE_TODOS].map((item, index) => 
                            <UsertodosChild
                                key = {index}
                                userId = {item.userId}
                                id = {item.id}
                                title = {item.title}
                                completed = {item.completed}
                            />
                        )
                    }
                </div>
            </div>

            
        )
    }

}  


function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, {reqGetUserWisetodosData})(userwisetodos);