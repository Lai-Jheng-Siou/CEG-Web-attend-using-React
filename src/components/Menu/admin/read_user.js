import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import axiosInstance from "../../Instance/axiosInstance";

import { default as CustDialog } from "../../Customize_Tool/ConfirmDialog"

import { TopItems } from "../TopItem";
import AddUser from "./addUser";
import { MobileJSX } from "./userMobile"
import { DesktopJSX } from "./userDesktop"
import PageBtn from "./PageButton";

import { textInfo, ShareModal } from "./publicSource"


const PageDiv = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
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

//---------------------------------------------------------------------------------------------------------------------刪除使用者
    const testMsg = useRef("")
    const delIndex = useRef(-1)
    const [showDialog_del, setShowDialog_del] = useState(false)
    const switchShowDialog_D = (index) => {
        if(index >= 0) {
            delIndex.current = index
            testMsg.current = `${resData[index].account}`
        }
        setShowDialog_del(!showDialog_del)
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
            switchShowDialog_D()
            delIndex.current = -1
        })
    }
    const dialogProps = {
        title: "警告: 確定要刪除?",
        msg: testMsg.current,
        show: showDialog_del,
        hideFunc: switchShowDialog_D,
        clickConfirm: deleteUserFunc
    }

//---------------------------------------------------------------------------------------------------------------------修改使用者
    const [showDialog_U, setShowDialog_U] = useState(false)
    const switchShowDialog_U = (items) => { 
        setInputInfo({...inputInfo, ...items})
        setShowDialog_U(!showDialog_U)
    }

    const [inputInfo, setInputInfo] = useState(textInfo)

    const changeInputText = (event) => {  //保存編輯框文字
        const {id, value} = event.target
        setInputInfo({...inputInfo, [id]: value})
    }
    const changeInputSelect = (select, id) => {  //保存選擇框文字
        setInputInfo({...inputInfo, [id]: select.value})
    }

    const sendAlterInfo = () => {
        axiosInstance.post(process.env.REACT_APP_AlterUserInfo, { empToken: token, newInfo: inputInfo })
        .then(res => {
            console.log('修改成功')
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
            setInputInfo(textInfo)
            switchShowDialog_U()
        })
    }

    const alterUser = {
        title: "修改使用者",
        open: showDialog_U,
        close: switchShowDialog_U,
        changeInputText: changeInputText,
        changeInputSelect: changeInputSelect,
        submitPost: sendAlterInfo
    }

    const transferProps = {
        resData: resData,
        switchShowDialog_D: switchShowDialog_D,
        switchShowDialog_U: switchShowDialog_U
    }


    return (
        <>
            <TopItems></TopItems>
            <AddUser token = { token } />
            <DesktopJSX prop = { transferProps } />
            <MobileJSX prop = { transferProps } />
            <PageDiv>
                <PageBtn
                    color='info'
                    totalPage={totalPage}
                    nowPage={nowPage}
                    setNowPage={setNowPage}
                />
            </PageDiv>
            <CustDialog prop = {dialogProps}  />
            <ShareModal prop = {alterUser} inputInfo = { inputInfo } />
        </>
    )
}

export default Userinfo