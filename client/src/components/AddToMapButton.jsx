import React from 'react';
import { Button } from 'react-bootstrap';
import './AddToMapButton.css';

const AddToMapButton = ({handleShow}) => (
	<Button
		bsStyle="primary" bsSize="large"
		id='addbtn' onClick={handleShow}
	>
		Add to Map
	</Button>
)

export default AddToMapButton;