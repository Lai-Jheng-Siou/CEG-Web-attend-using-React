import styled from "styled-components";
import { Container, Button, Form } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";

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
`
const FormInput = styled(Form.Control)`
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
                <FormLabel htmlFor="userAccount">使用者帳號</FormLabel>
                <FormInput id="userAccount"></FormInput>
                <FormLabel htmlFor="password">使用者密碼</FormLabel>
                <FormInput id="password"></FormInput>
                <FormLabel htmlFor="userName">姓名</FormLabel>
                <FormInput id="userName"></FormInput>
                <FormLabel htmlFor="userEmail">信箱</FormLabel>
                <FormInput id="userEmail"></FormInput>
                <FormLabel htmlFor="userAccess">權限</FormLabel>
                <Form.Check
                    type="radio"
                    label="一般"
                 />
                 <Form.Check
                    type="radio"
                    label="管理"
                 />
                 <div>
                    <Button onClick={sendSubmit}>送出</Button>{" "}
                    <Button variant="danger">取消</Button>
                 </div>
            </ModalForm>
        </Modal>
        </>
    )
}

export default Add_user