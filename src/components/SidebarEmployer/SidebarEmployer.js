import React, { useContext } from "react";
import Link from "next/link";
import { Collapse } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import EmployerContext from "../../context/EmployerContext";
import imgL from "../../assets/image/logo-main-black.png";


const Sidebar = () => {
  const gContext = useContext(GlobalContext);

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
                {gContext.t("New Post a Job")}
              </a>
            </Link>
          </div>
          <ul className="list-unstyled dashboard-layout-sidebar">

            <li className="">
              <Link href="/employer/postJob">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="icon icon-layout-11 mr-7"></i>My job postings
                </a>
              </Link>
            </li>

            <li className="">
              <Link href="/employer/uploadCv">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="icon icon-layout-11 mr-7"></i>upload Cv
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
