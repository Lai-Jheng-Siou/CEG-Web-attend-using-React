import { useState, useEffect } from "react";

import axiosInstance from "../../Instance/axiosInstance";

import { TopItems } from "../TopItem";
import Add_user from "./add_user";
import GetUserInfo from "./getUser";


function User_info() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const token = userInfo['token']

    const apiAddress = process.env.REACT_APP_GetUserInfo
    
    const [resData, setResData] = useState({})  //存放後端傳回資料
    useEffect(() => {  //跟後端溝通
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post(apiAddress, {
                    empToken: token
                })
                setResData(response.data)
            }catch(err) {
                console.log(err)
            }
        }

        fetchData()
    }, [resData])

    return(
        <>
            <TopItems></TopItems>
            <Add_user></Add_user>
            <GetUserInfo resData = { resData } token = { token } />
        </>
    )
}

export default User_info