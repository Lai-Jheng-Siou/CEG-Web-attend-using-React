import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { sidebarData } from "./sideBarItem";
import CustDialog from "../../Customize_Tool/ConfirmDialog";
import atdBtnContext from "./ATD/BtnContext"
import AddAttendModal from "./ATD/AtdModal";

import 'react-responsive-modal/styles.css';
import "./NavBar.scss";

import { FaPlusCircle } from "react-icons/fa";
import { TopItems } from "./TopItem";


function NavBar() {
    const userInfo = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_localStorage))
    const token = userInfo["token"]

    const [open, setShow] = useState(false)
    const switchModal = () => setShow(!open)

    const [showDialog, setShowDialog] = useState(false)
    const [title, setTitle] = useState('')
    const [msg, setMsg] = useState('')
    const switchDialog = () => setShowDialog(!showDialog)

    
    return (
        <>
            {/* 彈出視窗 */}
            <CustDialog
                show={showDialog} 
                title = {title}
                msg = {msg}
                hideFunc={switchDialog}
                clickConfirm={switchDialog}
            />

            {/* 頂部物件 */}
            <TopItems />  

            <Container fluid>
                <Row className="justify-content-center gap-3 mt-5">
                    <Col xs={12} sm={6} md={4} lg={3} xl={3} className="addAttend">
                        <div onClick={switchModal}>
                            <FaPlusCircle size={16} />
                            <span>新增打卡</span>
                        </div>
                    </Col>
                {
                    sidebarData.map((item) => (
                        <Col className={item.cName} xs={12} sm={6} md={4} lg={3} xl={3}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </Col>
                    ))
                }
                </Row>
            </Container>
            <atdBtnContext.Provider value={{open, switchModal, token, setTitle, setMsg, switchDialog}}>
                <AddAttendModal />
            </atdBtnContext.Provider>
        </>
    )
}


export default NavBar;