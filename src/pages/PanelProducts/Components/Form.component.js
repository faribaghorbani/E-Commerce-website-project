import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import RTL from '../../../components/RTL.component'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box } from '@mui/system'
import PreviewImages from './PreviewImages.component'
import { v4 as uuidv4 } from 'uuid';
import PreviewColors from './PreviewColors.component';


const FormComponent = ({values, setValues, files, thumbnail, setFiles, setThumbnail}) => {
    const categoryData = useSelector(state => state.categoryData)
    const [tempColor, setTempColor] = useState("#000000")


    const handleChange = (e, editor) => {
		if (e.name === 'change:data') {
			setValues(prev => ({...prev, 'description': editor.getData()}))
		} else if(e.target.name === 'category') {
			setValues(prev => ({...prev, 'category':{...values.category, 'main': e.target.value}}))
		} else if(e.target.name === 'subCategory') {
			setValues(prev => ({...prev, 'category':{...values.category, 'second': e.target.value}}))
		} else if(e.target.name === 'color') {
			setTempColor(e.target.value)
		} else if(e.target.name === 'thumbnail') {
			setThumbnail([e.target.files[0]])
		} else if(e.target.name === 'gallery') {
			setFiles(prev => [...prev, ...Object.values(e.target.files)])
		} else {
			setValues(prev => ({...prev, [e.target.name]: e.target.value}))
		}
	}

	const addColor = () => {
		setValues(prev => ({...prev, 'color': [...new Set([...values.color, tempColor])]}))
	}

	const updateColors = (colors) => {
		setValues(prev => ({...prev, 'color':colors}))
	}

    return (
        <div>
            <RTL>
                <TextField
                    fullWidth
                    dir='rtl'
                    sx={{mb: 3}}
                    id="standard-password-input1"
                    name="name"
                    label="نام کالا"
                    type="text"
                    variant="standard"
                    value={values.name}
                    onChange={e => handleChange(e)}
                />
                <TextField
                    fullWidth
                    dir='rtl'
                    sx={{mb: 2}}
                    id="standard-password-input2"
                    name="price"
                    label="قیمت"
                    type="number"
                    variant="standard"
                    value={values.price}
                    onChange={e => handleChange(e)}
                />
                <TextField
                    fullWidth
                    dir='rtl'
                    sx={{mb: 2}}
                    id="standard-password-input3"
                    name="brand"
                    label="برند"
                    type="text"
                    variant="standard"
                    value={values.brand}
                    onChange={e => handleChange(e)}
                />
                <div>
                    <FormControl dir='rtl' fullWidth sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label1">دسته بندی سرگروه</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label1"
                            id="demo-simple-select-autowidth1"
                            name="category"
                            value={values.category.main}
                            onChange={e => handleChange(e)}
                            autoWidth
                            label="دسته بندی سرگروه"
                            >
                            <MenuItem value="">
                                <em>-</em>
                            </MenuItem>
                            {categoryData.map(itemCat => {
                                return (
                                    <MenuItem key={uuidv4()} value={itemCat.name}>{itemCat.title}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl dir='rtl' fullWidth sx={{ m: 1, minWidth: 80 }} disabled={values.category.main == ""}>
                        <InputLabel id="demo-simple-select-autowidth-label2">دسته بندی زیرگروه</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label2"
                            id="demo-simple-select-autowidth2"
                            name="subCategory"
                            value={values.category.second}
                            onChange={e => handleChange(e)}
                            autoWidth
                            label="دسته بندی زیرگروه"
                            >
                            <MenuItem value="">
                                <em>-</em>
                            </MenuItem>
                            {categoryData
                                ?.filter(itemCat => itemCat.name == values.category.main)[0]?.subCategories
                                ?.map((sub) => {
                                    return (
                                        <MenuItem key={uuidv4()} value={sub.name}>{sub.title}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <TextField
                    fullWidth
                    dir='rtl'
                    sx={{mb: 2}}
                    id="standard-password-input4"
                    name="quantity"
                    label="موجودی"
                    type="number"
                    variant="standard"
                    value={values.quantity}
                    onChange={e => handleChange(e)}
                />

                <CKEditor
                    editor={ ClassicEditor }
                    data={values.description}
                    name="description"
                    onChange={ ( event, editor ) => handleChange(event,editor)}
                />
                <Box sx={{mt: 2}}>
                    <label>آپلود تامبنیل</label>
                    <input type="file" name="thumbnail" multiple onChange={e => handleChange(e)}/>
                    <PreviewImages images={thumbnail} updateImages={setThumbnail}  />

                </Box>

                <Box sx={{mt: 2}}>
                    <label>آپلود گالری</label>
                    <input type="file" name="gallery" multiple onChange={e => handleChange(e)} />
                    <PreviewImages images={files} updateImages={setFiles} />
                </Box>

                <Box sx={{mt: 3}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <label>اضافه کردن رنگ</label>
                        <input type="color" name="color" onChange={e => handleChange(e)} />
                        <Button variant="contained" onClick={addColor}>+</Button>
                    </div>
                    <PreviewColors colors={values.color} updateColors={updateColors} />
                </Box>

            </RTL>
        </div>
    )
}

export default FormComponent;
