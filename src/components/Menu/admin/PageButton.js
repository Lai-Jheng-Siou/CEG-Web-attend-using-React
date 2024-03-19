import { Button, FormLabel } from "react-bootstrap"
import styled from "styled-components"
import { useState } from "react"

const Form = styled(FormLabel)`
    margin-right: 2px;
    margin-top: 5px;
`
const Btn = styled(Button)`
    font-size: 14px;
    margin-right: 2px;

`

function PageBtn(props) {
    const { color, nowPage, totalPage, setNowPage } = props
    const btnAry = ['第一筆', '上一筆', '',  '下一筆', '最後一筆']
    const st = ['start', 'last', '', 'next', 'end']

    const [disLast, setDisLast] = useState(true)
    const [disNext, setDisNext] = useState(false)

    const editPage = (st) => {
        switch(st) {
            case 'next':
                let nextPage = nowPage + 1
                setDisLast(false)
                setDisNext(nextPage + 1 > totalPage ?true :false)
                setNowPage(nextPage)
                break;
            case 'last':
                let lastPage = nowPage - 1
                setDisLast(lastPage === 1 ?true :false)
                setDisNext(false)
                setNowPage(lastPage)
                break;
            case 'start':
                setDisLast(true)
                setDisNext(false)
                setNowPage(1)
                break;
            case 'end':
                setDisLast(false)
                setDisNext(true)
                setNowPage(totalPage)
                break;
            default:
                break;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滚动到顶部
        });
    }


    return (
        <>
            {
                btnAry.map((item, index) => (
                    index === 2
                    ?<Form>{nowPage} / {totalPage}</Form>
                    :<Btn 
                        key={index}
                        variant={color} 
                        disabled={index < 2 ?disLast :disNext} 
                        onClick={() => { editPage(st[index]) }}
                    >{item}
                    </Btn>
                ))
            }
        </>
    )
}

export default PageBtn