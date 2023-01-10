'use strict';
const { useState } = React;

const RunPeriodComponent = ({ responsePeriod }) => {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('');

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (period.length === 0) {
      alert('Indique el periodo a ejecutar');
      return;
    }

    setLoading(true);
    const response = await fetch(`${SERVER_SCORING}/scoring/period/${period}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
    responsePeriod(response.data);
    setLoading(false);
  };

  return (
    <div className='box box-success box-solid'>
      <div className='box-header with-border'>
        <h3 className='box-title'>Ejecutar un nuevo periodo</h3>
      </div>
      <div className='box-body'>
        <form onSubmit={handlerSubmit}>
          <label htmlFor='period'>Periodo a ejecutar</label>
          <div className='input-group'>
            <input
              type='text'
              name='period'
              id='period'
              placeholder='ej. 202211'
              className='form-control'
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
            <span className='input-group-btn'>
              <button className='btn btn-primary btn-flat' type='submit'>
                Consultar
              </button>
            </span>
          </div>
        </form>
      </div>
      {loading && (
        <div className='overlay'>
          <i className='fa fa-refresh fa-spin'></i>
        </div>
      )}
    </div>
  );
};
