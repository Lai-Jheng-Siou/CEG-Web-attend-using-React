import { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form } from "react-bootstrap";

import { device } from "../../rwdSize"

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
    background-color: ${(props) => (props.iseven ? '#D3D3D3' : '#fff')};
`
const CustCol = styled(Col)`
    border: 1px solid #000000;

    @media ${device.mobile} {
        border: 0px
    }
`
const CustColmin = styled(Col)`
    border: 2px solid #000000;
    max-width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;

    @media ${device.mobile} {
        max-width: 40px;
        font-size: 20px;
    }
`
const Custtext = styled.p`
    display: flex;
    align-items: center;
    padding-top: 15px;
    font-size: 14px;

    @media ${device.mobile} {
        font-size: 10px;
    }
`

const MobileRow = styled(Row)`
`
const MobileCol = styled(Col)`
`


function GetUserInfo(props) {  //傳入參數需有 表格title, token, api address
    const { resData, token } = props

    const titleText = ['帳號', '密碼', '姓名', '部門', '信箱', '權限']

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

        if(isTick) {
            const tmp = []
            for(let i of tmpMap.entries()) {
                tmp.push(i[1][0])
            }

            axiosInstance('/alterUser', { empToken: token, newInfo: tmp})
            .then(res => {
                if(res.data.isSuccess) {
                    //如果成功返回 將tmp資料修改進當前表格
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                //不管成功與否 清除tmp表格  並解除修改模式
                for(let [, setValue] of tmpMap.values()) {
                    setValue('')
                }
                setEditId(-1)
                setIsEdit(false)
                setDis_checkBtn(false)
            })
        }
    }


    //編輯暫存
    const [ tmpName, setTmpName ] = useState('')
    const [ depName, setDepName ] = useState('')
    const [ empAcc, setEmpAcc ] = useState('')
    const [ empPasd, setEmpPasd ] = useState('')
    const [ empEmail, setEmpEmail ] = useState('')
    const [ empAccess, setEmpAccess ] = useState('')

    const tmpMap = new Map()  //集中裝存暫存資料 以方便迭代
    tmpMap.set('account', [empAcc, setEmpAcc])
    tmpMap.set('password', [empPasd, setEmpPasd])
    tmpMap.set('name', [tmpName, setTmpName])
    tmpMap.set('depName', [depName, setDepName])
    tmpMap.set('email', [empEmail, setEmpEmail])
    tmpMap.set('access', [empAccess, setEmpAccess])

    const handleEdit = (index) => {
        if (!isEdit) {
            for (let indexId = 0; indexId < resData.length; indexId++) {
                const items = resData[indexId];
                if (index === indexId) {
                    setEmpAcc(items[0]);
                    setEmpPasd(items[1]);
                    setTmpName(items[2]);
                    setDepName(items[3]);
                    setEmpEmail(items[4]);
                    setEmpAccess(items[5]);
                }
            }
        }
        setIsEdit(!isEdit)
        setDis_checkBtn(!dis_checkBtn)
        setEditId(index)
    }

    
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
                {
                    titleText.map(text => (
                        <CustCol><Custtext>{text}</Custtext></CustCol>
                    ))
                }
            </CustRow>
            {
                resData && resData.length > 0
                ?resData.map((items, index) => (
                    isEdit && editId === index
                    ?<CustRow key = { index } iseven = { index % 2 === 0 }>
                        <CustColmin>
                            <TiTick style = {{ fontSize: "25px", cursor: 'pointer' }} onClick={ () => { handleTick() } } />
                        </CustColmin>
                        <CustColmin>
                            <ImCross style = {{ fontSize: "15px", cursor: 'pointer' }} onClick = { () => { handleEdit(-1) } } />
                        </CustColmin>
                        {
                            Array.from(tmpMap).map(([key, [value, setValue]]) => (
                                <CustCol>
                                    {
                                        key === "account"
                                        ?<Custtext>{value}</Custtext>
                                        :<FormControl type = "text" name = { key } value = { value } onChange = { setValue } />
                                    } 
                                </CustCol>
                            ))
                        }
                    </CustRow>
                    :<CustRow key = { index } iseven = { index % 2 === 0 }>
                        <CustColmin>
                            <CiEdit style={{ fontSize: "20px", cursor: 'pointer' }} onClick = { () => { handleEdit(index) } } />
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
                        {
                            items.map(item => (
                                <CustCol>
                            <Custtext>{item}</Custtext>
                        </CustCol>
                            ))
                        }
                    </CustRow>
                ))
                :<></>
            }
        </CustCon>
    )
}


export default GetUserInfo;