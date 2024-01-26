import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import styled from "styled-components"
import axiosInstance from "../../Instance/axiosInstance"

const Cust_Row = styled(Row)`
`
const Cust_Col = styled(Col)`
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

            }
        }
        fetchData()
    }, [])


    return (
        <>
        </>
    )
}

export default GetUserIngo