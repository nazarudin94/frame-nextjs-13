import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const Page = ({ chartID, data }) => {
  useEffect(() => {
    const options = {
      chart: {
        type: 'pie',
        renderTo: chartID, // Gunakan ID yang diterima dari properti
      },
      title: {
        text: 'Jumlah unit yang terjual berdasarkan produk',
        style: {
          fontWeight: 'bold',
          fontSize: '14px',
        },
      },
      plotOptions: {
        pie: {
          innerSize: '60%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>',
          },
        },
      },
      series: [
        {
          name: 'jumlah',
          data: data,
          size: '70%',
        },
      ],
    };

    Highcharts.chart(chartID, options);
  }, [chartID, data]);

  return (
    <div>
      <div className="w-96 h-96 shadow-lg" id={chartID}></div>
    </div>
  );
};

export default Page;
