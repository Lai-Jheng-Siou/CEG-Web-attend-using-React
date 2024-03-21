import { useState, useRef } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import { device } from "../components/rwdSize"

//react icon
import { CiEdit } from "react-icons/ci";  
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import Select from 'react-select'

import { FormControl } from "../components/Customize_Tool/Cust_UI";
import { default as CustDialog } from "../components/Customize_Tool/ConfirmDialog"
import axiosInstance from "../components/Instance/axiosInstance";

import { formFields, textInfo } from "../components/Menu/admin/publicSource"


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
    const { resData, setResData, token } = props

    const [tmpInfo, setTmpInfo] = useState(textInfo)

    const changeTmpInfo = (event) => {
        const { name, value } = event.target
        setTmpInfo({...tmpInfo, [name]: value})
    }

    //編輯鍵操作
    const [ isEdit, setIsEdit ] = useState(false)  //確認狀態是否在編輯
    const [ editId, setEditId ] = useState(-1)  //存放編輯中ID
    const [ dis_checkBtn, setDis_checkBtn ] = useState(false)  //當編輯時 禁用勾選框
    const isTick = useRef(false)  //是否按下送出編輯資料
    const switchTickStatus = () => {  //切換狀態
        isTick.current = !isTick.current
    }

    const handleTick = () => {  //送出編輯中的資料
        switchTickStatus()

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
                switchTickStatus()
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
        const { field } = props

        if(field.type === 'select') {
            const option = field.option
            return <Select options={option}/>
        }else if(field.id === 'account') {
            return <MobileText id={field.id}>{tmpInfo[field.id]}</MobileText>
        }else {
            return (
                <FormControl 
                    type = {field.type}
                    id = { field.id }
                    name = {field.id}
                    value = { tmpInfo[field.id] }
                    onChange = { changeTmpInfo }
                />
            )
        }
    }

    function DesktopJSX() {  //大螢幕顯示這邊
        return (
            <CustCon>
                <CustRow key={"head"}>
                    <CustColmin>編輯</CustColmin>
                    <CustColmin>移除</CustColmin>
                    {
                        formFields.map((field,index) => (
                            <CustCol key={index}><Custtext>{field.label}</Custtext></CustCol>
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
                                formFields.map((field, index)=> (
                                    <CustCol key = {index}>
                                        <ChooseRWD field = {field} />
                                    </CustCol>
                                ))
                            }
                        </CustRow>
                        :<CustRow key = { index } iseven = { index % 2 === 0 }>
                            <CustColmin>
                                <CiEdit style={{ fontSize: "20px", cursor: 'pointer' }} onClick = { () => { handleEdit(index) } } />
                            </CustColmin>
                            <CustColmin>
                                <MdDeleteForever style={{fontSize: "25px", cursor: "pointer"}} onClick = { () => switchIsShowDialog(index) } />
                            </CustColmin>
                            {
                                formFields.map(field => (
                                    <CustCol><Custtext>{items[field.id]}</Custtext></CustCol>
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
                        ?<MobileRow key={items}>
                            <MobileColFix>
                                <TiTick style = {{ fontSize: "30px", cursor: 'pointer' }} onClick={ () => { handleTick() } } />
                                <ImCross style = {{ fontSize: "18px", cursor: 'pointer', margin: "5px" }} onClick = { () => { handleEdit(-1) } } />
                            </MobileColFix>
                            {
                                formFields.map(field => (
                                    <MobileCol key = {field.id}>
                                        <MobileText>{field.label}</MobileText>
                                        <ChooseRWD field = {field} />
                                    </MobileCol>
                                ))
                            }
                        </MobileRow>
                        :<MobileRow>
                            <MobileColFix>
                                <MdDeleteForever style={{fontSize: "25px", cursor: "pointer"}} onClick = { () => switchIsShowDialog(index) } />
                                <CiEdit style={{ fontSize: "30px", cursor: 'pointer' }} onClick = { () => { handleEdit(index) } } />
                            </MobileColFix>
                            {
                                formFields.map(field => (
                                    <CustCol key={field.id}><Custtext>{field.label}: {items[field.id]}</Custtext></CustCol>
                                ))
                            }
                        </MobileRow>
                    ))
                    :<></>
                }
            </CustCon>
        )
    }

    const testMsg = useRef("")
    const delIndex = useRef(-1)
    const [isShowDialog, setIsShowDialog] = useState(false)
    const switchIsShowDialog = (index) => {
        if(index >= 0) {
            delIndex.current = index
            testMsg.current = `${resData[index].account}`
        }
        setIsShowDialog(!isShowDialog)
    }
    const test = () => { 
        axiosInstance.post(process.env.REACT_APP_DeleteUserInfo, { empToken: token, value: [testMsg.current] })
        .then(res => {
            if(res.data.success) {
                const arr = [...resData]
                arr.splice(delIndex.current, 1)
                setResData(arr)
            }
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
            switchIsShowDialog()
            delIndex.current = -1
        })
    }
    const testProps = {
        title: "警告: 確定要刪除?",
        msg: testMsg.current,
        show: isShowDialog,
        hideFunc: switchIsShowDialog,
        clickConfirm: test
    }
    
    return (
        <>
            <DesktopJSX />
            <MobileJSX />
            <CustDialog prop = {testProps}  />
        </>
    )
}


export default GetUserInfo;