import { departmentOption, accessOption } from "../../Customize_Tool/selectOptions";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import Select from 'react-select'


export const textInfo = {
    account: '',
    password: '',
    name: '',
    department: '',
    email: '',
    access: ''
}

export const formFields = [
    { id: 'account', label: '帳號', type: 'text' },
    { id: 'password', label: '密碼', type: 'text' },
    { id: 'name', label: '姓名', type: 'text'  },
    { id: 'department', label: '部門', type: 'select', option: departmentOption },
    { id: 'email', label: '信箱', type: 'text' },
    { id: 'access', label: '權限', type: 'select', option: accessOption }
]


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
export function ShareModal(props) {
    const { prop, inputInfo } = props

    /*
    prop = {
        title: "",
        open: ,
        close: ,
        changeInputText: ,
        changeInputSelect: ,
        submitPost: 
    }
    */

    return (
        <Modal open={prop.open} onClose={prop.close} center>
            <h2>{prop.title}</h2>
            <ModalForm>
                {
                    formFields.map(item => (
                        <div key = {item.id}>
                            <FormLabel htmlFor = {item.id}>{item.label}</FormLabel>
                            {
                                item.type === 'text'
                                ?<FormInput id = {item.id} type = {item.type} value = {inputInfo[item.id]} onChange = {prop.changeInputText} />
                                :<Select 
                                    options={item.option} 
                                    value = { item.option.find(option => option.value === inputInfo[item.id]) }
                                    onChange={ (select) => {prop.changeInputSelect(select, item.id)} } 
                                />
                            }
                        </div>
                    ))
                }
                <DivBtn>
                    <Button onClick={() => prop.submitPost() }>送出</Button>{" "}
                </DivBtn>
            </ModalForm>
        </Modal>
    )
}