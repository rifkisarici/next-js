import React, {useState } from "react";

const Input = (props) => {
    const { label, name, error, onChange,placeholder ,defaultValue,onKeyPress,maxLength} = props;

    const [showPass, setShowPass] = useState(true);    
     
    const isPassword = (name=="password" || name=="passwordRepeat" ? true : false);

    

    let className = 'form-control';

        if (error !== undefined) {
            className += ' is-invalid';
        }
    
    return (

        <div className="form-group">
            <label  className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                {label}
            </label>

            <div className="position-relative">
                <input
                    name={name}
                    type={showPass && isPassword ? "password" : "text"}
                    className={className}
                    placeholder={placeholder}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    onKeyPress={onKeyPress}
                    maxLength={maxLength}
                    
                />                

                
                { isPassword && <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-3 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPass(!showPass);
                        }}
                      >
                        
                </a>}

            </div>
            
            <div class="text-red" >{error}</div>

        </div>

    );
}

export default Input;