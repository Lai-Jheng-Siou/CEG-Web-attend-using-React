import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import axiosInstance from "../../Instance/axiosInstance";

import { TopItems } from "../TopItem";
import Add_user from "./add_user";
import GetUserInfo from "./getUser";
import styled from "styled-components";

const PageDiv = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`


function User_info() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const token = userInfo['token']
    
    const [resData, setResData] = useState({})  //存放後端傳回資料
    const [totalPage, setTotalPage] = useState(-1)
    const [pageNow, setPageNow] = useState(1)

    useEffect(() => {  //取得SQL表數量
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(process.env.REACT_APP_GetTableLen, {
                    empToken: token,
                    tableName: 'empinfo'
                })
                setTotalPage(response.data[0].TOTAL_ROWS)
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
                    page: pageNow
                })
                
                setResData(response.data)
            }catch(err) {
                console.log(err)
            }
        }

        fetchData()
    }, [pageNow])

    const [disLast, setDisLast] = useState(true)
    const [disNext, setDisNext] = useState(false)

    const editPage = (st) => {
        switch(st) {
            case 'next':
                let nextPage = pageNow + 10
                setDisLast(false)
                setDisNext(nextPage + 10 >= totalPage ?true :false)
                setPageNow(nextPage)
                break;
            case 'last':
                let lastPage = pageNow - 10
                setDisLast(lastPage == 1 ?true :false)
                setDisNext(false)
                setPageNow(lastPage)
                break;
            case 'start':
                setDisLast(true)
                setDisNext(false)
                setPageNow(1)
                break;
            case 'end':
                let mod = totalPage % 10
                let diff = mod == 0 ?totalPage - 10 + 1 :totalPage - mod + 1
                setDisLast(false)
                setDisNext(true)
                setPageNow(diff)
                break;
        }
    }


    return(
        <>
            <TopItems></TopItems>
            <Add_user></Add_user>
            <GetUserInfo resData = { resData } token = { token } />
            <PageDiv>
                <Button variant="info" disabled={disLast} onClick={() => {editPage('start')}}>第一筆</Button>{' '}
                <Button variant="info" disabled={disLast} onClick={() => {editPage('last')}}>前一筆</Button>{' '}
                <Button variant="info" disabled={disNext} onClick={() => {editPage('next')}}>下一筆</Button>{' '}
                <Button variant="info" disabled={disNext} onClick={() => {editPage('end')}}>最後一筆</Button>{' '}
            </PageDiv>
        </>
    )
}

export default User_info