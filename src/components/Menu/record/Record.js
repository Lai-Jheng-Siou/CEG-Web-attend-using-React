import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"

import { TopItems } from "../TopItem"
import axiosInstance from "../../Instance/axiosInstance"

import recordContext from "./recordContext"

import { AttendRecord } from "./AttendRecord"


const Cust_Row = styled(Row)`
    border: 2px solid #CFCFCF;
    margin-top: 20px;
`
const Cust_Col = styled(Col)`
    padding: 5px;
    border-right: 2px solid #CFCFCF;
`


export default function Record() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const token = userInfo["token"]

    const [attendData, setAttendData] = useState({})

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosInstance.post('/record', {
                    empToken: token
                })
                setAttendData(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <TopItems />
            <Container>
                <Cust_Row>
                    <Cust_Col xs={12} md={2}>員工ID</Cust_Col>
                    <Cust_Col xs={12} md={2}>打卡日期</Cust_Col>
                    <Cust_Col xs={12} md={2}>打卡時間</Cust_Col>
                    <Cust_Col xs={12} md={2}>打卡大樓</Cust_Col>
                    <Cust_Col xs={12} md={4}>定位</Cust_Col>
                </Cust_Row>
                <recordContext.Provider value={{attendData}}>
                    <AttendRecord />
                </recordContext.Provider>
            </Container>
        </>

    )
}