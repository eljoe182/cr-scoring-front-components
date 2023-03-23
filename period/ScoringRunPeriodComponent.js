'use strict';
const { useState, useEffect } = React;

const RunPeriodComponent = ({ responseDataPeriod, responsePeriod }) => {
  const [loading, setLoading] = useState(false);
  const [dialList, setDialList] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [listId, setListId] = useState('');

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const response = await fetch(`${SERVER_SCORING}/vicidial-lists/get-lists`, {
        method: 'GET',
        mode: 'cors',
      }).then((response) => response.json());
      setDialList(response);
      setLoading(false);
    };
    getList();
  }, []);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const campaign = dialList.find((item) => Number(item.listId) === Number(listId));

    const { success, errors } = await fetch(`${SERVER_SCORING}/cr-master/management-history/get-history`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listId: Number(listId),
        dateFrom: `${dateFrom} 00:00:00`,
        dateTo: `${dateTo} 23:59:59`,
        campaign: campaign.campaignId,
      }),
    }).then((response) => response.json());
    console.log(success);
    responseDataPeriod(success || []);
    setLoading(false);
  };

  return (
    <div className='box box-success box-solid'>
      <div className='box-header with-border'>
        <h3 className='box-title'>Ejecutar un nuevo periodo</h3>
      </div>
      <form onSubmit={handlerSubmit}>
        <div className='box-body'>
          <div className='form-group'>
            <label htmlFor='dialList'>Lista</label>
            <select
              className='form-control'
              id='dialList'
              name='dialList'
              value={listId}
              required
              onChange={(e) => setListId(e.target.value)}
            >
              <option value=''>Select a option</option>
              {dialList.map((item) => (
                <option key={item.listId} value={item.listId}>
                  {`${item.listName} - ${item.listId} (${item.campaignId})`.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='dateFrom'>Fecha Inicio</label>
              <input
                type='date'
                name='dateFrom'
                id='dateFrom'
                className='form-control'
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='dateTo'>Fecha Fin</label>
              <input
                type='date'
                name='dateTo'
                id='dateTo'
                className='form-control'
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='box-footer'>
          <button className='btn btn-primary btn-flat' type='submit'>
            Consultar
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
