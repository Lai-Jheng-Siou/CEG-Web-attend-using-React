import { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form } from "react-bootstrap";

//react icon
import { CiEdit } from "react-icons/ci";  
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import { FormControl } from "../../../Customize_Tool/Cust_UI";
import axiosInstance from "../../Instance/axiosInstance";


const CustCon = styled(Container)`
    margin-top: 20px;
`

const CustRow = styled(Row)`
    border: 1px solid #000000;
    background-color: ${(props) => (props.isEven ? '#D3D3D3' : '#fff')};
`

const CustCol = styled(Col)`
    border: 1px solid #000000;
`

const CustColmin = styled(Col)`
    border: 2px solid #000000;
    max-width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Custtext = styled.p`
    display: flex;
    align-items: center;
    padding-top: 15px;
`


function GetUserInfo(props) {  //傳入參數需有 表格title, token, api address
    const { resData, token } = props

    const [ checkBtn, setCheckBtn ] = useState(new Set())  //存放選取框是否勾選
    
    //單一選取框操作
    const click_singleCheckBtn = (index) => {  
        setCheckBtn((prevCheckBtn) => {
            const newCheckBtn = new Set(prevCheckBtn);
        
            if (newCheckBtn.has(index)) {
                newCheckBtn.delete(index); // 如果已經存在，刪除
            } else {
                newCheckBtn.add(index); // 如果不存在，新增
            }
        
            return newCheckBtn;
          });
    }
    //全部選取框操作
    const click_allCheckBtn = () => {
        setCheckBtn((prevCheckBtn) => {
            const newCheckBtn = new Set(prevCheckBtn)

            if(newCheckBtn.size === 0) {
                let len = resData.length
                for(let i = 0; i < len; i++) { newCheckBtn.add(i) }
            }else {
                newCheckBtn.clear()
            }
            return newCheckBtn
        })
    }

    //編輯鍵操作
    const [ isEdit, setIsEdit ] = useState(false)  //確認狀態是否在編輯
    const [ editId, setEditId ] = useState(-1)  //存放編輯中ID
    const [ dis_checkBtn, setDis_checkBtn ] = useState(false)  //當編輯時 禁用勾選框
    const [ isTick, setIsTick ] = useState(false)  //當按下勾選框時
    const handleTick = () => {
        setIsTick(!isTick)
    }

    //編輯暫存
    const [ tmpName, setTmpName ] = useState('')
    const [ depName, setDepName ] = useState('')
    const [ empAcc, setEmpAcc ] = useState('')
    const [ empPasd, setEmpPasd ] = useState('')
    const [ empEmail, setEmpEmail ] = useState('')
    const [ empAccess, setEmpAccess ] = useState('')

    const tmpMap = new Map()  //集中裝存暫存資料 以方便迭代
    tmpMap.set('name', [tmpName, setTmpName])
    tmpMap.set('depName', [depName, setDepName])
    tmpMap.set('account', [empAcc, setEmpAcc])
    tmpMap.set('password', [empPasd, setEmpPasd])
    tmpMap.set('email', [empEmail, setEmpEmail])
    tmpMap.set('access', [empAccess, setEmpAccess])

    const handleEdit = (index) => {
        if (!isEdit) {
            for (let indexId = 0; indexId < resData.length; indexId++) {
                const item = resData[indexId];
                if (index === indexId) {
                    setTmpName(item.name);
                    setDepName(item.depName);
                    setEmpAcc(item.empId);
                    setEmpPasd(item.pasd);
                    setEmpEmail(item.email);
                    setEmpAccess(item.access);
                }
            }
        }
        setIsEdit(!isEdit)
        setDis_checkBtn(!dis_checkBtn)
        setEditId(index)
    }

    //當編輯完成 按下勾勾時動作
    useEffect(() => {
        if(isTick) {
            const fetch = async() => {
                try {
                    const response = await axiosInstance('', {
                        empToken: token,
                        
                    })
                    let isSuccess = response.data.isSuccess
                    if(isSuccess) {
                        //如果成功返回 將tmp資料修改進當前表格
                    }
                }catch(e) {
                    console.log(e)
                }finally {
                    //不管成功與否 清除tmp表格  並解除修改模式
                    for(let [, setValue] of tmpMap.values()) {
                        setValue('')
                    }
                    setEditId(-1)
                    setIsEdit(false)
                    setDis_checkBtn(false)
                }
            }
            fetch()
        }
    }, [isTick])

    
    return (
        <CustCon>
            <CustRow key={"head"}>
                <CustColmin>編輯</CustColmin>
                <CustColmin>
                    <Form.Check 
                        type = "checkbox"
                        name = "titleChecked"
                        disabled = {dis_checkBtn}
                        checked = { checkBtn.size }
                        onClick={() => {click_allCheckBtn()}}
                        onChange={() => {  }}
                    />
                </CustColmin>
                <CustCol><Custtext>姓名</Custtext></CustCol>
                <CustCol><Custtext>部門</Custtext></CustCol>
                <CustCol><Custtext>帳號</Custtext></CustCol>
                <CustCol><Custtext>密碼</Custtext></CustCol>
                <CustCol><Custtext>信箱</Custtext></CustCol>
                <CustCol><Custtext>權限</Custtext></CustCol>
            </CustRow>
            {
                resData && resData.length > 0
                ?resData.map((item, index) => (
                    isEdit && editId === index
                    ?<CustRow key = { index } isEven = { index % 2 === 0 }>
                        <CustColmin>
                            <TiTick style = {{ fontSize: "25px", cursor: 'pointer' }} onClick={ () => { handleTick() } } />
                        </CustColmin>
                        <CustColmin>
                            <ImCross style = {{ fontSize: "15px", cursor: 'pointer' }} onClick = { () => { handleEdit(-1) } } />
                        </CustColmin>
                        {
                            Array.from(tmpMap).map(([key, [value, setValue]]) => (
                                <CustCol>
                                    <FormControl type = "text" name = { key } value = { value } onChange = { setValue } />
                                </CustCol>
                            ))
                        }
                    </CustRow>
                    :<CustRow key = { index } isEven = { index % 2 === 0 }>
                        <CustColmin>
                            <CiEdit style={{ cursor: 'pointer' }} onClick = { () => { handleEdit(index) } } />
                        </CustColmin>
                        <CustColmin>
                            <Form.Check 
                                type = "checkbox"
                                name = "singleChecked"
                                disabled = {dis_checkBtn}
                                checked = {checkBtn.has(index)}
                                onClick={() => click_singleCheckBtn(index)}
                                onChange={() => {  }}
                            />
                        </CustColmin>
                        <CustCol>
                            <Custtext>{item.name}</Custtext>
                        </CustCol>
                        <CustCol>
                            <Custtext>{item.depName}</Custtext>
                        </CustCol>
                        <CustCol>
                            <Custtext>{item.empId}</Custtext>
                        </CustCol>
                        <CustCol>
                            <Custtext>{item.pasd}</Custtext>
                        </CustCol>
                        <CustCol>
                            <Custtext>{item.email}</Custtext>
                        </CustCol>
                        <CustCol>
                            <Custtext>{item.access}</Custtext>
                        </CustCol>
                    </CustRow>
                ))
                :<></>
            }
        </CustCon>
    )
}


export default GetUserInfo;