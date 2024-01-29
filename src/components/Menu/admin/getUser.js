import { useEffect, useState } from "react"
import { Row, Col, Form } from "react-bootstrap"
import styled from "styled-components"
import axiosInstance from "../../Instance/axiosInstance"

import { CiEdit } from "react-icons/ci";  //react icon

const Cust_Row = styled(Row)`
    // margin-top: 20px;
    background-color: ${(props) => (props.isEven ? '#D3D3D3' : '#fff')};
`
const Cust_Col_min = styled(Col)`
    border: 2px solid #CFCFCF;
    max-width: 45px;
`
const Cust_Col = styled(Col)`
    border: 2px solid #CFCFCF;
`

function GetUserIngo() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const token = userInfo['token']
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post('/getUserInfo',  {
                    empToken: token
                })
                setUserData(response.data)
            }catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {
                userData && userData.length > 0
                ?userData.map((item) => (
                    <Cust_Row>
                        <Cust_Col_min className="col-1 "><CiEdit /></Cust_Col_min>
                        <Cust_Col_min className="col-1">
                            <Form.Check 
                                type = "checkbox"
                            ></Form.Check>
                        </Cust_Col_min>
                        <Cust_Col className="col-2">{item.empId}</Cust_Col>
                        <Cust_Col className="col-2">{item.pasd}</Cust_Col>
                        <Cust_Col className="col-2">{item.email}</Cust_Col>
                        <Cust_Col className="col-2">{item.name}</Cust_Col>
                        <Cust_Col className="col-2">{item.access}</Cust_Col>
                    </Cust_Row>
                ))
                :<></>
            }
        </>
    )
}

export default GetUserIngo