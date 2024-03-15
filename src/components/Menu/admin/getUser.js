import { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form } from "react-bootstrap";

import { device } from "../../rwdSize"

//react icon
import { CiEdit } from "react-icons/ci";  
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import { FormControl } from "../../Customize_Tool/Cust_UI";
import axiosInstance from "../../Instance/axiosInstance";

import Select from 'react-select'
import { departmentOption, accessOption } from "../../Customize_Tool/selectOptions";


const CustCon = styled(Container)`
    margin-top: 20px;
`
const CustRow = styled(Row)`
    border: 1px solid #000000;
    background-color: ${(props) => (props.iseven ? '#D3D3D3' : '#fff')};

    @media ${device.mobile} {
        display: none;
    }
`
const CustCol = styled(Col)`
    border: 1px solid #000000;
`
const CustColmin = styled(Col)`
    border: 2px solid #000000;
    max-width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
`
const Custtext = styled.p`
    display: flex;
    align-items: center;
    padding-top: 10px;
    font-size: 14px;
`

const MobileRow = styled(Row)`
    @media ${device.tablet} {
        display: none;
    }
    @media ${device.laptop} {
        display: none;
    }
    @media ${device.mobile} {
        display: block;
        border: 3px solid #000000;
        border-radius: 10px;
        margin: 20px;
    }
`
const MobileCol = styled(Col)`
    display: flex;
    border-top: 1px solid #000000;
    padding: 5px;
`
const MobileText = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin: 10px;
`
const MobileColFix = styled(Col)`
    display: flex;
    justify-content: space-between;
`


function GetUserInfo(props) {  //傳入參數需有 表格title, token, api address
    const { resData, token } = props

    const [ checkBtn, setCheckBtn ] = useState(new Set())  //存放選取框是否勾選
    
    //單一選取框操作
    const click_singleCheckBtn = (index) => {  
        setCheckBtn((prevCheckBtn) => {
            const newCheckBtn = new Set(prevCheckBtn);
        
            if (newCheckBtn.has(index)) {
                newCheckBtn.delete(index); // 如果已經存在，刪除
            } else {
                newCheckBtn.add(index); // 如果不存在，新增
            }
        
            return newCheckBtn;
          });
    }
    //全部選取框操作
    const click_allCheckBtn = () => {
        setCheckBtn((prevCheckBtn) => {
            const newCheckBtn = new Set(prevCheckBtn)

            if(newCheckBtn.size === 0) {
                let len = resData.length
                for(let i = 0; i < len; i++) { newCheckBtn.add(i) }
            }else {
                newCheckBtn.clear()
            }
            return newCheckBtn
        })
    }

    const titleTextObj = {
        'account': '帳號',
        'password': '密碼',
        'name': '姓名',
        'department': '部門',
        'email': '信箱',
        'access': '權限'
    }

    //編輯暫存
    const textInfo = {
        account: '',
        password: '',
        name: '',
        department: '',
        email: '',
        access: ''
    }

    const [tmpInfo, setTmpInfo] = useState(textInfo)

    const changeTmpInfo = (part, info) => {
        const originInfo = {...tmpInfo}
        originInfo[part] = info
        setTmpInfo(originInfo)
    }

    //編輯鍵操作
    const [ isEdit, setIsEdit ] = useState(false)  //確認狀態是否在編輯
    const [ editId, setEditId ] = useState(-1)  //存放編輯中ID
    const [ dis_checkBtn, setDis_checkBtn ] = useState(false)  //當編輯時 禁用勾選框
    const [ isTick, setIsTick ] = useState(false)  //當按下勾選框時
    const handleTick = () => {
        setIsTick(!isTick)

        if(isTick) {
            axiosInstance('/alterUser', { empToken: token, newInfo: tmpInfo})
            .then(res => {
                if(res.data.isSuccess) {
                    //如果成功返回 將tmp資料修改進當前表格
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                //不管成功與否 清除tmp表格  並解除修改模式
                setTmpInfo(textInfo)
                setEditId(-1)
                setIsEdit(false)
                setDis_checkBtn(false)
            })
        }
    }


    const handleEdit = (index) => {
        if (!isEdit) {
            if (index < resData.length) {
                const updatedInfo = resData[index];
                setTmpInfo({...tmpInfo, ...updatedInfo});
            }
        }
        setIsEdit(!isEdit)
        setDis_checkBtn(!dis_checkBtn)
        setEditId(index)
    }

    function ChooseRWD(props) {     //共用JSX
        const {keys} = props

        if(keys === 'department' || keys === 'access') {
            const option = keys === 'department' ?departmentOption :accessOption
            return (
                <Select options={option}/>
            )
        }else if(keys === 'account') {
            return (
                <MobileText>{tmpInfo[keys]}</MobileText>
            )
        }else {
            return (
                <FormControl 
                    type = "text"
                    name = { keys }
                    value = { tmpInfo[keys] }
                    onChange = { e => {changeTmpInfo(keys, e)} }
                />
            )
        }
    }

    function DesktopJSX() {  //大螢幕顯示這邊
        return (
            <CustCon>
                <CustRow key={"head"}>
                    <CustColmin>編輯</CustColmin>
                    <CustColmin>
                        <Form.Check 
                            type = "checkbox"
                            name = "titleChecked"
                            disabled = {dis_checkBtn}
                            checked = { checkBtn.size }
                            onClick={() => {click_allCheckBtn()}}
                            onChange={() => {  }}
                        />
                    </CustColmin>
                    {
                        Object.entries(titleTextObj).map(([, value]) => (
                            <CustCol><Custtext>{value}</Custtext></CustCol>
                        ))
                    }
                </CustRow>
                {
                    resData && resData.length > 0
                    ?resData.map((items, index) => (
                        isEdit && editId === index
                        ?<CustRow key = { index } iseven = { index % 2 === 0 }>
                            <CustColmin>
                                <TiTick style = {{ fontSize: "25px", cursor: 'pointer' }} onClick={ () => { handleTick() } } />
                            </CustColmin>
                            <CustColmin>
                                <ImCross style = {{ fontSize: "15px", cursor: 'pointer' }} onClick = { () => { handleEdit(-1) } } />
                            </CustColmin>
                            {
                                Object.entries(titleTextObj).map(([key], index) => (
                                    <CustCol key = {index}>
                                        <ChooseRWD keys = {key} />
                                    </CustCol>
                                ))
                            }
                        </CustRow>
                        :<CustRow key = { index } iseven = { index % 2 === 0 }>
                            <CustColmin>
                                <CiEdit style={{ fontSize: "20px", cursor: 'pointer' }} onClick = { () => { handleEdit(index) } } />
                            </CustColmin>
                            <CustColmin>
                                <Form.Check 
                                    type = "checkbox"
                                    name = "singleChecked"
                                    disabled = {dis_checkBtn}
                                    checked = {checkBtn.has(index)}
                                    onClick={() => click_singleCheckBtn(index)}
                                    onChange={() => {  }}
                                />
                            </CustColmin>
                            {
                                Object.entries(titleTextObj).map(([key]) => (
                                    <CustCol><Custtext>{items[key]}</Custtext></CustCol>
                                ))
                            }
                        </CustRow>
                    ))
                    :<></>
                }
            </CustCon>
        )
    }

    function MobileJSX() {  //手機幕顯示這邊
        return (
            <CustCon>
                {  
                    resData && resData.length > 0
                    ?resData.map((items, index) => (
                        isEdit && editId === index
                        ?<MobileRow>
                            <MobileColFix>
                                <TiTick style = {{ fontSize: "30px", cursor: 'pointer' }} onClick={ () => { handleTick() } } />
                                <ImCross style = {{ fontSize: "18px", cursor: 'pointer', margin: "5px" }} onClick = { () => { handleEdit(-1) } } />
                            </MobileColFix>
                            {
                                Object.entries(titleTextObj).map(([key, value], index) => (
                                    <MobileCol key = {index}>
                                        <MobileText>{value}</MobileText>
                                        <ChooseRWD keys = {key} />
                                    </MobileCol>
                                ))
                            }
                        </MobileRow>
                        :<MobileRow>
                            <MobileColFix>
                                <Form.Check 
                                    style={{fontSize: "25px"}}
                                    type = "checkbox"
                                    name = "singleChecked"
                                    disabled = {dis_checkBtn}
                                    checked = {checkBtn.has(index)}
                                    onClick={() => click_singleCheckBtn(index)}
                                    onChange={() => {  }}
                                />
                                <CiEdit style={{ fontSize: "30px", cursor: 'pointer' }} onClick = { () => { handleEdit(index) } } />
                            </MobileColFix>
                            {
                                Object.entries(titleTextObj).map(([key, value]) => (
                                    <CustCol><Custtext>{value}: {items[key]}</Custtext></CustCol>
                                ))
                            }
                        </MobileRow>
                    ))
                    :<></>
                }
            </CustCon>
        )
    }
    
    return (
        <>
            <DesktopJSX />
            <MobileJSX />
        </>
    )
}


export default GetUserInfo;