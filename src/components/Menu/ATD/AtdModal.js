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
const FormLabel = styled(Form.Label)`

`
const FormInput = styled(Form.Control)`

`
const Btn = styled.div`
    display: flex
    height: 10vh;
    padding: 10px;
    justify-content: center;
`

const AddAttendModal = () => {
    const { open, switchModal, token , setTitle, setMsg, switchDialog} = useContext(atdBtnContext)

    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        
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
                    setIpLoc(`獲取位置失敗: ${error.message}`)
                }
            );
            } else {
                setIpLoc('瀏覽器不支援 Geolocation API')
            }
    }, [open])

    const sendInfo = async() => {
        try{
            const response = await axiosInstance.post(process.env.REACT_APP_AddAttend, {
                empId: userInfo.empId,
                atdDate: date,
                atdTime: time,
                ip: ipLoc,
                buildId: buildId,
                empToken: token
            })

            if (response.data && response.data.success) {
                setMsg('新增成功')
            } else {
                setMsg('新增失敗: ' + response.data.error)
            }
            switchModal()
            setTitle('訊息')
            switchDialog()
        } catch (err){
            console.log(err)
        } finally {}
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