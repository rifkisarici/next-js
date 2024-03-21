import React, { useState, useEffect } from "react";
const EmployerContext = React.createContext();
import { useTranslation } from 'react-i18next';

const EmployerProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        username: undefined,
        lastName: undefined,
        token: undefined,
        isLoggedIn: false,
        userRole: undefined,
    });

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const toggleAboutModal = () => {
        setAboutModalVisible(!aboutModalVisible);
    };

    const [educationModalVisible, setEducationModalVisible] = useState(false);
    const toggleEducationModal = () => {
        setEducationModalVisible(!educationModalVisible);
    };

    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const toggleLanguageModal = () => {
        setLanguageModalVisible(!languageModalVisible);
    };

    const [skillModalVisible, setSkillModalVisible] = useState(false);
    const toggleSkillModal = () => {
        setSkillModalVisible(!skillModalVisible);
    };

    const [educateForm, setEducateForm] = useState({})

    const [positionModalVisible, setPositionModalVisible] = useState(false);
    const togglePositionModal = () => {
        setPositionModalVisible(!positionModalVisible);
    };

    const [techModalVisible, setTechModalVisible] = useState(false);
    const toggleTechModal = () => {
        setTechModalVisible(!techModalVisible);
    };

    const [langModalVisible, setLangModalVisible] = useState(false);
    const toggleLangModal = () => {
        setLangModalVisible(!langModalVisible);
    };

    const [milModalVisible, setMilModalVisible] = useState(false);
    const toggleMilModal = () => {
        setMilModalVisible(!milModalVisible);
    };

    const [typeModalVisible, setTypeModalVisible] = useState(false);
    const toggleTypeModal = () => {
        setTypeModalVisible(!typeModalVisible);
    };

    const [travelModalVisible, setTravelModalVisible] = useState(false);
    const toggleTravelModal = () => {
        setTravelModalVisible(!travelModalVisible);
    };

    const [expModalVisible, setExpModalVisible] = useState(false);
    const toggleExpModal = () => {
        setExpModalVisible(!expModalVisible);
    };

    const [jobCreateModalVisible, setJobCreateModalVisible] = useState(false);
    const toggleJobCreateModal = () => {
        setJobCreateModalVisible(!jobCreateModalVisible);
    };

    

    return (
        <EmployerContext.Provider

            value={{
                t, i18n,
                setCurrentUser, currentUser,
                toggleAboutModal, aboutModalVisible,
                toggleEducationModal, educationModalVisible,
                toggleLanguageModal, languageModalVisible,
                toggleSkillModal, skillModalVisible,
                setEducateForm, educateForm,
                togglePositionModal, positionModalVisible,
                toggleTechModal, techModalVisible,
                toggleLangModal, langModalVisible,
                toggleMilModal, milModalVisible,
                toggleTypeModal, typeModalVisible,
                toggleTravelModal, travelModalVisible,
                toggleExpModal, expModalVisible,
                toggleJobCreateModal, jobCreateModalVisible,
            }}
        >
            {children}
        </EmployerContext.Provider>
    )
};

export default EmployerContext;
export { EmployerProvider };
