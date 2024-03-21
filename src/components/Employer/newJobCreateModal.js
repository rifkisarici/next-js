import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import Input from "../Input";
import { useApiProgress } from '../../shared/ApiProgress';
import EmployerContext from "../../context/EmployerContext";
import { onChangeAllObject, searchItemSelect } from "../../shared/ComponentsEvent"
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;


const newJobCreateModal = () => {
    const empContext = useContext(EmployerContext);

    const handleClose = () => {
        empContext.toggleJobCreateModal();
    };

    const [error, setErrors] = useState(null);

    const [form, setForm] = useState({
        name: null,
    });

    const onChange = (event, selectName) => {
        onChangeAllObject(event, selectName, setForm)
    };

    return (<>
        <ModalStyled
            {...props}
            size="lg"
            centered
            show={gContext.signInModalVisible}
            onHide={gContext.toggleSignInModal}
        >
            <Modal.Body className="p-0">
                <button
                    type="button"
                    className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                    onClick={handleClose}
                >
                    <i className="fas fa-times"></i>
                </button>


            </Modal.Body>
        </ModalStyled >


    </>);
}

export default newJobCreateModal;