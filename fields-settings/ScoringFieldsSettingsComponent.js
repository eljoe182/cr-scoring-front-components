'use strict';
const { useState } = React;
const appRoot = document.getElementById('fields_settings');

const SERVER_SCORING = 'http://192.168.1.6:3000';

const ScoringFieldsSettingsComponent = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className='container-fluid spark-screen'>
      <div className='row'>
        <div className='col-md-9 col-md-offset-1'>
          <ScoringPanelConfigComponent setRefresh={setRefresh} />
          <ScoringSettingsTableComponent refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(appRoot);
root.render(<ScoringFieldsSettingsComponent />);
