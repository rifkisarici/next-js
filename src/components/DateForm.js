import React from 'react'
import { Form } from 'react-bootstrap';
const DateForm = ({ label, name, onChange, defaultValue, startDateDisable, error }) => {

    let  day = new Date().getDate(), month = new Date().getMonth() + 1

    if (month < 10)
        month = `0${month}`
    if (day < 10)
        day = `0${day}`

    const date= `${new Date().getFullYear()}-${month}-${day}`

    return (
        <div>
            <div className="row">
                <div className="">{/*col-md-4*/}
                    <Form.Group controlId="dob">
                        <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                            {label}
                        </label>
                        <Form.Control
                            type="date"
                            name={name}
                            placeholder="Date of ..."
                            onChange={onChange}
                            defaultValue={defaultValue}
                            min={startDateDisable}
                            max={date}
                        />
                    </Form.Group>
                    <div class="text-red" >{error}</div>
                </div>

            </div>
        </div>
    )


}

export default DateForm;
