import styled from "styled-components";
import { Container, Button, Form } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import { useState, useRef } from "react";
import Select from 'react-select'
import axiosInstance from "../../Instance/axiosInstance";

import { formFields, textInfo } from "./publicSource"

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

function Add_user(props) {
    const { token } = props

    const [showModal, setShowModal] = useState(false)
    const switchModal = () => { setShowModal(!showModal) }

    const [inputInfo, setInputInfo] = useState(textInfo)  //存放使用者輸入內容

    const changeInputText = (event) => {  //保存編輯框文字
        const {id, value} = event.target
        setInputInfo({...inputInfo, [id]: value})
    }
    const changeInputSelect = (select, id) => {  //保存選擇框文字
        setInputInfo({...inputInfo, [id]: select.value})
    }
    
    const isSending = useRef(false)
    const swtichSendingStateu = () => {
        isSending.current = !isSending.current
    }

    const submitPost = () => {  //提交新進員工申請
        swtichSendingStateu()
        switchModal()
        if(isSending) {
            const value = Object.values(inputInfo)
            console.log(value)
            axiosInstance.post(process.env.REACT_APP_CreateUserInfo, { empToken: token, value: value })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
    
            })
            .finally(() => {
                setInputInfo(textInfo)
                swtichSendingStateu()
            })
        } 
    }


    return (
        <>
            <CustCon>
                <Button onClick={switchModal}>新增</Button>
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