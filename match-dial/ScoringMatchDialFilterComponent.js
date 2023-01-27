'use strict';
const { useState } = React;

const MatchDialFilterComponent = ({ responseData, responseCore, responseListId }) => {
  const [loading, setLoading] = useState(false);
  const [listId, setListId] = useState(null);
  const [core, setCore] = useState('core1');

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${SERVER_SCORING}/scoring/match-dial/${core}/${listId}`, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => response.json());
    responseData(response);
    responseCore(core);
    responseListId(listId);
    setLoading(false);
  };

  return (
    <div className='box box-success box-solid'>
      <div className='box-header with-border'>
        <h3 className='box-title'>Resumen de Scoring</h3>
      </div>
      <div className='box-body'>
        <form onSubmit={handlerSubmit}>
          <div className='form-group row'>
            <div className='col-md-6'>
              <label htmlFor='core'>Core</label>
              <div className=''>
                <select
                  className='form-control'
                  id='core'
                  name='core'
                  value={core}
                  onChange={(e) => setCore(e.target.value)}
                >
                  <option value='core1'>Core 1</option>
                  <option value='core11'>Core 11</option>
                  <option value='core21'>Core 21</option>
                </select>
              </div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='listId'>Numero de lista</label>
              <div className='input-group'>
                <input
                  type='numeric'
                  name='listId'
                  id='listId'
                  placeholder='ej. 10002038'
                  className='form-control'
                  value={listId}
                  onChange={(e) => setListId(e.target.value)}
                />
                <span className='input-group-btn'>
                  <button className='btn btn-primary btn-flat' type='submit'>
                    Consultar
                  </button>
                </span>
              </div>
            </div>
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
