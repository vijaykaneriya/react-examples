import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { reqGetUserListData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { UserListChild } from './user-child'


class userList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            [Constants.KEY_USER_LIST]: undefined,
        }
    }
    componentDidMount(){
        this.props.reqGetUserListData()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE) && nextProps[Constants.KEY_RESPONSE] !== '') {
            if (nextProps[Constants.KEY_TYPE] === types.URL_USERS_LIST) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE];
                    if (Object.prototype.toString.call(obj) !== '[object Array]') { obj = [obj]; }
                    respObj = { [Constants.KEY_USER_LIST]: obj }
                    console.log("URL_USERS_LIST", respObj);
                    
                }
            }
        }
        return respObj;
    }

    render() {
        return (
            <div className="content">
                <h3 className="page-title">User List</h3>
                <div className="row">
                    {
                        this.state[Constants.KEY_USER_LIST] && this.state[Constants.KEY_USER_LIST].map((item,index)=>
                            <UserListChild
                                key={index}
                                userid={item[Constants.KEY_ID]}
                                name={item[Constants.KEY_NAME]}
                                username={item[Constants.KEY_USERNAME]}
                                email={item[Constants.KEY_EMAIL]}
                                street={item[Constants.KEY_ADDRESS][Constants.KEY_STREET]}
                                suite={item[Constants.KEY_ADDRESS][Constants.KEY_SUITE]}
                                city={item[Constants.KEY_ADDRESS][Constants.KEY_CITY]}
                                userdetail = { () => {
                                    this.props.history.push({
                                        pathname: Constants.SCREEN_USERS + "/" + item[Constants.KEY_ID],
                                        [Constants.KEY_USER_ID]: item[Constants.KEY_ID]
                                    })
                                }
                            }
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

export default connect(mapStateToProps, {reqGetUserListData})(userList);