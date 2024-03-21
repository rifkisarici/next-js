// import App from 'next/app'
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalContext";
import { CandidateProvider } from "../context/CandidateContext";
import { EmployerProvider } from "../context/EmployerContext";

// import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
// import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/css/all.min.css";

// import "../assets/fonts/icon-font/css/style.css";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../node_modules/aos/dist/aos.css";

import "../assets/fonts/icon-font/css/style.css";
import "../assets/fonts/fontawesome-5/css/all.css";

import "../scss/bootstrap.scss";
import "../scss/main.scss";
import "../i18n";

const MyApp = ({ Component, pageProps, router }) => {
  if (router.pathname.match(/404/)) {
    return (
      <GlobalProvider>
        <Layout pageContext={{ layout: "bare" }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    );
  }
  
  if (router.pathname.match(/dashboard/)) {
    return (
      <GlobalProvider>
        <Layout pageContext={{ layout: "dashboard" }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    );
  }

  if (router.pathname.match(/candidate/)) {
    return (
      <GlobalProvider>
        <CandidateProvider>
        <Layout pageContext={{ layout: "candidateDashboard" }}>
          <Component {...pageProps} />
        </Layout>
        </CandidateProvider>
      </GlobalProvider>
    );
  }

  if (router.pathname.match(/employer/)) {
    return (
      <GlobalProvider>
        <EmployerProvider>
        <Layout pageContext={{ layout: "employerDashboard" }}>
          <Component {...pageProps} />
        </Layout>
        </EmployerProvider>
      </GlobalProvider>
    );
  }

  return (
    <GlobalProvider>
        <Layout pageContext={{}}>
          <Component {...pageProps} />
        </Layout>      
    </GlobalProvider>
  );
};

export default MyApp;
