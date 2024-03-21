import React, { useContext, useState, useEffect } from "react";
import CandidateDashboardWrapper from "../../../components/Candidate/CandidateDashboardWrapper";
import { useRouter } from 'next/router'
import { getApiCalls } from "../../../shared/ComponentsEvent"
import { getUser } from "../../../api/apiCalls";
import { useApiProgress } from '../../../shared/ApiProgress';
import ProfilCard from "./profilCard";
import Spinner from '../../../components/Spinner';

const userPage = () => {
  const { username } = useRouter().query
  const [user, setUser] = useState({}); /* {} ***önemli, böylelikle ilk boş değer undefined olmayacak, obje olacak*/
  const [notFound, setNotFound] = useState(false);

  const pendingApiCall = useApiProgress('get', `http://localhost:8080/api/1.0/user/${username}`, true);

  useEffect(() => { /* sayfa ilk açıldığında veri tabanıdan bilgileri alır */
    getApiCalls(username, getUser, setUser, setNotFound);
  }, [username]);

  if (notFound) {
    return (<CandidateDashboardWrapper>
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: '48px' }}>
              error
            </i>
          </div>
          'User not found'
        </div>
      </div></CandidateDashboardWrapper>
    );
  }


console.log("user",user);
  if (pendingApiCall || (user.username )!== username) {
    return <Spinner />;
  }

  return (
    <CandidateDashboardWrapper>
      <ProfilCard user={user} />
    </CandidateDashboardWrapper>
  );

}

export default userPage;