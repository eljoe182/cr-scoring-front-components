'use strict';
const { useState, useEffect } = React;

const ScoringPanelConfigComponent = ({ setRefresh, campaign }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [database, setDatabase] = useState([]);
  const [table, setTable] = useState([]);
  const [fields, setFields] = useState([]);

  const [databaseSelected, setDatabaseSelected] = useState('');
  const [tableSelected, setTableSelected] = useState('');
  const [fieldSelected, setFieldSelected] = useState('');
  const [value, setValue] = useState(0);

  const getFields = async () => {
    const response = await fetch(`${SERVER_SCORING}/scoring/settings/fields/get-fields`, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => response.json());
    setData(response);
    const responseDatabase = response.map((item) => item.database);
    setDatabase([...new Set(responseDatabase)]);
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getFields();
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (databaseSelected) {
      setTable([]);
      setFields([]);
      setTableSelected('');
      setFieldSelected('');
      setValue(0);
      const responseTable = data
        .filter((item) => item.database === databaseSelected)
        .map((item) => item.table);
      setTable([...new Set(responseTable)]);
    }
  }, [databaseSelected]);

  useEffect(() => {
    if (tableSelected) {
      setFields([]);
      setFieldSelected('');
      setValue(0);
      const responseField = data
        .filter((item) => item.table === tableSelected)
        .map((item) => item.field);
      setFields(responseField);
    }
  }, [tableSelected]);

  useEffect(() => {
    if (fieldSelected) {
      setValue(0);
    }
  }, [fieldSelected]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${SERVER_SCORING}/scoring/settings/fields/save`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign,
        database: databaseSelected,
        table: tableSelected,
        field: fieldSelected,
        value,
      }),
    }).then((response) => response.json());
    setDatabaseSelected('');
    setTableSelected('');
    setFieldSelected('');
    setTable([]);
    setFields([]);
    setValue(0);
    setRefresh(true);
    setLoading(false);
  };

  return (
    <div className='box box-success box-solid'>
      <div className='box-header with-border'>
        <h3 className='box-title'>New settings</h3>
      </div>
      <div className='box-body'>
        <form onSubmit={handlerSubmit}>
          <div className='form-group row'>
            <div className='col-md-3'>
              <label htmlFor='database'>Database</label>
              <select
                className='form-control'
                id='database'
                name='database'
                value={databaseSelected}
                required
                onChange={(e) => setDatabaseSelected(e.target.value)}
              >
                <option value=''>Select a option</option>
                {database.map((item) => (
                  <option key={item} value={item}>
                    {`${item}`.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-3'>
              <label htmlFor='table'>Table</label>
              <select
                className='form-control'
                id='table'
                name='table'
                value={tableSelected}
                required
                onChange={(e) => setTableSelected(e.target.value)}
              >
                <option value=''>Select a option</option>
                {table.map((item) => (
                  <option key={item} value={item}>
                    {`${item}`.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-3'>
              <label htmlFor='field'>Fields</label>
              <select
                className='form-control'
                id='field'
                name='field'
                value={fieldSelected}
                required
                onChange={(e) => setFieldSelected(e.target.value)}
              >
                <option value=''>Select a option</option>
                {fields.map((item) => (
                  <option key={item} value={item}>
                    {`${item}`.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-3'>
              <label htmlFor='value'>Value</label>
              <div className='input-group'>
                <input
                  type='number'
                  name='value'
                  id='value'
                  placeholder='ej. 10'
                  className='form-control'
                  value={value}
                  required
                  onChange={(e) => setValue(e.target.value)}
                />
                <span className='input-group-btn'>
                  <button className='btn btn-primary btn-flat' type='submit'>
                    Add
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
