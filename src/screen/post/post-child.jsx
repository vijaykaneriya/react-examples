import React from 'react';

export const BlogListChild = (props)=> {
    let { blogtitle, blogcontent, goToDetail, editpost, deletepost} = props
    return (
        <div className="card mb-4" >
             <div className="card-body">
                <h5 className="card-title" onClick={goToDetail}>{blogtitle}</h5>
                <p className="card-text">{blogcontent}</p>
                <span className="link card-link text-primary" onClick={goToDetail}>Read More</span>
                <span className="link card-link text-primary" onClick={editpost}>Edit Post</span>
                <span className="link card-link text-primary" onClick={deletepost}>Delete</span>
             </div>
          
            
        </div>
    )

}

export const BlogDetailChild = (props)=> {
    let { blogtitle, blogcontent, bloguserid, blogid, userdetail } = props
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="d-flex mb-2">
                    <span className="mr-3 link" onClick={userdetail}>User ID : {bloguserid}</span>
                    <span className="mr-3">Post ID : {blogid}</span>
                </div>
                <h5 className="card-title">{blogtitle}</h5>
                <p className="card-text">{blogcontent}</p>
            </div>
        </div>
    )

}

export const BlogDetailCommentChild = (props)=> {
    let { postid, commmentid, commentname, commentemail, comment } = props
    return (
        <div className="col-4">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                        <span className="mr-3">Post ID : {postid}</span>
                        <span className="mr-3"> ID : {commmentid}</span>
                    </div>
                    <h6 className="card-title">{commentname}</h6>
                    <p className="card-subtitle mb-2 text-muted">{commentemail}</p>
                    <p className="card-text">{comment}</p>
                </div>
                
            </div>
        </div>
        
    )
}

export const BlogAddForm = (props) => {
    let {title, body, userId, titleerror, bodyError, idError, handleInputChange, handlePostSubmit } = props
    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handlePostSubmit}>
                    <div className="form-group">
                        <label>title</label>
                        <input type="text" name='title' className="form-control" value={title} onChange={handleInputChange} />
                        <small id="titleHelp" className="form-text text-muted">{titleerror}</small>
                    </div>
                    <div className="form-group">
                        <label>body</label>
                        <input className="form-control" name='body' onChange={handleInputChange} value={body} />
                        <small id="bodyHelp" className="form-text text-muted">{bodyError}</small>
                    </div>
                    <div className="form-group">
                        <label>userId</label>
                        <input type="number" className="form-control" name='userId' onChange={handleInputChange} value={userId}/>
                        <small id="userIdHelp" className="form-text text-muted">{idError}</small>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
        
    )
}