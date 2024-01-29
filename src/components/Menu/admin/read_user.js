import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";

import { TopItems } from "../TopItem";
import GetUserIngo from "./getUser";
import Add_user from "./add_user";

import { CiEdit } from "react-icons/ci";


const Cust_Row = styled(Row)`
    margin-top: 20px;
    background-color: ${(props) => (props.isEven ? '#D3D3D3' : '#fff')};
`
const Cust_Col_min = styled(Col)`
    border: 2px solid #CFCFCF;
    max-width: 45px;
`

const Cust_Col = styled(Col)`
    border: 2px solid #CFCFCF;
`


function User_info() {



    return(
        <>
            <TopItems></TopItems>
            <Add_user></Add_user>
            <Container >
                <Cust_Row isOdd>
                    <Cust_Col_min className="col-1 ">編輯</Cust_Col_min>
                    <Cust_Col_min className="col-1">
                        <Form.Check 
                            type = "checkbox"
                        ></Form.Check>
                    </Cust_Col_min>
                    <Cust_Col className="col-2">使用者帳號</Cust_Col>
                    <Cust_Col className="col-2">密碼</Cust_Col>
                    <Cust_Col className="col-2">Email</Cust_Col>
                    <Cust_Col className="col-2">姓名</Cust_Col>
                    <Cust_Col className="col-2">權限</Cust_Col>
                </Cust_Row>
                <GetUserIngo />

            </Container>
        </>
    )
}

export default User_info