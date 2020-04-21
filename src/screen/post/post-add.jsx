import React from 'react';
import * as Constants from '../../utils/Constants';
import * as ApiUrls from './../../actions/ApiUrls';
import { connect } from 'react-redux';
import { reqGetPostDetailData, reqGetPostCommentData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { BlogAddForm } from './post-child';
import * as Utility from './../../utils/Utility'

let id = ''



class postAdd extends BaseComponent {
    constructor(props) {
        super(props);
        if (this.props.location[Constants.KEY_POST_ID]) {
            id = this.props.location[Constants.KEY_POST_ID];
            console.log("id123",id );
        }
        this.state = {
            title : '',
            body : '',
            userId : '',
            Postadd : [],
            errorMessage : '',
            Editmode : false,
            EditID : ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.location[Constants.KEY_POST_ID]) {
            this.getPostEditdata(id);
            this.setState({
                EditID : id
            })
            console.log("id here", id);
            
        }
    }
    getPostEditdata (id) {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id)
        .then(response => response.json())
        .then(json => 
            
            this.setState({
                title : json.title,
                body :  json.body,
                userId : json.userId,
                Editmode : true
            })
        )
       
    }
    handleInputChange (event) {
        const target = event.target;
        const value = target.value
        const name = target.name;
        this.setState({
            [name] : value
        })
    }

    handlePostSubmit =(event)=> {

        event.preventDefault();
        let TitleError = Utility.isValidName(this.state.title);
        let BodyError = Utility.isValidName(this.state.body);
        let IdError = Utility.isValidID(this.state.userId);

        if ( TitleError <= 0 && BodyError <= 0 && IdError <= 0 ) {

            if (this.state.Editmode === true) {
                const requestOption = {
                    method : 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        title: this.state.title,
                        body:  this.state.body,
                        userId:  this.state.userId,
                    })
                }
                fetch('https://jsonplaceholder.typicode.com/posts/' + this.state.EditID, requestOption)
                .then(async response => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    console.log("update blog", response);
                    
                    this.setState({ Postadd : data })
                    //this.submitpostdatasuccess();
                })
                .catch(error => {
                    this.setState({ errorMessage: error });
                    console.error('There was an error!', error);
                });
            } else {
                const requestOption = {
                    method : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        title: this.state.title,
                        body:  this.state.body,
                        userId:  this.state.userId,
                    })
                }
        
                fetch('https://jsonplaceholder.typicode.com/posts', requestOption)
                .then(async response => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
    
                    this.setState({ Postadd : data })
                    this.submitpostdatasuccess();
                })
                .catch(error => {
                    this.setState({ errorMessage: error });
                    console.error('There was an error!', error);
                });
            }

        } else {
            let blogAddTmp = this.state.Postadd;
            blogAddTmp[Constants.KEY_TITLE_ERROR] = TitleError;
            blogAddTmp[Constants.KEY_BODY_ERROR] = BodyError;
            blogAddTmp[Constants.KEY_ID_ERROR] = IdError

            this.setState({
                Postadd : blogAddTmp
            })
        }
    }

    submitpostdatasuccess =()=> {
        this.setState({
            title: '',
            body:  '',
            userId:  ''
        });
        alert("post submitted successfully")
    }

    render() {
        return(
            <div className="content">
                <h3 className="page-title">Post Add</h3>
                <BlogAddForm 
                    title = {this.state.title}
                    body = {this.state.body}
                    userId = {this.state.userId}
                    titleerror = { this.state.Postadd[Constants.KEY_TITLE_ERROR]}
                    bodyError = { this.state.Postadd[Constants.KEY_BODY_ERROR]}
                    idError= { this.state.Postadd[Constants.KEY_ID_ERROR] }
                    handleInputChange = {this.handleInputChange}
                    handlePostSubmit = {this.handlePostSubmit}
                
                />
                <span>{this.state.postAdd}</span>
                <p>{this.state.Postadd[Constants.KEY_TITLE_ERROR]}</p>
            </div>
        )
    }
}

function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, {})(postAdd);