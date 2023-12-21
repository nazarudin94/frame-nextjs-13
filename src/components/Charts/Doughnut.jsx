import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
const Page = ({ data, ChartId }) => {
  useEffect(() => {
    const pieData = data.map((item) => ({
      name: item.product,
      y: parseInt(item.total_units_sold),
    }));

    const options = {
      chart: {
        type: 'pie',
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
          data: pieData,
          size: '70%',
        },
      ],
    };

    Highcharts.chart('pie-chart-container', options);
  }, [data]);

  return (
    <div>
      <div className="w-96 h-96 shadow-lg" id="pie-chart-container"></div>
    </div>
  );
};

export default Page;
