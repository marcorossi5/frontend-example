import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
function TextUpdaterNode({ data }) {
    const onChange = useCallback((evt) => {
        data.label = evt.target.value
      }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Regexp:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export const nodeTypes = {
    textUpdater: TextUpdaterNode
  };
  