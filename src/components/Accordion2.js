import React, { useContext, useState } from "react";
import 'react-bootstrap-accordion/dist/index.css';
import Accordion from 'react-bootstrap/Accordion';

const Accordion2 = ({ tittle, onChange, name, eventKey, defaultValue }) => {
    return (<>
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>{tittle}</Accordion.Header>
            <Accordion.Body>
                <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                    <textarea
                        name={name}
                        id="skillTextarea"
                        cols="30"
                        rows="4"
                        className="border border-mercury text-gray w-100 pt-4 pl-6"
                        placeholder="Briefly describe where you acquired this skill."
                        defaultValue={defaultValue}
                        onChange={onChange}
                    >
                    </textarea>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    </>);
}

export default Accordion2;