import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

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


function User_info() {
    const remainder = 10

    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const token = userInfo['token']
    
    const [resData, setResData] = useState({})  //存放後端傳回資料
    const [totalPage, setTotalPage] = useState(-1)
    const [nowPage, setNowPage] = useState(1)

    useEffect(() => {  //取得SQL表數量
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(process.env.REACT_APP_GetTableLen, {
                    empToken: token,
                    tableName: 'empinfo'
                })
                let total_rows = response.data[0].TOTAL_ROWS
                
                setTotalPage(Math.floor(total_rows / remainder) + 1)
            }catch(err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {  //跟後端溝通
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(process.env.REACT_APP_GetUserInfo, {
                    empToken: token,
                    page: nowPage * remainder - 9
                })
                
                setResData(response.data)
            }catch(err) {
                console.log(err)
            }
        }

        fetchData()
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

export default User_info