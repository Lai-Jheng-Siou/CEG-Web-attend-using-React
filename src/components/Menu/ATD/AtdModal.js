import {React, useContext, useEffect, useState} from "react"
import { Modal } from "react-responsive-modal";
import atdBtnContext from "./BtnContext";
import styled from "styled-components";
import { Form, Button } from 'react-bootstrap'
import axiosInstance from '../../Instance/axiosInstance'

const ModalForm = styled.div`
    width: 40vh;
    display: flex;
    flex-direction: column;
    font-family: Song;
`
const FormLabel = styled(Form.Label)``
const FormInput = styled(Form.Control)``
const Btn = styled.div`
    display: flex
    height: 10vh;
    padding: 10px;
    justify-content: center;
`

const AddAttendModal = () => {
    const { open, switchModal, token , setTitle, setMsg, switchDialog } = useContext(atdBtnContext)

    let userInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_localStorage))
        
    const currentDate = new Date()
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    let date = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
    let time = `${hours}:${minutes}:${seconds}`

    const [ipLoc, setIpLoc] = useState('')
    const [buildId, setBuildId] = useState('')

    useEffect(() => {
        if (open && 'geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setIpLoc(`${position.coords.latitude},${position.coords.longitude}`)
                },
                (error) => {
                    let errorMessage = '未知错误';
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = '用户拒绝了位置权限请求';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = '位置信息不可用';
                            break;
                        case error.TIMEOUT:
                            errorMessage = '获取位置超时';
                            break;
                        default:
                            errorMessage = `获取位置失败: ${error.message}`;
                    }
                    console.log(`获取位置失败: ${errorMessage}`)
                }
            );
        }
    }, [open])

    const sendInfo = () => {
        axiosInstance.post(process.env.REACT_APP_AddAttend, {
            empId: userInfo.empId,
            atdDate: date,
            atdTime: time,
            ip: ipLoc,
            buildId: buildId,
            empToken: token
        })
        .then(res => {
            if(res.data && res.data.success) {
                setMsg('新增成功')
            }else {
                setMsg('新增失敗: ' + res.data.error)
            }
            switchModal()
            setTitle('訊息')
            switchDialog()
        })
        .catch(e => {
            console.log(e)
        })
    }

    return(
        <Modal open={open} onClose={switchModal} center>
            <h2>線上刷卡系統</h2>
            <ModalForm>
                <FormLabel htmlFor="empId">員工編號</FormLabel>
                <h6>{userInfo.empId}</h6>

                <FormLabel htmlFor="name">姓名</FormLabel>
                <h6>{userInfo.name}</h6>

                <FormLabel htmlFor="atdDate">日期</FormLabel>
                <h6>{date}</h6>

                <FormLabel htmlFor="atdTime">時間</FormLabel>
                <h6>{time}</h6>

                <FormLabel htmlFor="Ip">定位</FormLabel>
                <h6>{ipLoc}</h6>

                <FormLabel htmlFor="buildId">大樓編號</FormLabel>
                <FormInput type="text" id="buildId" onChange={(e) => {setBuildId(e.target.value)}}/>
                <Btn>
                    <Button onClick={sendInfo}>送出</Button>{' '}
                    <Button variant="danger" onClick={switchModal}>取消</Button>
                </Btn>
            </ModalForm>
        </Modal>
    )
}

export default AddAttendModal