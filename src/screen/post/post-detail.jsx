import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { reqGetPostDetailData, reqGetPostCommentData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { BlogDetailChild, BlogDetailCommentChild } from './post-child';
let id = ''
class postDetail extends BaseComponent {
    constructor(props) {
        super(props);
        if (this.props.location[Constants.KEY_POST_ID]) {
            id = this.props.location[Constants.KEY_POST_ID]
        }
        this.state = {
            [Constants.KEY_POST_DETAIL_DATA] : undefined,
            [Constants.KEY_POST_COMMENT_DATA] : undefined,
            showComment : false
           
        }
        
    }
    componentDidMount() {
        const { params } = this.props.match;
        if (!id) {
            id = params.id
        }
        this.props.reqGetPostDetailData({[Constants.KEY_ID] : id});
       
        
    }

    showCommenthandle = () => {
        const { params } = this.props.match;
        if (!id) {
            id = params.id
        }
        this.props.reqGetPostCommentData({[Constants.KEY_ID] : id});
        this.setState({
            showComment: this.state.showComment ? false : true
        })
    }

    postlist =()=> {
        this.props.history.push({
            pathname: Constants.SCREEN_POSTS,
       })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE) && nextProps[Constants.KEY_RESPONSE] !== '') {
            if (nextProps[Constants.KEY_TYPE] === types.URL_DETAIL) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE]
                    respObj = { [Constants.KEY_POST_DETAIL_DATA]: obj }
                }
            } else if (nextProps[Constants.KEY_TYPE] === types.URL_COMMENT && prevState.showComment !== false) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE]
                    if (Object.prototype.toString.call(obj) !== '[object Array]') { obj = [obj]; }
                    respObj = { [Constants.KEY_POST_COMMENT_DATA]: obj }
                    console.log("calll");
                    
                }
            }
        }
        return respObj;
    }

 

    render() {
        return (
            <div className="content">
                <h3 className="page-title">Post Detail</h3>
                {
                    this.state[Constants.KEY_POST_DETAIL_DATA] && 
                        <BlogDetailChild 
                            bloguserid={ this.state[Constants.KEY_POST_DETAIL_DATA].userId}
                            blogid={ this.state[Constants.KEY_POST_DETAIL_DATA].id}
                            blogtitle={ this.state[Constants.KEY_POST_DETAIL_DATA].title}
                            blogcontent={ this.state[Constants.KEY_POST_DETAIL_DATA].body}
                            userdetail = { () => {
                                    this.props.history.push({
                                        pathname: Constants.SCREEN_USERS + "/" + this.state[Constants.KEY_POST_DETAIL_DATA].userId,
                                        [Constants.KEY_USER_ID]: this.state[Constants.KEY_POST_DETAIL_DATA].userId
                                    })
                                }
                            }
                        />
                }

                <div className="">
                    <div>
                        <span className="btn btn-outline-primary" onClick={this.showCommenthandle}>
                            { this.state.showComment ? "Hide Comment" : "Show Comment" }
                        </span>
                        <span className="btn btn-outline-primary ml-3" onClick={this.postlist}>
                            Back to post list
                        </span>
                    </div>
                    

                    {
                        this.state.showComment && 
                            <div className="mt-4">
                                <div className="row">
                                    {
                                        this.state[Constants.KEY_POST_COMMENT_DATA] && this.state[Constants.KEY_POST_COMMENT_DATA].map((item,index)=> 
                                            <BlogDetailCommentChild 
                                            key = {index}
                                            postid={item[Constants.KEY_COMMENT_POST_ID]}
                                            commmentid={item[Constants.KEY_ID]}
                                            commentname={item[Constants.KEY_NAME]}
                                            commentemail={item[Constants.KEY_EMAIL]}
                                            comment={item[Constants.KEY_BODY]}
                                            
                                            />
                                        )
                                    }
                                </div>
                        </div>
                    }
                
                 </div>

                    
                
            </div>
        )
    }


}

function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, {reqGetPostDetailData, reqGetPostCommentData})(postDetail);