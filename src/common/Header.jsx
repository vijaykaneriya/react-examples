import React from 'react';
import { Container } from 'react-bootstrap';

export const Header = (props)=> {
    
    return (
        <div className="bg-dark py-3">
            <Container> 
                <h2 className="text-white">
                    Brand Logo
                </h2>     
            </Container>
        </div>
    )
}
