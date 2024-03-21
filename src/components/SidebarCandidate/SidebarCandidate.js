import React, { useContext } from "react";
import Link from "next/link";
import { Collapse } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import CandidateContext from "../../context/CandidateContext";
import imgL from "../../assets/image/logo-main-black.png";


const Sidebar = () => {
  const gContext = useContext(GlobalContext);
  const candContext = useContext(CandidateContext);
  return (
    <>
      <Collapse in={gContext.showSidebarDashboard}>
        <div className="dashboard-sidebar-wrapper pt-11" id="sidebar">
          {/*<div className="brand-logo px-11">
            <Link href="/">
              <a>
                <img src={imgL.src} alt="" />
              </a>
            </Link>
          </div>*/}
          <div className="my-15 px-11">
            <Link href="">
              <a className="btn btn-primary btn-xl w-100 text-uppercase">
                {candContext.t("Download_Resume")} 
              </a>
            </Link>
          </div>
          <ul className="list-unstyled dashboard-layout-sidebar">       
            
            <li className="">
              <Link href="/candidate/candidateResume">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="fas fa-user mr-7">{candContext.t("Resume")} </i>
                  
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="/candidate/candidateSetting">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="fas fa-cog mr-7"></i>{candContext.t("Settings")} 
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="/candidate/applications">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="fas fa-cog mr-7">{candContext.t("My Applications")} </i>
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="/candidate/deneme/resumeAll">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="fas fa-cog mr-7"></i>deneme
                </a>
              </Link>
            </li>
          </ul>
        </div>
        
      </Collapse>
      <a
        href="/#"
        className="sidebar-mobile-button"
        onClick={(e) => {
          e.preventDefault();
          gContext.toggleSidebarDashboard();
        }}
      >
        <i className="icon icon-sidebar-2"></i>
      </a>
    
    </>
    
  );
};

export default Sidebar;
