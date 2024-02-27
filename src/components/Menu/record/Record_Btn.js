import {React, useState, useEffect} from "react"
import { Container, Button, Form } from "react-bootstrap"
import styled from "styled-components"
import { ExcelExport } from "../../../Customize_Tool/Excel"
import { default as CustDialog } from "../../../Customize_Tool/ConfirmDialog"

import { Modal } from "react-responsive-modal";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CustDiv = styled.div`
    display: flex;
`
const CustButton = styled(Button)`
    margin: 10px 5px 10px 0px;
`
const ModalForm = styled.div`
    height: 500px;
`
const FormLabel = styled(Form.Label)``
const FormInput = styled(Form.Control)`
    &:focus {
        box-shadow: 0 0 5px 5px rgba(0, 123, 255, 0.25);
    }
`
const FormDate = styled(DatePicker)`
    border-radius: 7px;
    border: 1px solid #E0E0E0;
    width: 300px;
    height: 40px;
    &:focus {
        box-shadow: 0 0 5px 5px rgba(0, 123, 255, 0.25);
    }
`

export function RecordSearch (){
    const [show, setShow] = useState(false)
    const switchShow = () => { setShow(!show) }

    const [inputId, setInputId] = useState("")
    const [inputName, setInputName] = useState("")
    const [inputdDate, setInputdDate] = useState(null)

    return(
        <>
            <CustDiv>
                <CustButton onClick={ () => { switchShow() }}>搜尋</CustButton>
            </CustDiv>
            <Modal open={show} onClose={switchShow} center>
                <h2>搜尋條件</h2>
                <ModalForm>
                    <FormLabel  >員工編號</FormLabel>
                    <FormInput 
                        type="text"
                        value={inputId}
                        onChange={e => { setInputId(e.target.value) }}
                    />
                    <FormLabel>員工姓名</FormLabel>
                    <FormInput 
                        type="text"
                        value={inputName}
                        onChange={e => { setInputName(e.target.value) }}
                    />
                    <FormLabel>打卡日期</FormLabel><br/>
                    <FormDate 
                        selected={inputdDate}
                        onChange={(date) => setInputdDate(date)}
                        dateFormat="yyyy/MM/dd" // 日期格式
                        isClearable // 是否可清除日期
                    /><br />
                    <CustButton onClick={ () => { } }>送出</CustButton>
                </ModalForm>
            </Modal>
        </>
    )
}

export function RecordExport(props) {
    const { attendInfo } = props
    const [show, setShow] = useState(false)

    //匯出並關閉對話框
    const exportFun = () => { 
        ExcelExport(attendInfo)
        setShow(!show)
    }
    //對話框顯示
    const switchShow = () => { setShow(!show) }

    return (
        <>
            <CustButton variant="info" onClick={() => {switchShow()}}>匯出</CustButton>
            <CustDialog 
                show = {show} 
                title = {'確認'} 
                msg = {'是否要匯出資料'} 
                hideFunc = { switchShow }
                clickConfirm = { exportFun } />
        </>
    )
}