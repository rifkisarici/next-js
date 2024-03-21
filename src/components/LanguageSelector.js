import { React, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';
import en from "../assets/en-flag.ico";
import tre from "../assets/tr-flag.ico";
import Image from 'react-bootstrap/Image'
const FlagButton = (props) => {
    const { src, alt, onClick_f } = props;
    return (
        <img
            src={src}
            onClick={() => onClick_f(alt)}
            style={{ cursor: 'pointer' }}
            width="20" height="20"
        ></img>
    );
}

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);

    };

    return (
        <div >
            {i18n.language === "en"
                ?
                <a href="/#" onClick={(e) => {
                    e.preventDefault();
                    onChangeLanguage("tr");
                }} >
                 TR
                </a>
                :
                <a href="/#" onClick={(e) => {
                    e.preventDefault();
                    onChangeLanguage("en");
                }} >
                    <img
                        src={en.src}
                        width="20" height="20"
                    ></img>
                </a>
            }
            <br /><br />
        </div>
    );
};

{/* <FlagButton src={us.src} alt={'en'} onClick_f={onChangeLanguage} /> */ }

export default LanguageSelector;