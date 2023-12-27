import ReactFlow, { Controls, Background } from 'reactflow';
import saveAs from 'file-saver';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const edges = [{ id: '1-2', source: '1', target: '2' }];

const nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const saveAsJson = (toSave, fileName) => {
  const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: 'application/json' });
  saveAs(blob, fileName);
};

const handleSave = () => {
  const graphNodes = {
    elements: nodes,
  };
  saveAsJson(graphNodes, "graphNodes.json")

  const graphEdges = {
    elements: edges,
  };
  saveAsJson(graphEdges, "graphEdges.json")
  
};

function FlowChart() {
  return (
    <>
      <div style={{
        height: "50vh",
        width: "50vw",
        border: "1px solid black",
        marginLeft: "12.5vw",
      }}>
        <ReactFlow nodes={nodes} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <button type="button" class="btn btn-primary" onClick={handleSave}>Save</button>
    </>
  );
}

export default FlowChart;