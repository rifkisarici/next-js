import Info from "../assets/Info.ico";
import React, { useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const Label = ({ title,text, info }) => {

  

    return (<>
        <label
            className="text-black-2 font-size-4 font-weight-semibold mb-4"  >
            {title}{"  "}
        </label>
        <label
            >
            {text}{"  "}
        </label>
        &nbsp;&nbsp;

        {info &&
            <OverlayTrigger
                //trigger="click"
                placement="right" 
                               
                overlay={
                    <Popover id="popover-contained" style={{backgroundColor:'lemonchiffon' }}>
                        {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
                        <Popover.Body  >
                            {info}      
                            
                        </Popover.Body>
                    </Popover>
                }
            >
                <img className="" src={Info.src} alt="" width="20" height="20" />
            </OverlayTrigger>
        }
    </>);
}

export default Label;