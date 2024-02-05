import { Form } from "react-bootstrap";

export function FormControl(props) {
    const { type, name, value, onChange } = props

    return (
        <Form.Control
            type = { type }
            name = { name }
            autoComplete= "off"
            value = { value }
            onChange = { (e) => { onChange(e.target.value) } }
        />
    )
}

// export function FormCheck(props) {
//     const { type, disabled, checked, onClick, onChange } = props

//     return (
//         <Form.Check
//             type = { type }
//             disabled = { disabled }
//             checked = { checked }
//             onClick={ () => { onClick } }
//             onChange={ () => { onChange } }
//         />
//     )
// }