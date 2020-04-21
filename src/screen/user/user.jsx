import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { reqGetUserData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { UserChild } from './user-child'

let id = ''

class userDetail extends BaseComponent {
    constructor(props) {
        super(props);
        if (this.props.location[Constants.KEY_USER_ID]) {
            id = this.props.location[Constants.KEY_USER_ID]
        }
        this.state = {
            [Constants.KEY_USER_DETAIL] : undefined,
            userId : ''
        }
    }
    componentDidMount() {
        const { params } = this.props.match;
        if (!id) {
            id = params.id
        }
        this.setState({
            userId : id
        })
        this.props.reqGetUserData({[Constants.KEY_ID] : id})
    }

    useralumbHandle =(id)=> {
        this.props.history.push({
            pathname: Constants.SCREEN_USERS + "/" + id + "/albums",
            [Constants.KEY_USER_ID]: id
        })
    }

    usertodosHandle =(id)=> {
        this.props.history.push({
            pathname: Constants.SCREEN_USERS + "/" + id + "/todos",
            [Constants.KEY_USER_ID]: id
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE) && nextProps[Constants.KEY_RESPONSE] !== '') {
            if (nextProps[Constants.KEY_TYPE] === types.URL_USERS) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE]
                    respObj = { [Constants.KEY_USER_DETAIL]: obj }
                }
            }
        }
        return respObj;
    }
    
    render() {
        return (
            <div className="content">
                <h3 className="page-title">User Detail</h3>
                {
                    this.state[Constants.KEY_USER_DETAIL] && 
                    <UserChild 
                        userid={this.state[Constants.KEY_USER_DETAIL][Constants.KEY_ID]}
                        name={this.state[Constants.KEY_USER_DETAIL][Constants.KEY_NAME]}
                        username={this.state[Constants.KEY_USER_DETAIL][Constants.KEY_USERNAME]}
                        email={this.state[Constants.KEY_USER_DETAIL][Constants.KEY_EMAIL]}
                        street={this.state[Constants.KEY_USER_DETAIL][Constants.KEY_ADDRESS][Constants.KEY_STREET]}
                        suite={this.state[Constants.KEY_USER_DETAIL][Constants.KEY_ADDRESS][Constants.KEY_SUITE]}
                        city={this.state[Constants.KEY_USER_DETAIL][Constants.KEY_ADDRESS][Constants.KEY_CITY]}
                        zipcode = {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_ADDRESS][Constants.KEY_ZIPCODE]}
                        lat = {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_ADDRESS][Constants.KEY_GEO][Constants.KEY_LAT]}
                        lng = {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_ADDRESS][Constants.KEY_GEO][Constants.KEY_LNG]}
                        phone = {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_PHONE]}
                        website = {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_WEBSITE]}
                        companyname =  {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_COMPANY][Constants.KEY_COMPANY_NAME]}
                        catchPhrase = {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_COMPANY][Constants.KEY_CATCHPHRASE]}
                        bs =  {this.state[Constants.KEY_USER_DETAIL][Constants.KEY_COMPANY][Constants.KEY_BS]}
                    />
                }
                <div className="my-3">
                    <span className="btn btn-outline-primary" onClick={()=>this.useralumbHandle(this.state.userId)}>Alumbs</span>
                    <span className="btn btn-outline-primary ml-3" onClick={()=>this.usertodosHandle(this.state.userId)}>Todos</span>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, {reqGetUserData})(userDetail);