import styled from "styled-components";
import { Container, Button, Form } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import Select from 'react-select'

import { accessOption, departmentOption } from "../../Customize_Tool/selectOptions";

const CustCon = styled(Container)`
    margin-top: 20px;
`
const ModalForm = styled.div`
    width: 40vh;
    display: flex;
    flex-direction: column;
    font-family: Song;
`
const FormLabel = styled(Form.Label)`
    margin-top: 20px;
`
const FormInput = styled(Form.Control)`
`

const DivBtn = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`

function Add_user() {
    const [showModal, setShowModal] = useState(false)
    const switchModal = () => { setShowModal(!showModal) }

    const [submit, setSubmit] = useState(false)
    const sendSubmit = () => { setSubmit(!submit) }

    useEffect(() => {
        //寫提交申請請求至後端
    }, [submit])


    return (
        <>
        <CustCon>
            <Button onClick={switchModal}>新增</Button>{" "}
            <Button variant="danger">刪除</Button>
        </CustCon>
        <Modal open={showModal} onClose={switchModal} center>
            <h2>新增使用者</h2>
            <ModalForm>
                <FormLabel htmlFor="account">使用者帳號</FormLabel>
                <FormInput id="account"></FormInput>
                <FormLabel htmlFor="password">使用者密碼</FormLabel>
                <FormInput id="password"></FormInput>
                <FormLabel htmlFor="userName">姓名</FormLabel>
                <FormInput id="userName"></FormInput>
                <FormLabel htmlFor="department">部門</FormLabel>
                <Select options={ departmentOption } />
                <FormLabel htmlFor="userEmail">信箱</FormLabel>
                <FormInput id="userEmail"></FormInput>
                <FormLabel htmlFor="userAccess">權限</FormLabel>
                <Select options={ accessOption } />
                 <DivBtn>
                    <Button onClick={sendSubmit}>送出</Button>{" "}
                    <Button variant="danger">取消</Button>
                 </DivBtn>
            </ModalForm>
        </Modal>
        </>
    )
}

export default Add_user