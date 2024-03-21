
import React, { useState, useContext } from "react";
import { Nav, Tab } from "react-bootstrap";
import Input from "../../components/Input";
import CandidateContext from "../../context/CandidateContext";
import CandidateDashboardWrapper from "../../components/Candidate/CandidateDashboardWrapper";

export default function CandidateSettings() {
    const candiContext = useContext(CandidateContext);

    const [form, setForm] = useState({
        username: null,
        password: null,
        passwordRepeat: null,
    });

    const [errors, setErrors] = useState({});
    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
        setErrors(null);
    };

    return (
        <CandidateDashboardWrapper >

            <h5 className="font-size-6 font-weight-semibold mb-11">
                Update Profile
            </h5>

            <Tab.Container id="left-tabs-example" defaultActiveKey="one">
                <div className="bg-white rounded-4 shadow-9">
                    {/* <!-- Tab Section Start --> */}
                    <Nav
                        className="nav border-bottom border-mercury pl-12"
                        role="tablist"
                    >
                        <li className="tab-menu-items nav-item pr-12">
                            <Nav.Link
                                eventKey="one"
                                className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                            >
                                Contact
                            </Nav.Link>
                        </li>
                        <li className="tab-menu-items nav-item pr-12">
                            <Nav.Link
                                eventKey="two"
                                className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                            >
                                Password
                            </Nav.Link>
                        </li>
                    </Nav>
                    {/* <!-- Tab Content --> */}
                    <Tab.Content>
                        <Tab.Pane eventKey="one">
                            {/* <!-- Excerpt Start --> */}

                            <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">

                                <form action="/">
                                    <div className="row mb-xl-1 mb-9">

                                        <div className="col-lg-6">
                                            <Input label="Name Surname" name="nameSurname" /*error={oldPasswordError}*/ onChange={onChange} placeholder="Enter password" />
                                        </div>
                                        <div className="col-lg-6">
                                            <Input label="Phone" name="phone"  /*error={oldPasswordError}*/ onChange={onChange} placeholder="Enter password" />
                                        </div>
                                        <div className="col-lg-6">
                                            <Input label="E-mail" name="e-mail" /*error={oldPasswordError}*/ onChange={onChange} placeholder="Enter password" />
                                        </div>
                                        

                                    </div>

                                    <input
                                        type="button"
                                        value="SAVE"
                                        className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase"
                                    />

                                </form>
                            </div>

                            {/* <!-- Card Section End --> */}
                        </Tab.Pane>
                        <Tab.Pane eventKey="two">
                            {/* <!-- Excerpt Start --> */}
                            <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">

                                <form action="/">
                                    <div className="row mb-xl-1 mb-9">

                                        <div className="col-lg-6">
                                            <Input label="Old Password" name="password" /*error={oldPasswordError}*/ onChange={onChange} placeholder="Enter password" />
                                            <Input label="New Password" name="password"  /*error={oldPasswordError}*/ onChange={onChange} placeholder="Enter password" />
                                            <Input label="Confirm Password" name="passwordRepeat" /*error={oldPasswordError}*/ onChange={onChange} placeholder="Enter password" />
                                        </div>


                                    </div>

                                    <input
                                        type="button"
                                        value="SAVE"
                                        className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase"
                                    />

                                </form>
                            </div>
                            {/* <!-- Excerpt End --> */}
                        </Tab.Pane>
                    </Tab.Content>
                    {/* <!-- Tab Section End --> */}
                </div>
            </Tab.Container>


        </CandidateDashboardWrapper>

    );
};
