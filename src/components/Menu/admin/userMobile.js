import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import { device } from "../../rwdSize"
//react icon
import { CiEdit } from "react-icons/ci";  
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
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
const MobileCol = styled(Col)`
    display: flex;
    border-top: 1px solid #000000;
    padding: 5px;
`
const MobileText = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin: 10px;
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
    const { prop, ChooseRWD } = props

    return (
        <CustCon>
            {  
                prop.resData && prop.resData.length > 0
                ?prop.resData.map((items, index) => (
                    prop.isEdit && prop.editId === index
                    ?<MobileRow key={items}>
                        <MobileColFix>
                            <TiTick style = {{ fontSize: "30px", cursor: 'pointer' }} onClick={ () => { prop.handleTick() } } />
                            <ImCross style = {{ fontSize: "18px", cursor: 'pointer', margin: "5px" }} onClick = { () => { prop.handleEdit(-1) } } />
                        </MobileColFix>
                        {
                            formFields.map(field => (
                                <MobileCol key = {field.id}>
                                    <MobileText>{field.label}</MobileText>
                                    <ChooseRWD field = {field} />
                                </MobileCol>
                            ))
                        }
                    </MobileRow>
                    :<MobileRow>
                        <MobileColFix>
                            <MdDeleteForever style={{fontSize: "25px", cursor: "pointer"}} onClick = { () => prop.switchIsShowDialog(index) } />
                            <CiEdit style={{ fontSize: "30px", cursor: 'pointer' }} onClick = { () => { prop.handleEdit(index) } } />
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