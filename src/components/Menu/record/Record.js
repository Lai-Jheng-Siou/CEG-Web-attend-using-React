import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"

import { TopItems } from "../TopItem"

import { AttendRecord } from "./AttendRecord"


const CustRow = styled(Row)`
    border: 2px solid #CFCFCF;
    margin-top: 20px;
`
const CustCol = styled(Col)`
    padding: 5px;
    border-right: 2px solid #CFCFCF;
`


export default function Record() {
    return (
        <>
            <TopItems />
            <Container>
                <CustRow>
                    <CustCol xs={12} md={2}>員工ID</CustCol>
                    <CustCol xs={12} md={2}>打卡日期</CustCol>
                    <CustCol xs={12} md={2}>打卡時間</CustCol>
                    <CustCol xs={12} md={2}>打卡大樓</CustCol>
                    <CustCol xs={12} md={4}>定位</CustCol>
                </CustRow>
                <AttendRecord />
            </Container>
        </>

    )
}