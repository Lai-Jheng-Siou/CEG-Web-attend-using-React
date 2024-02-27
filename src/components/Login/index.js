import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import image from '../img'
import { Button, Form } from 'react-bootstrap'

import axiosInstance from '../Instance/axiosInstance'


const MainFrame = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px
`
const Frame = styled.div`
    border-top: solid 50px;
    border-right: solid 3px;
    border-left: solid 3px;
    border-bottom: solid 3px;
    border-color: rgba(74,144,226,1);
    border-radius: 25px;
    width: 500px;
    height: 400px
`
const Logo = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px
`

const Acc = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 60px;
    align-items: center;
`
const Pasd = styled.div`
    position: relative;
    display: flex;
    justify-content: space-evenly;
    margin: 30px
    height: 60px;
    align-items: center;

    img {
        position: absolute;
        right: 80px; /* 調整右側間距 */
        top: 50%; /* 垂直居中 */
        transform: translateY(-50%);
    }
`
const Btn = styled(Button)`
    margin-left: 50px;
`
const LoginDiv = styled.div`
    display: flex;
    align-items: center;
    margin-top: 25px;
`
const FormLabel = styled(Form.Label)`
`
const FormInput = styled(Form.Control)`
    width: 250px;
    height: 50px;
`

function Login() {
    const [showPassword, setShowPassword] = useState(false);  //password eye icon status
    const [loginStatus, setLoginStatus] = useState(null)      //login status
    const [errorMessage, setErrorMessage] = useState(null)    //error Message

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = () => {
        const param = {
            username: username,
            password: password,
        };

        axiosInstance.post(process.env.REACT_APP_UserLogin, param)
        .then(res => {
            if(res.data && res.data.success) {
                setLoginStatus(1)
            sessionStorage.setItem(process.env.REACT_APP_localStorage, JSON.stringify(res.data))
            }else {
                setErrorMessage('登入失敗')
            }
        })
        .catch(error => {
            console.log(error)
            setErrorMessage(error.name)
            setLoginStatus(0)
        })
    }

      useEffect(() => {
        if(loginStatus) {
            return navigate('/menu')
        }
      }, [loginStatus])


    return (
        <>
        <MainFrame>
            <Frame>
                <Logo>
                    <img src={image.logo} alt="LOGO"></img>
                </Logo>
                <Acc>
                    <FormLabel htmlFor="inputAccount1">帳號: </FormLabel>
                    <FormInput
                        type="text"
                        name = "username"
                        id="inputAccount1"
                        placeholder="輸入員工編號"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                </Acc>
                <Pasd>
                    <FormLabel htmlFor="inputPassword1">密碼: </FormLabel>
                    <FormInput
                        type={showPassword ?'text' :'password'}
                        name = "password"
                        id="inputPassword1"
                        placeholder="輸入密碼"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <img src={showPassword ?image.eye_v :image.eye} width={'25px'} alt="Eye Icon" onClick={togglePasswordVisibility}></img>
                </Pasd>
                <LoginDiv>
                    <Btn variant="primary" onClick={handleLogin}>登入</Btn>
                    <div>
                        {loginStatus !== 1 && (
                            loginStatus 
                            ?<p>登入成功！</p>
                            :<p style={{ color: 'red' }}>{errorMessage}</p>
                        )}
                    </div>
                </LoginDiv>
            </Frame>
        </MainFrame>
        </>
    )
}

export default Login;