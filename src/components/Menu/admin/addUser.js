import styled from "styled-components";
import { Container, Button, Form } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import Select from 'react-select'
import axiosInstance from "../../Instance/axiosInstance";

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
    justify-content: center;
`

function Add_user() {
    let userInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_localStorage))
    const token = userInfo['token']

    const [showModal, setShowModal] = useState(false)
    const switchModal = () => { setShowModal(!showModal) }

    const [isSending, setIsSending] = useState(false)
    const switchSending = () => {
        setIsSending(isSending)
    }

    let userInput = {
        account: '',
        password: '',
        userName: '',
        department: '',
        userEmail: '',
        userAccess: ''
    }

    const [inputInfo, setInputInfo] = useState(userInput)  //存放使用者輸入內容

    const changeInputText = (event) => {  //保存編輯框文字
        const {id, value} = event.target
        setInputInfo({...inputInfo, [id]: value})
    }
    const changeInputSelect = (select, id) => {  //保存選擇框文字
        setInputInfo({...inputInfo, [id]: select.value})
    }
    
    const formFields = [
        { id: 'account', label: '使用者帳號', type: 'text' },
        { id: 'password', label: '使用者密碼', type: 'text' },
        { id: 'userName', label: '使用者名稱', type: 'text'  },
        { id: 'department', label: '部門', type: 'select', option: departmentOption },
        { id: 'userEmail', label: '信箱', type: 'text' },
        { id: 'userAccess', label: '權限', type: 'select', option: accessOption }
    ]

    const submitPost = () => {  //提交新進員工申請
        switchModal()
        const value = Object.values(inputInfo)
        axiosInstance.post(process.env.REACT_APP_CreateUserInfo, { empToken: token, value: value })
        .then(res => {
            console.log(res)
        })
        .catch(e => {

        })
        .finally(() => {
            setInputInfo(userInput)
        })
    }


    return (
        <>
        <CustCon>
            <Button onClick={switchModal}>新增</Button>{" "}
            <Button variant="danger">刪除</Button>
        </CustCon>
        <Modal open={showModal} onClose={switchModal} center>
            <h2>新增使用者</h2>
            <ModalForm>
                {
                    formFields.map(item => (
                        <div key = {item.id}>
                            <FormLabel htmlFor = {item.id}>{item.label}</FormLabel>
                            {
                                item.type === 'text'
                                ?<FormInput id = {item.id} type = {item.type} value = {inputInfo[item.id]} onChange = {changeInputText} />
                                :<Select options={item.option} onChange={ (select) => {changeInputSelect(select, item.id)} } />
                            }
                        </div>
                    ))
                }
                <DivBtn>
                    <Button onClick={submitPost}>送出</Button>{" "}
                </DivBtn>
            </ModalForm>
        </Modal>
        </>
    )
}

export default Add_user