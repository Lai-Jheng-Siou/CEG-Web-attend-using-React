import { useState, useEffect } from "react";

import axiosInstance from "../../Instance/axiosInstance";

import { TopItems } from "../TopItem";
import Add_user from "./add_user";
import GetUserInfo from "./getUser";
import styled from "styled-components";
import PageBtn from "./PageButton";

const PageDiv = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`


function Userinfo() {
    const remainder = 10

    let userInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_localStorage))
    const token = userInfo['token']
    
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
            setTotalPage(Math.floor(total_rows / remainder) + 1)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    useEffect(() => {  //跟後端溝通
        axiosInstance.post(process.env.REACT_APP_GetUserInfo, {
            empToken: token,
            page: nowPage * remainder - 9
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
            <Add_user></Add_user>
            <GetUserInfo resData = { resData } token = { token } />
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