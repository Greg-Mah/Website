import React from "react"
import { useLocation } from "react-router-dom";

const Component404=()=>
{
    const url=useLocation();
    return <div className="404">
        <h1>404 Error: Page for {url.pathname} does not exist.</h1>
    </div>
}

export default Component404;