import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustDialog = (props) => {
  const {prop} = props

  /*
    prop = {
    title: ,
    msg: ,
    show: ,
    hideFunc: ,
    clickConfirm: 
  } 
  */

  return (
    <>
      <Modal show={prop.show} onHide={prop.hideFunc}>
        <Modal.Header closeButton>
          <Modal.Title>{prop.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{prop.msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ prop.clickConfirm }>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustDialog;