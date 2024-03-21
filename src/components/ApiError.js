const apiError = ({text}) => {
    return ( 

        <div className="alert alert-danger text-center">
          <div>
            <i style={{ fontSize: '12px' }}>
            {text}
            </i>
          </div>
        </div>
     );
}
 
export default apiError;