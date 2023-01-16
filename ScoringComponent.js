'use strict';
const { useState, useEffect } = React;
const appRoot = document.getElementById('scoring_component');

const SERVER_SCORING = 'http://localhost:3000';

const ScoringComponent = () => {
  const [responsePeriod, setResponsePeriod] = useState({
    success: [],
    errors: [],
  });
  const [period, setPeriod] = useState('');

  return (
    <div class='container-fluid spark-screen'>
      <div class='row'>
        <div class='col-md-9 col-md-offset-1'>
          <RunPeriodComponent responseDataPeriod={setResponsePeriod} responsePeriod={setPeriod} />
          <ScoringTableComponent scoringData={responsePeriod} period={period} />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(appRoot);
root.render(<ScoringComponent />);
