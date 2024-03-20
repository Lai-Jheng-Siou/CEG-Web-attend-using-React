import { useState, useEffect } from "react";

import axiosInstance from "../../Instance/axiosInstance";

import { TopItems } from "../TopItem";
import AddUser from "./addUser";
import GetUserInfo from "./getUser";
import styled from "styled-components";
import PageBtn from "./PageButton";

const PageDiv = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`


function Userinfo() {
    let userInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_localStorage))
    const token = userInfo['token']
    
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
            let page = total_rows % remainder == 0 ?total_rows / remainder :Math.floor(total_rows / remainder) + 1
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


    return(
        <>
            <TopItems></TopItems>
            <AddUser token = { token } />
            <GetUserInfo resData = { resData } setResData = { setResData } token = { token } />
            <PageDiv>
                <PageBtn
                    color='info'
                    totalPage={totalPage} 
                    nowPage={nowPage} 
                    setNowPage={setNowPage} 
                />
            </PageDiv>
            
        </>
    )
}

export default Userinfo