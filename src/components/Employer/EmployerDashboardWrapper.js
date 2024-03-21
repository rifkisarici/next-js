import PageWrapper from "../PageWrapper";
import SidebarEmployer from "../SidebarEmployer";

const EmployerDashboardWrapper = ({ children }) => {
    return (<>
        
        <SidebarEmployer />
        <PageWrapper
            headerConfig={{
                button: "profile",
                isFluid: true,
                bgClass: "bg-default",
                reveal: false,
            }}
        >
            <div className="site-wrapper overflow-hidden bg-default-2">
                <div
                    className="dashboard-main-container mt-24 mt-lg-31"
                    id="dashboard-body"
                >
                    <div className="container">
                        <div className="mb-15 mb-lg-23">
                            <div className="row">
                                <div className="col-xxxl-9 px-lg-13 px-6">





                                    {children}




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    </>);
}
 
export default EmployerDashboardWrapper;