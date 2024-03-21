import { useState, useEffect } from "react";
import { useApiProgress } from '../../../shared/ApiProgress';
import { getApiSkills} from "../../../api/apiCalls";
import { swapItemToSelectBox } from "../../../shared/ComponentsEvent"


export const initialize = (skillType) => {
    /* <<<<<<<<<< RESPONSE >>>>>>>>>> univesite listesi gibi statik değerler backend den alınır*/
    const [listOfSkills, setListOfSkills] = useState();
    const pendingSkill = useApiProgress('get', `http://localhost:8080/api/1.0/${skillType.type2}/getAll`);

    useEffect(async () => { /* sayfa ilk açıldığında veri tabanıdan bilgileri alır */
        try {
            const response = await getApiSkills({inputValue:"", skillType:skillType.type2});
            setListOfSkills(response.data.map((item) => (swapItemToSelectBox(item))))
        } catch (error) {
            //setErrors(apiError.response.data.message);
            console.log("response erorr");
        }
    }, []);

    return { pendingSkill, listOfSkills };
}
