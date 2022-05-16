import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from 'react-redux';
import { setOrdersStatus } from '../../../redux/slices/ordersStatusSlice'
import RTL from '../../../components/RTL.component';

export default function RadioButtonsGroup() {
	  const [value, setValue] = useState('');
  	const dispatch = useDispatch()

	
    const handleChange = (e) => {
      setValue(e.target.value);
      dispatch(setOrdersStatus(e.target.value))
    }


    return (
      <FormControl>
        <RTL>
        <FormLabel id="demo-radio-buttons-group-label">فیلتر سفارش ها:</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="همه سفارش ها" />
          <FormControlLabel value="1" control={<Radio />} label="سفارش های تحویل داده شده" />
          <FormControlLabel value="2" control={<Radio />} label="سفارش های در حال ارسال " />
          <FormControlLabel value="3" control={<Radio />} label="سفارش های لغو شده" />
        </RadioGroup>
        </RTL>
      </FormControl>
    );
}
