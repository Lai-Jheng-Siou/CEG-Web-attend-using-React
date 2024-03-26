import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import { device } from "../../rwdSize"
//react icon
import { CiEdit } from "react-icons/ci";  

import { MdDeleteForever } from "react-icons/md";

import { formFields } from "./publicSource"


const CustCon = styled(Container)`
    margin-top: 20px;
`
const CustCol = styled(Col)`
    border: 1px solid #000000;
`
const MobileRow = styled(Row)`
    @media ${device.tablet} {
        display: none;
    }
    @media ${device.laptop} {
        display: none;
    }
    @media ${device.mobile} {
        display: block;
        border: 3px solid #000000;
        border-radius: 10px;
        margin: 20px;
    }
`
const MobileColFix = styled(Col)`
    display: flex;
    justify-content: space-between;
`
const Custtext = styled.p`
    display: flex;
    align-items: center;
    padding-top: 10px;
    font-size: 14px;
`


export function MobileJSX(props) {  //手機幕顯示這邊
    const { prop } = props

    return (
        <CustCon>
            {  
                prop.resData && prop.resData.length > 0
                ?prop.resData.map((items, index) => (
                    <MobileRow key={items.account}>
                        <MobileColFix>
                            <MdDeleteForever style={{fontSize: "25px", cursor: "pointer"}} onClick = { () => prop.switchShowDialog_D(index) } />
                            <CiEdit style={{ fontSize: "30px", cursor: 'pointer' }} onClick = { () => prop.switchShowDialog_U(items) } />
                        </MobileColFix>
                        {
                            formFields.map(field => (
                                <CustCol key={field.id}><Custtext>{field.label}: {items[field.id]}</Custtext></CustCol>
                            ))
                        }
                    </MobileRow>
                ))
                :<></>
            }
        </CustCon>
    )
}