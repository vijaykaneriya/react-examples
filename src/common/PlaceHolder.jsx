import React from 'react';
import ContentLoader from 'react-content-loader';
import { isMobile } from "react-device-detect";

export const HeaderLoader = () => {
  if(isMobile){
    return (
      <ContentLoader 
              height={215}
              width={1024}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="389" /> 


  </ContentLoader>
    )
  } else {
    return (
      <ContentLoader 
            height={500}
            width={1920}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
      >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="500" /> 


      </ContentLoader>
    )
  }
}