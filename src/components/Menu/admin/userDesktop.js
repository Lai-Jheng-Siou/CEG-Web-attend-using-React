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
const CustRow = styled(Row)`
    border: 1px solid #000000;
    background-color: ${(props) => (props.iseven ? '#D3D3D3' : '#fff')};

    @media ${device.mobile} {
        display: none;
    }
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
    font-size: 15px;
`
const Custtext = styled.p`
    display: flex;
    align-items: center;
    padding-top: 10px;
    font-size: 14px;
`


export function DesktopJSX(props) {  //大螢幕顯示這邊
    const { prop, ChooseRWD } = props

    return (
        <CustCon>
            <CustRow key={"head"}>
                <CustColmin>編輯</CustColmin>
                <CustColmin>移除</CustColmin>
                {
                    formFields.map(field => (
                        <CustCol key={field.id}><Custtext>{field.label}</Custtext></CustCol>
                    ))
                }
            </CustRow>
            {
                prop.resData && prop.resData.length > 0
                ?prop.resData.map((items, index) => (
                    prop.isEdit && prop.editId === index
                    ?<CustRow key = { index } iseven = { index % 2 === 0 }>
                        <CustColmin>
                            <TiTick style = {{ fontSize: "25px", cursor: 'pointer' }} onClick={ () => { prop.handleTick() } } />
                        </CustColmin>
                        <CustColmin>
                            <ImCross style = {{ fontSize: "15px", cursor: 'pointer' }} onClick = { () => { prop.handleEdit(-1) } } />
                        </CustColmin>
                        {
                            formFields.map(field=> (
                                <CustCol key = {field.id}>
                                    <ChooseRWD field = {field} />
                                </CustCol>
                            ))
                        }
                    </CustRow>
                    :<CustRow key = { index } iseven = { index % 2 === 0 }>
                        <CustColmin>
                            <CiEdit style={{ fontSize: "20px", cursor: 'pointer' }} onClick = { () => { prop.handleEdit(index) } } />
                        </CustColmin>
                        <CustColmin>
                            <MdDeleteForever style={{fontSize: "25px", cursor: "pointer"}} onClick = { () => prop.switchIsShowDialog(index) } />
                        </CustColmin>
                        {
                            formFields.map(field => (
                                <CustCol><Custtext>{items[field.id]}</Custtext></CustCol>
                            ))
                        }
                    </CustRow>
                ))
                :<></>
            }
        </CustCon>
    )
}