import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { loginSuccess, encodingAES } from "./authActions"
import { setAuthorizationHeader} from "../api/apiCalls"
import { useTranslation } from 'react-i18next';

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false);
  const [showSidebarDashboard, setShowSidebarDashboard] = useState(true);
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState({
    visible: false,
    type: null //CANDIDATE or EMPLOYER
  });
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [visibleOffCanvas, setVisibleOffCanvas] = useState(false);
  const [header, setHeader] = useState({
    theme: "light",
    bgClass: "default",
    variant: "primary",
    align: "left",
    isFluid: false,
    button: "cta", // profile, account, null
    buttonText: "Get started free", // profile, account, null
    reveal: true,
  });

  const [footer, setFooter] = useState({
    theme: "dark",
    style: "style1", //style1, style2
  });

  const [currentUser, setCurrentUser] = useState({
    username: undefined,
    lastName: undefined,
    token: undefined,
    isLoggedIn: false,
    userRole: undefined,
  });

  //console.log("currentUser",currentUser);

  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  const toggleSidebarDashboard = () => {
    setShowSidebarDashboard(!showSidebarDashboard);
  };

  const toggleVideoModal = () => {
    setVideoModalVisible(!videoModalVisible);
  };

  const toggleApplicationModal = () => {
    setApplicationModalVisible(!applicationModalVisible);
  };

  const toggleSignInModal = () => {
    setSignInModalVisible(!signInModalVisible);
  };


  const toggleSignUpModal = (type) => {
    setSignUpModalVisible({
      visible: !signUpModalVisible.visible,
      type: type
    });
  };

  const toggleOffCanvas = () => {
    setVisibleOffCanvas(!visibleOffCanvas);
  };

  const closeOffCanvas = () => {
    setVisibleOffCanvas(false);
  };

  const { t } = useTranslation();
  const { i18n } = useTranslation();


  if (global?.localStorage) {
    const user = encodingAES().get("argebull-auth");
    useEffect(() => {
      //eğer sayfa yenilernirse, aktif kullanıcı varmı. varsa tekrar yükle değerleri localStorage' dan
      //const argebullAuth=localStorage.getItem("argebull-auth");      
      try {
        user && loginSuccess(user, { setHeader, setCurrentUser })
      } catch (error) { }
    }, [useRouter()]);
    user && setAuthorizationHeader(user); //back-end'e her request de aktif olan kullanici gönderir.
  }



  return (
    <GlobalContext.Provider
      value={{
        toggleTheme, themeDark,
        showSidebarDashboard, toggleSidebarDashboard,
        videoModalVisible, toggleVideoModal,
        applicationModalVisible, toggleApplicationModal,
        signInModalVisible, toggleSignInModal,
        signUpModalVisible, toggleSignUpModal,
        visibleOffCanvas, toggleOffCanvas,
        closeOffCanvas,
        header, setHeader,
        footer, setFooter,
        t, i18n,
        currentUser, setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
