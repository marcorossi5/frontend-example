import { useState } from "react";
import { Button, Form } from 'react-bootstrap';


function SideBar({ nodeTypes, onSubmit }) {
  const defaultType = Object.keys(nodeTypes)[0];
  const [selectedNode, setSelectedNode] = useState(defaultType);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedNode);
  };

  const handleChange = (e) => {
    setSelectedNode(e.target.value);
  };

  return (
    <div className='sidebar ps-3'>
      <h3>Add nodes</h3>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="selectedNode">
          {
            Object.keys(nodeTypes).map(
              (key) => (
                <Form.Check
                  type='radio'
                  id={key}
                  value={key}
                  key={key}
                  label={key}
                  onChange={handleChange}
                  checked={selectedNode === key}
                />
              )
            )
          }
        </Form.Group>
        <Button variant="primary" type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SideBar;