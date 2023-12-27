import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

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

const saveHandler = () => {
  console.log("Saving to json")
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
      <button type="button" onClick={saveHandler}>Save</button>
    </>
  );
}

export default FlowChart;