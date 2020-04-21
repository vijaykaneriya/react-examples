import React from 'react';
import * as Constants from '../../utils/Constants';
import { connect } from 'react-redux';
import { reqPostRegisterData } from '../../actions/ApiCalling'
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import { Registerchild } from './register-child';
import * as Utility from './../../utils/Utility'


class Register extends BaseComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            email : '',
            password : '',
            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
    }
    componentDidMount() {
      //  this.props.reqPostRegisterData()
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

       // let emailerror = Utility.isValidName(this.state.email);
      //  let passwordError = Utility.isValidName(this.state.password);

        // this.props.reqPostRegisterData({
        //     email: this.state.email,
        //    password: this.state.password,

        // });


        const requestOption = {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: this.state.email,
                password:  this.state.password,
            })
        }
        fetch('https://reqres.in/api/register', requestOption)
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


    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE) && nextProps[Constants.KEY_RESPONSE] !== '') {
            if (nextProps[Constants.KEY_TYPE] === types.URL_REGISTER) {
                if (nextProps[Constants.KEY_RESPONSE]) {
                    let obj = nextProps[Constants.KEY_RESPONSE]
                   // respObj = { [Constants.KEY_USER_DETAIL]: obj }
                }
            }
        }
        return respObj;
    }

    render() {
        return(
            <div className="content">
                <h3 className="page-title">Register</h3>
                <Registerchild 
                    email = {this.state.email}
                    password = {this.state.password}
                  //  emailerror = { this.state.Postadd[Constants.KEY_TITLE_ERROR]}
                  //  passwordError = { this.state.Postadd[Constants.KEY_BODY_ERROR]}
                    handleInputChange = {this.handleInputChange}
                    handlePostSubmit = {this.handlePostSubmit}
                
                />
               
            </div>
        )
    }



}



function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, {reqPostRegisterData})(Register);