import React, { useState, useContext } from "react";
import EmployerContext from "../../context/EmployerContext";
import JobTravelModal from "./JobTravelModal";
import AddIco from "../../assets/add.ico"

const JobTravel = () => {
    const empContext = useContext(EmployerContext);
    const [travelList, setTravelList] = useState([]);
    const [updateTravelIndex, SetUpdateTravelId] = useState(null);

    const addTravel = () => {
        empContext.toggleTravelModal();
        SetUpdateTravelId(null);
    }

    const SaveTravel = async (form) => {
        //try catch ApiProgress gerekli


        if (updateTravelIndex != null) {
            travelList[updateTravelIndex] = form
        } else {
            setTravelList(previousItem => [...previousItem, form]);
        }

        empContext.toggleTravelModal(); //handleClose()
    }

    const FillUpdate = (index) => {
        empContext.toggleTravelModal();
        SetUpdateTravelId(index);
    }

    return (<>
        <JobTravelModal /*edit için tekrar gönderir*/ fillUpdateTravelItem={[updateTravelIndex]} SaveTravel={SaveTravel} />

        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    Travel Availibility
                </h4>
                <a
                    href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        addTravel();
                    }}
                >
                    <img src={AddIco.src} alt="" width={23} height={25} />

                </a>

            </div>

        </div>


    </>);
}

export default JobTravel;