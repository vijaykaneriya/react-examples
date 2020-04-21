import React from 'react';

export const UserChild = (props) => {

    let { userid, name, username, email, street, suite, city, zipcode, lat, lng, phone, website, companyname, catchPhrase,bs   } = props

    return (
        <div className="user-detail-wrap ">
            <div className="card">
                <div className="card-body">
                    <p className="mr-2 mb-0"><span>User ID :</span>{userid}</p>
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{username}</h6>
                    <p className="mr-2mb-2"><span className="font-weight-bold">Email : </span>{email}</p>
                    <div className="d-flex  mb-2">
                        <span className="font-weight-bold">Address : </span>
                        <div className="d-flex">
                            <p className="mb-0 no-wrap ml-1">{street},</p>
                            <p className="mb-0 no-wrap ml-1"> {suite},</p>
                            <p className="mb-0 no-wrap ml-1"> {city},</p>
                            <p className="mb-0 no-wrap ml-1"> {zipcode}</p>
                        </div>
                        
                    </div>
                    <div className="d-flex flex-column  mb-2">
                        <span className="font-weight-bold">
                            geo : 
                        </span>
                        <div className="d-flex flex-column ml-5">
                            <div className="d-flex">
                                <span className="font-weight-bold">lat : </span>
                                <span>{lat}</span>
                            </div>
                            <div className="d-flex">
                                <span  className="font-weight-bold">lng : </span>
                                <span>{lng}</span>
                            </div>
                        </div>
                    </div>
                    <p className="mr-2mb-2">
                        <span className="font-weight-bold">
                            Phone : 
                        </span>{phone}</p>
                    <p className="mr-2  mb-2"><span className="font-weight-bold">Website : </span>{website}</p>
                    <div className="d-flex flex-column">
                        <span className="font-weight-bold">
                        company : 
                        </span>
                        <div className="d-flex flex-column ml-5">
                            <div className="d-flex">
                                <span className="font-weight-bold">name : </span>
                                <span>{companyname}</span>
                            </div>
                            <div className="d-flex">
                                <span className="font-weight-bold">catchPhrase : </span>
                                <span>{catchPhrase}</span>
                            </div>
                            <div className="d-flex">
                                <span className="font-weight-bold">bs : </span>
                                <span>{bs}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const UserListChild = (props) => {

    let { userid, name, username, email, street, suite, city, userdetail } = props

    return (
        <div className="user-detail-wrap mb-3 col-4">
            <div className="card">
                <div className="card-body">
                    <p className="mr-2 mb-0"><span>User ID :</span>{userid}</p>
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{username}</h6>
                    <p className="mr-2 mb-0">{email}</p>
                    <div className="d-flex mb-2">
                        <p className="mb-0 no-wrap">{street},</p>
                        <p className="mb-0 no-wrap"> {suite},</p>
                        <p className="mb-0 no-wrap"> {city}</p>
                    </div>
                    <span className="link card-link text-primary" onClick={userdetail}>Read More Detail</span>
                </div>
            </div>
        </div>
    )
}

export const UseralbumsChild = (props) => {

    let { userId, id, title, content } = props

    return (
        <div className="user-detail-wrap col-4 mb-3">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                    <div className="d-flex mb-2">
                        <span className="mr-3 link" >User ID : {userId}</span>
                        <span className="mr-3">ID : {id}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export const UsertodosChild = (props) => {

    let { userId, id, title, completed } = props

    return (
        <div className="user-detail-wrap col-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="d-flex mb-2">
                        <span className="mr-3 link" >User ID : {userId}</span>
                        <span className="mr-3">ID : {id}</span>
                    </div>
                    <p><span>completed : </span>{completed ? "true" : "false"}</p>
                </div>
            </div>
        </div>
    )
}