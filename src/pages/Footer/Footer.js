import React from "react";
import {   MDBContainer,  MDBFooter } from "mdbreact";


function Footer() {

  return(
    <div className=" ">
    <MDBFooter style={{background:"#357a6b"}} className="font-small  mt-5 ">  
      <div className="footer-copyright text-center py-5">
        <MDBContainer   >
            <a class="text-white" >
              &copy; {new Date().getFullYear()} Copyright: David Álvarez   Cristhian Sancho 
                Douglas Díaz
            </a>
        </MDBContainer>
      </div>  
    </MDBFooter>
    </div>
  )  
}

export default Footer
