'use strict';

const { useEffect, useState, useRef } = React;

const ScoringTableComponent = ({ scoringData }) => {
  const [data, setData] = useState([]);
  const [saving, setSaving] = useState(false);
  const tableRef = useRef();

  useEffect(() => {
    const configTable = {
      lengthMenu: [
        [5, 25, 50, -1],
        [5, 25, 50, 'Todos'],
      ],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json',
      },
      data: data,
      columns: [
        { class: 'text-center', data: 'phoneNumber' },
        { class: 'text-center', data: 'score' },
        { class: 'text-center', data: 'beastDate' },
      ],
      destroy: true,
    };
    const table = $(tableRef.current).DataTable(configTable);
    return () => {
      table.destroy();
    };
  }, []);

  useEffect(() => {
    if (scoringData.length > 0) {
      setData(scoringData);
      $(tableRef.current).DataTable().clear().draw();
      scoringData.forEach((item) => {
        $(tableRef.current).DataTable().row.add(item).draw();
      });
    }
  }, [scoringData]);

  const saveData = async () => {
    setSaving(true);
    await fetch(`${SERVER_SCORING}/scoring/save`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    setSaving(false);
  };

  return (
    <div className='box'>
      <div className='box-header'>
        <h3 className='box-title'>Scoring</h3>
        <div className='box-tools'>
          {data.length > 0 && (
            <button className='btn btn-success btn-flat btn-sm' onClick={() => saveData()}>
              Guardar resultados
            </button>
          )}
        </div>
      </div>
      <div className='box-body table-responsive-md'>
        <table className='table table-hover table-striped nowrap' ref={tableRef}>
          <thead>
            <tr>
              <th className='text-center'>Phone Number</th>
              <th className='text-center'>Score</th>
              <th className='text-center'>Beast Date</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      {saving && (
        <div className='overlay'>
          <i className='fa fa-refresh fa-spin'></i>
        </div>
      )}
    </div>
  );
};
