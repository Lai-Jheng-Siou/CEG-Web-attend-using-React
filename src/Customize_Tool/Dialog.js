import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustDialog = ({show, title, msg, clickConfirm}) => {
  return (
    <>
      <Modal show={show} onHide={clickConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={clickConfirm}>
            確認
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustDialog;