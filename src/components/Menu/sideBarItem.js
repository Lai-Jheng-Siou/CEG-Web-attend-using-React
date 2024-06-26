import {React} from "react";
import { FaClock } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";

export const sidebarData = [
    {
        title: '打卡紀錄',
        path: '/record',
        icon: <FaClock />,
        cName: 'nav-text',
        show: true
    },
    {
        title: '大樓管理系統',
        path: '/building',
        icon: <FaBuilding />,
        cName: 'nav-text',
        show: true
    },
    {
        title: '登出',
        path: '/login',
        icon: <RiLogoutBoxFill />,
        cName: 'nav-text',
        show: true
    }, 
    {
        title: 'administrator',
        path: '/setting',
        icon: <IoSettings />,
        cName: 'nav-text',
        show: false
    }, 
]