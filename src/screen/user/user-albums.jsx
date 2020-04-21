import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { reqGetUserWiseAlbumData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { UseralbumsChild } from './user-child'

let id = ''
class userwisealbum extends BaseComponent {
    constructor(props) {
        super(props);
        if (this.props.location[Constants.KEY_USER_ID]) {
            id = this.props.location[Constants.KEY_USER_ID]
            console.log("idid1", id);
            
        }
        this.state = {
            [Constants.KEY_USER_WISE_ALBUMS]: undefined,
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        if (!id) {
            id = params.id
            console.log("idid2", id);
        }
        this.props.reqGetUserWiseAlbumData({[Constants.KEY_ID] : id})
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE) && nextProps[Constants.KEY_RESPONSE] !== '') {
            if (nextProps[Constants.KEY_TYPE] === types.URL_ALBUMS) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE]
                    respObj = { [Constants.KEY_USER_WISE_ALBUMS]: obj }
                }
            }
        }
        return respObj;
    }

    render() {
        return (
            <div className="content">
                <h3 className="page-title">User Albums</h3>
                <div className="row">
                    {
                        this.state[Constants.KEY_USER_WISE_ALBUMS] && this.state[Constants.KEY_USER_WISE_ALBUMS].map((item, index) => 
                            <UseralbumsChild
                                key = {index}
                                userId = {item.userId}
                                id = {item.id}
                                title = {item.title}
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

export default connect(mapStateToProps, {reqGetUserWiseAlbumData})(userwisealbum);