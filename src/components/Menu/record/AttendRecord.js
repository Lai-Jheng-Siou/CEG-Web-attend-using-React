import styled from "styled-components"
import { device } from "../../rwdSize"
import { useState, useEffect } from "react"

import { Row, Col, Container } from "react-bootstrap"

import axiosInstance from "../../Instance/axiosInstance"

import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'
import { RecordSearch, RecordExport } from "./Record_Btn"

const CustCon = styled(Container)`
`

const CustTitleR = styled(Row)`
    border: 2px solid #CFCFCF;
`
const CustTitleC = styled(Col)`
    border-right: 2px solid #CFCFCF;
    @media ${device.tablet} {
        padding: 20px ;
    }

    @media ${device.mobileL} {
        padding: 5px 5px;
    }
`

const CustRow = styled(Row)`
    border: 2px solid #CFCFCF;

    @media ${device.tablet} {
        height: 150px;
    }

    @media ${device.mobileL} {
    }
`
const CustCol = styled(Col)`
    border-right: 2px solid #CFCFCF;

    @media ${device.tablet} {
        padding: 20px ;
    }

    @media ${device.mobileL} {
        padding: 5px 5px;
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

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_Google_Api_Keys,
    })

    return (
        <CustCon>
            <div className="d-flex">
                <RecordSearch />
                <RecordExport attendInfo = { attendData } />
            </div>
            {/* <RecordBtn /> */}
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
                    <CustRow key={index}>
                        <CustCol xs={12} md={1}>{items[0]}</CustCol>
                        <CustCol xs={12} md={1}>{items[5]}</CustCol>
                        <CustCol xs={12} md={2}>{items[1]}</CustCol>
                        <CustCol xs={12} md={2}>{items[2]}</CustCol>
                        <CustCol xs={12} md={2}>{items[4]}</CustCol>
                        <CustCol xs={12} md={4}>
                            {
                            !isLoaded
                            ?<div>Loading...</div>
                            :<GoogleMap
                                zoom = {14}
                                center = {{ lat: parseFloat(items[3].split(',')[0]), lng: parseFloat(items[3].split(',')[1]) }}
                                //   mapContainerClassName = 可以建立className, 設定地圖長寬...
                                options = {{
                                    disableDefaultUI: true,  // 禁用默认的 UI 控件
                                    zoomControl: true,      // 启用缩放控件
                                }}
                                mapContainerStyle = {{ width: 'auto', height: '135px', border: '1px solid #000000' }}
                                //   onLoad={handleMapLoad} loading事件處理，地圖加載時進行初始化操作
                                >
                                <MarkerF position={{ lat: parseFloat(items[3].split(',')[0]), lng: parseFloat(items[3].split(',')[1]) }} />
                            </GoogleMap>
                            }
                        </CustCol>
                    </CustRow>
                ))
                :<CustRow>
                    <CustCol>無紀錄可顯示</CustCol>
                </CustRow>
            }
        </CustCon>
    )
} 