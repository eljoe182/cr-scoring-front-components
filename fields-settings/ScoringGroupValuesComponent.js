'use strict';

const { useEffect, useState } = React;

const ScoringGroupValuesComponent = ({ setRefresh, campaign }) => {
  const [loading, setLoading] = useState(false);
  const [scoringGroupValues, setScoringGroupValues] = useState([]);

  const getScoringGroupValues = async () => {
    const response = await fetch(`${SERVER_SCORING}/scoring/settings/rules/get/${campaign}`, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => response.json());
    setScoringGroupValues(response.data || []);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${SERVER_SCORING}/scoring/settings/rules/save`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scoringGroupValues),
    }).then((response) => response.json());
    setRefresh(true);
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getScoringGroupValues();
      setLoading(false);
    };
    if (campaign !== '') getData();
  }, [campaign]);

  return (
    <div className='box box-primary box-solid'>
      <div className='box-header with-border'>
        <h3 className='box-title'>Scoring Group values</h3>
      </div>
      <form onSubmit={handlerSubmit}>
        <div className='box-body container-fluid'>
          <div className='form-group' style={{ paddingBottom: '4em' }}>
            <h4>Scoring Group 1</h4>
            <div className='col-xs-6'>
              <label htmlFor='scoring1From'>From</label>
              <input
                className='form-control'
                type='number'
                name='scoring1From'
                id='scoring1From'
                value={scoringGroupValues.score1 ? scoringGroupValues.score1.min : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score1: { ...prevState.score1, min: Number(value) },
                  }));
                }}
              />
            </div>
            <div className='col-xs-6'>
              <label htmlFor='scoring1To'>To</label>
              <input
                className='form-control'
                type='number'
                name='scoring1To'
                id='scoring1To'
                value={scoringGroupValues.score1 ? scoringGroupValues.score1.max : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score1: { ...prevState.score1, max: Number(value) },
                  }));
                }}
              />
            </div>
          </div>
          <div className='form-group' style={{ paddingBottom: '4em' }}>
            <h4>Scoring Group 2</h4>
            <div className='col-xs-6'>
              <label htmlFor='scoring2From'>From</label>
              <input
                className='form-control'
                type='number'
                name='scoring2From'
                id='scoring2From'
                value={scoringGroupValues.score2 ? scoringGroupValues.score2.min : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score2: { ...prevState.score2, min: Number(value) },
                  }));
                }}
              />
            </div>
            <div className='col-xs-6'>
              <label htmlFor='scoring2To'>To</label>
              <input
                className='form-control'
                type='number'
                name='scoring2To'
                id='scoring2To'
                value={scoringGroupValues.score2 ? scoringGroupValues.score2.max : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score2: { ...prevState.score2, max: Number(value) },
                  }));
                }}
              />
            </div>
          </div>
          <div className='form-group' style={{ paddingBottom: '4em' }}>
            <h4>Scoring Group 3</h4>
            <div className='col-xs-6'>
              <label htmlFor='scoring3From'>From</label>
              <input
                className='form-control'
                type='number'
                name='scoring3From'
                id='scoring3From'
                value={scoringGroupValues.score3 ? scoringGroupValues.score3.min : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score3: { ...prevState.score3, min: Number(value) },
                  }));
                }}
              />
            </div>
            <div className='col-xs-6'>
              <label htmlFor='scoring3To'>To</label>
              <input
                className='form-control'
                type='number'
                name='scoring3To'
                id='scoring3To'
                value={scoringGroupValues.score3 ? scoringGroupValues.score3.max : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score3: { ...prevState.score3, max: Number(value) },
                  }));
                }}
              />
            </div>
          </div>
          <div className='form-group' style={{ paddingBottom: '4em' }}>
            <h4>Scoring Group 4</h4>
            <div className='col-xs-6'>
              <label htmlFor='scoring4From'>From</label>
              <input
                className='form-control'
                type='number'
                name='scoring4From'
                id='scoring4From'
                value={scoringGroupValues.score4 ? scoringGroupValues.score4.min : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score4: { ...prevState.score4, min: Number(value) },
                  }));
                }}
              />
            </div>
            <div className='col-xs-6'>
              <label htmlFor='scoring4To'>To</label>
              <input
                className='form-control'
                type='number'
                name='scoring4To'
                id='scoring4To'
                value={scoringGroupValues.score4 ? scoringGroupValues.score4.max : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score4: { ...prevState.score4, max: Number(value) },
                  }));
                }}
              />
            </div>
          </div>
          <div className='form-group' style={{ paddingBottom: '4em' }}>
            <h4>Scoring Group 5</h4>
            <div className='col-xs-6'>
              <label htmlFor='scoring5From'>From</label>
              <input
                className='form-control'
                type='number'
                name='scoring5From'
                id='scoring5From'
                value={scoringGroupValues.score5 ? scoringGroupValues.score5.min : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score5: { ...prevState.score5, min: Number(value) },
                  }));
                }}
              />
            </div>
            <div className='col-xs-6'>
              <label htmlFor='scoring5To'>To</label>
              <input
                className='form-control'
                type='number'
                name='scoring5To'
                id='scoring5To'
                value={scoringGroupValues.score5 ? scoringGroupValues.score5.max : '0'}
                onChange={(e) => {
                  const { value } = e.target;
                  setScoringGroupValues((prevState) => ({
                    ...prevState,
                    score5: { ...prevState.score5, max: Number(value) },
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div className='box-footer'>
          <button className='btn btn-primary' type='submit'>
            Save
          </button>
        </div>
      </form>
      {loading && (
        <div className='overlay'>
          <i className='fa fa-refresh fa-spin'></i>
        </div>
      )}
    </div>
  );
};
