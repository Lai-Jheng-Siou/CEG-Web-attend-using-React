import styled from "styled-components"
import { device } from "../../rwdSize"
import { useState, useEffect } from "react"

import { Row, Col } from "react-bootstrap"

import axiosInstance from "../../Instance/axiosInstance"

import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'

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
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const token = userInfo["token"]

    const [attendData, setAttendData] = useState({})

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosInstance.post('/record', {
                    empToken: token
                })
                setAttendData(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_Google_Api_Keys,
      })
      console.log()
    return (
        attendData && attendData.length > 0
        ?attendData.map((items, index) => (
            <CustRow key={index}>
                <CustCol xs={12} md={2}>{items.empId}</CustCol>
                <CustCol xs={12} md={2}>{items.atdDate}</CustCol>
                <CustCol xs={12} md={2}>{items.atdTime}</CustCol>
                <CustCol xs={12} md={2}>{items.BuildId}</CustCol>
                <CustCol xs={12} md={4}>
                    {
                    !isLoaded 
                    ?<div>Loading...</div>
                    :<GoogleMap
                        zoom = {14}
                        center = {{ lat: parseFloat(items.Ip.split(',')[0]), lng: parseFloat(items.Ip.split(',')[1]) }}
                        //   mapContainerClassName = 可以建立className, 設定地圖長寬...
                        options = {{
                            disableDefaultUI: true,  // 禁用默认的 UI 控件
                            zoomControl: true,      // 启用缩放控件
                        }}
                        mapContainerStyle = {{ width: 'auto', height: '135px', border: '1px solid #000000' }}
                        //   onLoad={handleMapLoad} loading事件處理，地圖加載時進行初始化操作
                        >
                        <Marker position={{ lat: parseFloat(items.Ip.split(',')[0]), lng: parseFloat(items.Ip.split(',')[1]) }}></Marker>
                    </GoogleMap>
                    }
                </CustCol>
            </CustRow>
        ))
        :<CustRow>
            <CustCol>無紀錄可顯示</CustCol>
        </CustRow>
    )
} 