import React from 'react';
import ImageLoader from 'react-imageloader';

import * as ResourcesConstants from '../res/ResourcesConstants';

export const CommonImageLoder = (props)=>
{

    return (  <ImageLoader className={props.className?props.className:"img-fluid"}
        src={props.src?props.src:ResourcesConstants.fallback}
        wrapper={props.wrapper?props.wrapper:React.createFactory('div')}
     
        >
            
          <img className={props.className?props.className:"img-fluid"} 
         alt="" src={ResourcesConstants.fallback} />
       
</ImageLoader>)
}

export const CommonAuthorImageLoder = (props)=>
{

    return (  <ImageLoader className={props.className?props.className:"img-fluid"}
        src={props.src?props.src:ResourcesConstants.noAvatar}
        wrapper={props.wrapper?props.wrapper:React.createFactory('div')}
        >
          <img className={props.className?props.className:"img-fluid"} 
         alt="" src={ResourcesConstants.noAvatar} />
       
</ImageLoader>)
}
