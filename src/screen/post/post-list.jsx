import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { reqGetPostListData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { BlogListChild } from './post-child'



class PostList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            [Constants.KEY_POST_DATA]: undefined,
            [Constants.KEY_POST__USER_ID_DATA] : undefined,
            filterdata : undefined,
            postselectvalue : '',
           // filteredPost : undefined,
            filtervalue : false
            
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.props.reqGetPostListData();

        //const uniqueNames = this.state.name.filter((val,id,array) => array.indexOf(val) === id);


    }


    
    handleChange(event) {
        this.setState({
            postselectvalue: event.target.value,
            filtervalue: false
        });

        console.log("event.target.value", event.target.value);
        

        let postdatatmp = this.state[Constants.KEY_POST_DATA];

        console.log("postdatatmp", postdatatmp);
        

        let filteredPost = []

        if (event.target.value !== "All users post") {
            for (let index = 0; index < postdatatmp.length; index++) {

                const elementpost = postdatatmp[index];
    
               if (elementpost.userId == event.target.value) {
                    filteredPost.push(elementpost)
                    console.log("loop");
                }
            }
        } else {
            filteredPost = postdatatmp
        }

       

        console.log("filteredPost", filteredPost);

        this.setState({
            filterdata : filteredPost,
            filtervalue: true
        })
        

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE) && nextProps[Constants.KEY_RESPONSE] !== '') {
            if (nextProps[Constants.KEY_TYPE] === types.URL_POSTS && prevState.filtervalue !== true) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE];
                    if (Object.prototype.toString.call(obj) !== '[object Array]') { obj = [obj]; }
                    let userIDunique = []
                    for (let index = 0; index < obj.length; index++) {
                        const element = obj[index];
                        if (element.userId) {
                            userIDunique.push(element.userId)
                        }
                    }
                    let uniqueNames = userIDunique.filter((val, id, array) => {
                        return array.indexOf(val) == id;  
                     });
                    respObj = { [Constants.KEY_POST_DATA]: obj, filterdata : obj, [Constants.KEY_POST__USER_ID_DATA] : uniqueNames }
                }
            }
        }
        return respObj;
    }

    

    BlogDetailItem = (id) => {
        console.log("blogitem", id);
        
        this.props.history.push({
             pathname: Constants.SCREEN_POSTS + "/" + id,
            [Constants.KEY_POST_ID]: id
        })
    }
    addnewpost = () => {
        this.props.history.push({
            pathname: "post/add",
        })
    }
    editpostHandle = (item) => {
        this.props.history.push({
            pathname: "post/add",
            [Constants.KEY_POST_ID] : item
       })
    }
    deletepostHandle =(item) => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + item, {
            method: 'DELETE'
        })
        alert ("Delete item successfully " + item)
    }
    render() {

        

        

        return (
            <div className="content">
                <h3 className="page-title">Post List</h3>
                <div className="my-3 d-flex">
                    <span className="btn btn-primary link mr-5" onClick={this.addnewpost}>Add Post</span>
                    <div className="d-flex align-items-center ">
                        <span className="mr-3">
                            Select Post
                        </span>
                        <span>
                            <select className="form-control" value={this.state.postselectvalue} onChange={this.handleChange}> 
                                <option>All users post</option>
                                {
                                    this.state[Constants.KEY_POST__USER_ID_DATA] && this.state[Constants.KEY_POST__USER_ID_DATA].map ((item, index)=>
                                    <option key={index} value={item} >{item}</option>
                                    )
                                }
                            </select>
                        </span>
                    </div>
                </div>
                {
                    this.state.filterdata && this.state.filterdata.map((blogitem, index) =>
                        <BlogListChild
                            key={index}
                            blogtitle={blogitem.title}
                            blogcontent={blogitem.body}
                            goToDetail={()=>this.BlogDetailItem(blogitem.id)}
                            editpost={()=> this.editpostHandle(blogitem.id)}
                            deletepost={()=> this.deletepostHandle(blogitem.id)}
                           // goToComment={}
                        />
                    )
                }
            </div>
            
        )
    }
}

function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, {reqGetPostListData})(PostList);