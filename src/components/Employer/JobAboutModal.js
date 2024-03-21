import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import EmployerContext from "../../context/EmployerContext";

import styled from "styled-components";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const JobAboutModal = (props) => {
    const empContext = useContext(EmployerContext);

    const [error, setErrors] = useState(null);

    const [modalAboutText, setModalAboutText] = useState();
    const onChange = (event) => {
        setModalAboutText(event.target.value);
    };

    const onClickSave = async event => {

        //try catch ApiProgress gerekli

        props.setAboutText(modalAboutText)
        handleClose()
    }

    const handleClose = () => {
        empContext.toggleAboutModal();
    };

    return (
        <ModalStyled
            size="lg"
            centered
            show={empContext.aboutModalVisible}
            onHide={empContext.toggleAboutModal}
        >

            <Modal.Body className="p-0">
                <button
                    type="button"
                    className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                    onClick={handleClose}
                >
                    <i className="fas fa-times"></i>
                </button>

                <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                    <textarea
                        name="textarea"
                        id="aboutTextarea"
                        cols="30"
                        rows="7"
                        className="border border-mercury text-gray w-100 pt-4 pl-6"
                        placeholder="Write your explanations about the job posting in this field."
                        defaultValue={props.aboutText}
                        onChange={onChange}
                        maxLength={3000}
                    ></textarea>
                    <Button onClick={(e) => { e.preventDefault(); onClickSave(); }}>save</Button>
                </div>
                
            </Modal.Body>
        </ModalStyled>);
}

export default JobAboutModal;