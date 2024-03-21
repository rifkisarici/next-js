import { useState, useEffect } from "react";
import { useApiProgress } from '../../../shared/ApiProgress';
import { getApiUniversities, getApiUniversityDepartments } from "../../../api/apiCalls";
import { getApiCallsListOfSelect, swapItemToSelectBox } from "../../../shared/ComponentsEvent"
import { education_Levels, grade_List } from "../../../shared/staticValues";


export const initialize = () => {  
    /* <<<<<<<<<< RESPONSE >>>>>>>>>> univesite listesi gibi statik değerler backend den alınır*/
    const [listOfUniversities, setListOfUniversities] = useState();
    const [listOfDepartments, setListOfDepartments] = useState();
    const pendingUniversities = useApiProgress('get', 'http://localhost:8080/api/1.0/university/argebul_TR');
    const pendingDepartment = useApiProgress('get', 'http://localhost:8080/api/1.0/universityDepartment/getAll');

    useEffect(() => { /* sayfa ilk açıldığında veri tabanıdan bilgileri alır */
        getApiCallsListOfSelect(getApiUniversities, setListOfUniversities);
        getApiCallsListOfSelect(getApiUniversityDepartments, setListOfDepartments);
    }, []);
   
    const educationLevels = (education_Levels.map((item) => (swapItemToSelectBox(item))))
    const gradeList = (grade_List.map((item) => (swapItemToSelectBox(item))))

    return {pendingUniversities, listOfUniversities, pendingDepartment, listOfDepartments, educationLevels, gradeList};
}
