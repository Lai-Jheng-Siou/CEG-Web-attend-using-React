import styled from "styled-components"
import { device } from "../../rwdSize"
import { useState, useEffect } from "react"

import { Row, Col, Container } from "react-bootstrap"

import axiosInstance from "../../Instance/axiosInstance"

import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'
import { RecordSearch, RecordExport } from "./Record_Btn"

const CustCon = styled(Container)`  //主容器
`

const CustTitleR = styled(Row)`  //標題Row
    border: 2px solid #CFCFCF;

    @media screen and ${device.mobile} {
        display: none;
    }
`
const CustTitleC = styled(Col)`  //標題Col
    border-right: 2px solid #CFCFCF;

    @media screen and ${device.mobile} {
        padding: 5px 5px;
    }
    @media screen and ${device.tablet} {
        padding: 20px ;
    }
    @media screen and ${device.laptop} {
        
    }
`

const CustRow = styled(Row)`  //RWD 桌電 Row
    border: 2px solid #CFCFCF;

    @media screen and ${device.mobile} {
        display: none
        
    }
    @media screen and ${device.tablet} {
        margin-top: 10px;
        height: 150px;
    }
    @media screen and ${device.laptop} {
        margin-top: 0px;
    }
`
const CustCol = styled(Col)`  //RWD 桌電 Col
    border-right: 2px solid #CFCFCF;

    @media screen and ${device.mobile} {
        border-right: 0px;
        padding: 5px 5px;
    }

    @media screen and ${device.tablet}  {
        padding: 10px;
    }
    @media screen and ${device.laptop} {
        padding: 20px;
    }
`

const MobileRow = styled(Row)`  //RWD 手機 Row
    @media screen and ${device.mobile} {
        display: block;
        border-radius: 20px 20px 0px 0px;
        border: 2px solid #CFCFCF;
        margin: 20px;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    @media screen and ${device.tablet} {
        display: none;
    }
    @media screen and ${device.laptop} {
        display: none;
    }
`
const MobileCol = styled(Col)`  //RWD 手機 Col
    @media screen and ${device.mobile} {
        margin-top: 10px;
    }
`

export function AttendRecord() {
    let userInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_localStorage))
    const token = userInfo["token"]

    const [attendData, setAttendData] = useState({})

    useEffect(() => {
        axiosInstance.post(process.env.REACT_APP_GetAtdRecord, { empToken: token })
        .then(res => {
            setAttendData(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    // 測試看資料
    // useEffect(() => {
    //     console.log(attendData)
    // }, [attendData])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_Google_Api_Keys,
    })

    return (
        <CustCon>
            <div className="d-flex">
                <RecordSearch setAttendInfo = { setAttendData }/>
                <RecordExport attendInfo = { attendData } />
            </div>
            <CustTitleR>
                    <CustTitleC xs={12} md={1}>員工編號</CustTitleC>
                    <CustTitleC xs={12} md={1}>員工姓名</CustTitleC>
                    <CustTitleC xs={12} md={2}>打卡日期</CustTitleC>
                    <CustTitleC xs={12} md={2}>打卡時間</CustTitleC>
                    <CustTitleC xs={12} md={2}>打卡大樓</CustTitleC>
                    <CustTitleC xs={12} md={4}>定位</CustTitleC>
            </CustTitleR>
            {
                attendData && attendData.length > 0
                ?attendData.map((items, index) => (
                    <div>
                        <MobileRWD items = {items} index = {index} isLoaded = {isLoaded} />
                        <LaptopRWD items = {items} index = {index} isLoaded = {isLoaded} />
                    </div>
                ))
                :<CustRow>
                    <CustCol>無紀錄可顯示</CustCol>
                </CustRow>
            }
        </CustCon>
    )
}


function LaptopRWD(props) {  //大螢幕顯示這個
    const { items, index, isLoaded } = props

    return (
        <CustRow key={index}>
            <CustCol xs={12} md={1}>{items[0]}</CustCol>
            <CustCol xs={12} md={1}>{items[1]}</CustCol>
            <CustCol xs={12} md={2}>{items[2]}</CustCol>
            <CustCol xs={12} md={2}>{items[3]}</CustCol>
            <CustCol xs={12} md={2}>{items[4]}</CustCol>
            <CustCol xs={12} md={4}>
                {
                    !isLoaded
                    ?<div>Loading...</div>
                    :<GoogleMap
                        zoom = {14}
                        center = {{ lat: parseFloat(items[5].split(',')[0]), lng: parseFloat(items[5].split(',')[1]) }}
                        //   mapContainerClassName = 可以建立className, 設定地圖長寬...
                        options = {{
                            disableDefaultUI: true,  // 禁用默认的 UI 控件
                            zoomControl: true,      // 启用缩放控件
                        }}
                        mapContainerStyle = {{ width: 'auto', height: '135px', border: '1px solid #000000' }}
                        //   onLoad={handleMapLoad} loading事件處理，地圖加載時進行初始化操作
                        >
                        <MarkerF position={{ lat: parseFloat(items[5].split(',')[0]), lng: parseFloat(items[5].split(',')[1]) }} />
                    </GoogleMap>
                }
            </CustCol>
        </CustRow>
    )
}

function MobileRWD(props) {  //手機螢幕顯示這個
    const { items, index, isLoaded } = props

    return (
        <MobileRow key={index}>
            <MobileCol>員工編號: {items[0]}</MobileCol>
            <MobileCol>員工姓名: {items[1]}</MobileCol>
            <MobileCol>打卡日期: {items[2]}</MobileCol>
            <MobileCol>打卡時間: {items[3]}</MobileCol>
            <MobileCol>打卡大樓: {items[4]}</MobileCol>
            <MobileCol>定位: 
                {
                    !isLoaded
                    ?<div>Loading...</div>
                    :<GoogleMap
                        zoom = {14}
                        center = {{ lat: parseFloat(items[5].split(',')[0]), lng: parseFloat(items[5].split(',')[1]) }}
                        //   mapContainerClassName = 可以建立className, 設定地圖長寬...
                        options = {{
                            disableDefaultUI: true,  // 禁用默认的 UI 控件
                            zoomControl: true,      // 启用缩放控件
                        }}
                        mapContainerStyle = {{ width: 'auto', height: '135px', border: '1px solid #000000' }}
                        //   onLoad={handleMapLoad} loading事件處理，地圖加載時進行初始化操作
                        >
                        <MarkerF position={{ lat: parseFloat(items[5].split(',')[0]), lng: parseFloat(items[5].split(',')[1]) }} />
                    </GoogleMap>
                }
            </MobileCol>
        </MobileRow>
    )
}