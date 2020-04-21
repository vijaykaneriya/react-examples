import React from 'react';

export const Registerchild = (props) => {
    let {email, password, emailerror, passwordError, handleInputChange, handlePostSubmit } = props
    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handlePostSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name='email' className="form-control" value={email} onChange={handleInputChange} />
                        <small id="titleHelp" className="form-text text-muted">{emailerror}</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name='password' onChange={handleInputChange} value={password} />
                        <small id="bodyHelp" className="form-text text-muted">{passwordError}</small>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
        
    )
}