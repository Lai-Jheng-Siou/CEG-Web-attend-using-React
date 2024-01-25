import styled from "styled-components"
import { device } from "../../rwdSize"
import { useContext } from "react"
import recordContext from "./recordContext"

import { Row, Col } from "react-bootstrap"

import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'


const Cust_Row = styled(Row)`
    border: 2px solid #CFCFCF;

    @media ${device.tablet} {
        height: 150px;
    }

    @media ${device.mobileL} {
    }
`
const Cust_Col = styled(Col)`
    border-right: 2px solid #CFCFCF;

    @media ${device.tablet} {
        padding: 20px ;
    }

    @media ${device.mobileL} {
        padding: 5px 5px;
    }
`

export function AttendRecord() {
    const { attendData } = useContext(recordContext)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC6bOOHbvxnvgmyPAVeT9_Fzoav6Bmsmqs',
      })

    return (
        attendData && attendData.length > 0
        ?attendData.map((items, index) => (
            <Cust_Row key={index}>
                <Cust_Col xs={12} md={2}>{items.empId}</Cust_Col>
                <Cust_Col xs={12} md={2}>{items.atdDate}</Cust_Col>
                <Cust_Col xs={12} md={2}>{items.atdTime}</Cust_Col>
                <Cust_Col xs={12} md={2}>{items.BuildId}</Cust_Col>
                <Cust_Col xs={12} md={4}>
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
                </Cust_Col>
            </Cust_Row>
        ))
        :<Cust_Row>
            <Cust_Col>無紀錄可顯示</Cust_Col>
        </Cust_Row>
    )
} 