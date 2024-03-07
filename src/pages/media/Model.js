import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Uploader from './Uploader';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Media Library
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Uploader />
            </Modal.Body>

        </Modal>
    );
}

function UploadModal() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Add New
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default UploadModal