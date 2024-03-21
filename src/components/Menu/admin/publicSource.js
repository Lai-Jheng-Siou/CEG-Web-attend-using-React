import { departmentOption, accessOption } from "../../Customize_Tool/selectOptions";

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