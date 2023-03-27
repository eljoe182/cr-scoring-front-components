'use strict';

const { useEffect, useState, useCallback } = React;

const ScoringSettingsTableComponent = ({ refresh, setRefresh, campaign, }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign !== '' && refresh) {
      const getData = async () => {
        setLoading(true);
        setData([]);
        const response = await fetch(`${SERVER_SCORING}/scoring/settings/fields/get-all/${campaign}`, {
          method: 'GET',
          mode: 'cors',
        }).then((response) => response.json());
        setData(response.rows);
        setLoading(false);
        setRefresh(false);
      };
      getData();
    }
  }, [refresh, campaign]);

  return (
    <div className='box'>
      <div className='box-header'>
        <h3 className='box-title'> Scoring Fields Settings {
          campaign === '' ? '' : `for ${campaign}`
        }</h3>
      </div>
      <div className='box-body table-responsive-md'>
        <table className='table table-hover table-striped nowrap'>
          <thead>
            <tr>
              <th className='text-center'>Database</th>
              <th className='text-center'>Table</th>
              <th className='text-center'>Field</th>
              <th className='text-center'>Value</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.database}</td>
                <td>{item.tableName}</td>
                <td className='text-center'>{item.field}</td>
                <td className='text-center'>{item.value}</td>
                <td className='text-center'>
                  <ButtonDelete id={item.id} setRefresh={setRefresh} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className='overlay'>
          <i className='fa fa-refresh fa-spin'></i>
        </div>
      )}
    </div>
  );
};
