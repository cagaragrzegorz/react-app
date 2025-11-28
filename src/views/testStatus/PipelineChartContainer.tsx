import '../../styles/pipelineChart.css';

import { RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

import { PipelineChart } from './PipelineChart';

interface PipelineChartContainerProps {
    project: string;
    pipelineIds: string[];
}

export const PipelineChartContainer: React.FC<PipelineChartContainerProps> = (props: {
    project: string;
    pipelineIds: string[];
}) => {
  const { project, pipelineIds } = props;
  const [containerKey, setContainerKey] = useState<number>(Date.now);

  return (
    <div key={containerKey} className="project-container">
      <div
        className="project-container-title"
      >
        {project}&nbsp;<RefreshCw onClick={() => {
          setContainerKey(Date.now);
        }}
        />
      </div>
      {pipelineIds.map((pipelineId: string, index) => <PipelineChart key={index} pipelineId={pipelineId} />)}
    </div>
  );
};
