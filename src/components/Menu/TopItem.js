import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap"
import image from '../img'
import { useNavigate } from "react-router-dom";

const Cust_Row = styled(Row)`
    background: linear-gradient(to bottom right, #68a1f7, #1e6de4);
    padding: 15px;
    box-shadow: 0px 5px 5px 2px #888888;
`
const Cust_Img = styled.img`
    cursor: pointer;
`

export function TopItems() {
    
    const navigate = useNavigate()

    const backButton = () => {
        return navigate('/menu')
    }

    return (
        <Container fluid>
            <Cust_Row>
                <Col>
                    <Cust_Img src={image.logo} alt="CEG Logo" onClick={backButton}></Cust_Img>
                </Col>
            </Cust_Row>
        </Container>
    )
}