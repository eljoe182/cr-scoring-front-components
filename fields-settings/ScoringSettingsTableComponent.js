'use strict';

const { useEffect, useRef } = React;

const ButtonDelete = ({ id }) => {
  const handleClick = () => {
    console.log({ id });
  };

  return (
    <button type='button' className='btn btn-danger btn-xs' onClick={handleClick}>
      <i className='fa fa-trash'></i>
    </button>
  );
};

const ScoringSettingsTableComponent = ({ refresh }) => {
  const tableRef = useRef();

  useEffect(() => {
    const configTable = {
      lengthMenu: [
        [5, 25, 50],
        [5, 25, 50],
      ],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json',
      },
      searching: false,
      ordering: false,
      bFilter: false,
      ajax: {
        url: `${SERVER_SCORING}/scoring/settings/fields/get-all`,
        dataSrc: 'rows',
      },
      processing: true,
      serverSide: true,
      columns: [
        { class: 'text-justify text-uppercase', data: 'database' },
        { class: 'text-justify text-uppercase', data: 'tableName' },
        { class: 'text-justify text-uppercase', data: 'field' },
        { class: 'text-right', data: 'value' },
        {
          class: 'text-center',
          data: 'id',
          render: function (data, type, row) {
            return `<button type='button' class='btn btn-danger btn-xs'>
                      <i class='fa fa-trash'></i>
                    </button>`;
          },
        },
      ],
      destroy: true,
    };
    const table = $(tableRef.current).DataTable(configTable);
    return () => {
      table.destroy();
    };
  }, []);

  useEffect(() => {
    if (refresh) {
      $(tableRef.current).DataTable().ajax.reload();
    }
  }, [refresh]);

  return (
    <div className='box'>
      <div className='box-header'>
        <h3 className='box-title'></h3>
      </div>
      <div className='box-body table-responsive-md'>
        <table className='table table-hover table-striped nowrap' ref={tableRef}>
          <thead>
            <tr>
              <th className='text-center'>Database</th>
              <th className='text-center'>Table</th>
              <th className='text-center'>Field</th>
              <th className='text-center'>Value</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
