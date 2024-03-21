import { useState, useEffect } from "react";
import { useApiProgress } from '../../../shared/ApiProgress';
import { experience_Levels } from "../../../shared/staticValues";
import { getApiCallsListOfSelect, swapItemToSelectBox } from "../../../shared/ComponentsEvent"
import { getApiCompanies, getApiWorkingArea } from "../../../api/apiCalls";


export const initialize = () => {
    const [ListOfCompany, setListOfCompany] = useState();
    const [ListOfWorkingArea, setListOfWorkingArea] = useState();
    const pendingWorkingArea = useApiProgress('get', `http://localhost:8080/api/1.0/workingArea/getAll`);
    const pendingCompany = useApiProgress('get', `http://localhost:8080/api/1.0/company/getAll`);

    useEffect(() => {
        getApiCallsListOfSelect(getApiWorkingArea, setListOfWorkingArea);
        getApiCallsListOfSelect(getApiCompanies, setListOfCompany);
    }, []);
    
    const experienceLevels = (experience_Levels.map((item) => (swapItemToSelectBox(item))))
    return { experienceLevels, ListOfCompany, pendingCompany, ListOfWorkingArea, pendingWorkingArea }
}

