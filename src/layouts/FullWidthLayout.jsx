import React from 'react';  
import { Route } from 'react-router-dom';  
  
const FullWidthLayout = ({ children }) => (                         
    <div>  
      {children}                                       
    </div>  
  );  
  
  const FullWidthLayoutRoute = ({component: Component, ...rest}) => {  
    return (  
      <Route {...rest} render={matchProps => (  
        <FullWidthLayout>  
            <Component {...matchProps} />  
        </FullWidthLayout>  
      )} />  
    )  
  };  
  
export default FullWidthLayoutRoute;  