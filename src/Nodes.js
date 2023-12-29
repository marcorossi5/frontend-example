import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
// import { Accordion } from 'react-bootstrap';

const ReadPdfInput = ({ data }) => {
  const onChange = useCallback((evt) => {
    data.label = evt.target.value
  }, []);

  return (
    <div className='flex flex-row justify-between p-1'>
      <span className='mr1'> Regexp </span>
      <input type="text nodrag" className='p-1 bg-white opacity-50 text-xs' onChange={onChange} />
    </div>
  );
};



function ReadPdf({ data }) {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className='justify-right custom-node'>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <span className='mr1'>Click &#128073;</span>
      <span className="adjust-right" onClick={toggleExpansion}>
        {isExpanded ? "-" : "+"}
      </span>

      {
        isExpanded && <ReadPdfInput data={data} />
      }
    </div>
  );
}

export const nodeTypes = {
  ReadPdf: ReadPdf
};
