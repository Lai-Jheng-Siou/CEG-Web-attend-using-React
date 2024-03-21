import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Select from 'react-select'

import axiosInstance from "../../Instance/axiosInstance";

import { FormControl } from "../../Customize_Tool/Cust_UI";
import { default as CustDialog } from "../../Customize_Tool/ConfirmDialog"

import { textInfo } from "./publicSource"

import { TopItems } from "../TopItem";
import AddUser from "./addUser";
import { MobileJSX } from "./userMobile"
import { DesktopJSX } from "./userDesktop"
import PageBtn from "./PageButton";


const PageDiv = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`
const Text = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin: 10px;
`


function Userinfo() {
    let userInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_localStorage))
    const token = userInfo['token']
    
    //取得SQL表格頁數
    const remainder = 10
    const [resData, setResData] = useState({})  //存放後端傳回資料
    const [totalPage, setTotalPage] = useState(-1)
    const [nowPage, setNowPage] = useState(1)

    useEffect(() => {  //取得SQL表數量
        axiosInstance.post(process.env.REACT_APP_GetTableLen, {
            empToken: token,
            tableName: 'empinfo'
        })
        .then(res => {
            let total_rows = res.data[0].TOTAL_ROWS
            let page = total_rows % remainder === 0 ?total_rows / remainder :Math.floor(total_rows / remainder) + 1
            setTotalPage(page)
        })
        .catch(e => {
            console.log(e)
        })
    })

    useEffect(() => {  //跟後端溝通
        axiosInstance.post(process.env.REACT_APP_GetUserInfo, {
            empToken: token,
            page: nowPage * remainder - remainder
        })
        .then(res => {
            setResData(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [nowPage])


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
            return <Select options={ field.option }/>
        }else if(field.id === 'account') {
            return <Text id={field.id}>{tmpInfo[field.id]}</Text>
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
    const deleteUserFunc = () => { 
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
    const dialogProps = {
        title: "警告: 確定要刪除?",
        msg: testMsg.current,
        show: isShowDialog,
        hideFunc: switchIsShowDialog,
        clickConfirm: deleteUserFunc
    }

    const transferProps = {
        resData: resData,
        isEdit: isEdit,
        editId: editId,
        handleTick: handleTick,
        handleEdit: handleEdit,
        switchIsShowDialog: switchIsShowDialog,
    }


    return(
        <>
            <TopItems></TopItems>
            <AddUser token = { token } />
            <DesktopJSX prop = { transferProps } ChooseRWD = { ChooseRWD } />
            <MobileJSX prop = { transferProps } ChooseRWD = { ChooseRWD } />
            <PageDiv>
                <PageBtn
                    color='info'
                    totalPage={totalPage}
                    nowPage={nowPage}
                    setNowPage={setNowPage}
                />
            </PageDiv>
            <CustDialog prop = {dialogProps}  />
        </>
    )
}

export default Userinfo