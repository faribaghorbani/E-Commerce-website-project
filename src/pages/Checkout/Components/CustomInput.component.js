import React from 'react'
import { TextField } from '@mui/material';
import RTL from '../../../components/RTL.component';

const CustomInput = (props) => {
    return (
        <RTL>
            <TextField
            fullWidth
            dir='rtl'
            label="بازه تحویل"
            id="date2"
            name="data2"
            type="text"
            value={props.value}
            onFocus={props.openCalendar}
            error={Boolean(props.touchError) && Boolean(props.error)}
            helperText={props.touchError && props.error}
            />
        </RTL>
    )
}

export default CustomInput;
