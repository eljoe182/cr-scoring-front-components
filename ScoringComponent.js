'use strict';
const { useState, useEffect } = React;
const appRoot = document.getElementById('scoring_component');

const SERVER_SCORING = 'http://localhost:3000';

const ScoringComponent = () => {
  const [responsePeriod, setResponsePeriod] = useState({
    success: [],
    errors: [],
  });

  return (
    <div class='container-fluid spark-screen'>
      <div class='row'>
        <div class='col-md-9 col-md-offset-1'>
          <RunPeriodComponent responsePeriod={setResponsePeriod} />
          <ScoringTableComponent scoringData={responsePeriod.success} />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(appRoot);
root.render(<ScoringComponent />);
