import React, { useState, useEffect } from "react";
const CandidateContext = React.createContext();
import { useTranslation } from 'react-i18next';

const CandidateProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        username: undefined,
        lastName: undefined,
        token: undefined,
        isLoggedIn: false,
        userRole: undefined,
    });

    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const toggleAboutModal = () => {
        setAboutModalVisible(!aboutModalVisible);
    };

    const [educationModalVisible, setEducationModalVisible] = useState(false);
    const toggleEducationModal = () => {
        setEducationModalVisible(!educationModalVisible);
    };

    const [workExperienceModalVisible, setworkExperienceModalVisible] = useState(false);
    const toggleWorkExperienceModal = () => {
        setworkExperienceModalVisible(!workExperienceModalVisible);
    };

    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const toggleLanguageModal = () => {
        setLanguageModalVisible(!languageModalVisible);
    };

    const [skillModalVisible, setSkillModalVisible] = useState(false);
    const toggleSkillModal = () => {
        setSkillModalVisible(!skillModalVisible);
    };

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    return (
        <CandidateContext.Provider

            value={{
                t, i18n,
                toggleAboutModal, aboutModalVisible,
                toggleEducationModal, educationModalVisible,
                toggleLanguageModal, languageModalVisible,
                toggleSkillModal, skillModalVisible,
                toggleWorkExperienceModal, workExperienceModalVisible,
                setCurrentUser, currentUser,
            }}
        >
            {children}
        </CandidateContext.Provider>
    )
};

export default CandidateContext;
export { CandidateProvider };