import React, { useContext, useState, useEffect } from "react";
import { getUserPagination } from "../../../api/apiCalls";
import { useApiProgress } from '../../../shared/ApiProgress';
import CandidateDashboardWrapper from "../../../components/Candidate/CandidateDashboardWrapper";
import ResumeListItem from "./resumeListItem";
import Spinner from '../../../components/Spinner';
import Link from "next/link";
import CandidateContext from "../../../context/CandidateContext";

const resumeAll = () => {
    const candContext = useContext(CandidateContext);
    const [username, setUsername] = useState()

    const [page, setPage] = useState({
        content: [],
        size: 5,
        number: 0
    });

    //sırsası önemli ilk requesten önce verilmeli
    const pendingApiCall = useApiProgress('get', 'http://localhost:8080/api/1.0/user/userAll?page');

    const [loadFailure, setLoadFailure] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        setUsername(candContext.currentUser.username)
    }, [candContext.currentUser.username]);


    const loadUsers = async page => {
        setLoadFailure(false);
        try {
            const response = await getUserPagination(page);
            setPage(response.data);
        } catch  (error) {
            setLoadFailure(true);
        }
    }

    const deletes = (index) => {
        const newResume = [...resumes];
        newResume.splice(index, 1)
        setResumes(newResume)
        loadUsers();
    }


    const onClickNext = (n) => {
        const nextPage = page.number + n;
        loadUsers(nextPage);
    };

    const { content: users, last, first } = page;

    let actionDiv = (
        <div>
            {first === false && (
                <button className="btn btn-sm btn-light" onClick={(e) => onClickNext(-1)}>
                    Previous
                </button>
            )}
            {last === false && (
                <button className="btn btn-sm btn-light float-right" onClick={(e) => onClickNext(1)}>
                    Next
                </button>
            )}
        </div>
    );

    if (pendingApiCall) {
        actionDiv = <Spinner />;
    }

   

    return (<CandidateDashboardWrapper>
        {/* <User resumes={resumes}/> */}
        <Link href={{pathname:"/Candidate/deneme/userPage",query: { username: `${username}` } }} >{username ? username : ""}</Link>
        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                    user List
                </h4>
            </div>

            <div className="card">
                {users.map((user, index) => (
                    <ResumeListItem key={index} user={user} />
                ))}
                {actionDiv}
                {loadFailure && <div className="text-center text-danger">Load Failure</div>}
            </div>
        </div>

    </CandidateDashboardWrapper>
    );
}

export default resumeAll;