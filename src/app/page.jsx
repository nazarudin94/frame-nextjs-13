'use client';
import { Inter } from '@next/font/google';

import React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import moment from 'moment';
import Form from '../components/Form/Form';
import Table from '../components/Table/Table';
import Doughnut from '../components/Charts/Doughnut';
import Chart from '../components/Charts/ChartDonut';
import LineChart from '../components/Charts/LineChart';

const inter = Inter({ subsets: ['latin'] });

const Page = () => {
  const [segmentList, setSegmentList] = useState([]);
  const [chartq1, setChartq1] = useState([]);
  const [chartq3, setChartq3] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const fetchData = async () => {
    const response = await fetch(`../api/segment`);
    const data = await response.json();
    setSegmentList(data.data);
  };
  const fetchDataChart = async () => {
    const response = await fetch(`../api/chartq2`);
    const data = await response.json();
    const pieData = data.data.map((item) => ({
      name: item.label,
      y: parseInt(item.total),
    }));

    setChartq1(pieData);
  };

  const fetchDataChart2 = async () => {
    const response = await fetch(`../api/chartq3`);
    const data = await response.json();
    const pieData = data.data.map((item) => ({
      name: item.label,
      y: parseInt(item.total),
    }));

    setChartq3(pieData);
  };
  const fetchDatRable = async () => {
    const response = await fetch(`../api/table`);
    const data = await response.json();
    setDataTable(data.data);
  };

  useEffect(() => {
    fetchData();
    fetchDataChart();
    fetchDatRable();
    fetchDataChart2();
  }, []);

  return (
    <>
      <Form data={segmentList} />
      <section>
        <div className="flex gap-2 ">
          <Chart data={chartq1} chartID="chart1" />
          <LineChart ChartId="tes" />
        </div>
      </section>
      <section>
        <div className="flex mt-2 gap-2">
          <Chart data={chartq3} chartID="chart2" />
        </div>
      </section>
    </>
  );
};
export default Page;
