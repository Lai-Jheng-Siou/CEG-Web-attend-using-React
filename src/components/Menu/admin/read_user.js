import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";

import { TopItems } from "../TopItem";
import Add_user from "./add_user";

const Cust_div = styled.div`
    margin-top: 20px;
`

const Cust_Row = styled(Row)`
    margin-top: 20px;
    background-color: ${(props) => (props.isEven ? '#D3D3D3' : '#fff')};
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
                    <Cust_Col className="col-1"></Cust_Col>
                    <Cust_Col className="col-1">
                        <Form.Check 
                            type = "checkbox"
                        ></Form.Check>
                    </Cust_Col>
                    <Cust_Col className="col-2">使用者帳號</Cust_Col>
                    <Cust_Col className="col-2">密碼</Cust_Col>
                    <Cust_Col className="col-2">Email</Cust_Col>
                    <Cust_Col className="col-2">姓名</Cust_Col>
                    <Cust_Col className="col-2">權限</Cust_Col>
                </Cust_Row>
            </Container>
        </>
    )
}

export default User_info