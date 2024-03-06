import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useState } from 'react';

const LineChart = ({ initialData, title }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [currentData, setCurrentData] = useState(initialData || []);
  const [time, setTime] = useState('1m');

  const updateChart = (timeRange) => {
    setTime(timeRange);
    //setCurrentData(dataByTimeRange[timeRange]);
  }

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labelsByTimeRange = {
      '3d': ['Jan 1', 'Jan 2', 'Jan 3'],
      '1w': ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
      '1m': ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12'],
      '1y': Array.from({ length: 365 }, (_, i) => i + 1), // Array from 1 to 365 for 1 year
    };

    const data = [];
    for (let i = 0; i <= 11; i++) {
        data.push(Math.random() * 10);
    }

    const dataByTimeRange = {
      '3d': [50, 10, 30],
      '1w': [28, 10, 30, 19, 81, 14, 15],
      '1m': [100, 10, 30, 20, 20, 50, 124, 12, 14, 42, 41, 91],
      '1y': Array.from({ length: 365 }, (_, i) => i + 1), // Array from 1 to 365 for 1 year
    };

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labelsByTimeRange[time],
          datasets: [{
              data: dataByTimeRange[time],
              backgroundColor: ['rgba(36, 97, 255, 0.7), rgba(36, 97, 255, 0)'], // Fill color
              borderColor: '#2461FF', // Line color
              borderWidth: 1,
              tension: 0.5, // Set tension to make the line smooth
              fill: true,
              pointRadius: 0
          }]
      },
      options: {
          plugins: {
            title: {
              display: true,
              text: title,
              font: {
                size: 18 // Adjust font size as needed
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
              x: {
                beginAtZero: true,
                grid: {
                  display: false
                }
              },
              y: {
                  beginAtZero: true,
                  grid: {
                    display: false
                  }
              }
          },
      }
    });

    console.log(labelsByTimeRange[time]);
    console.log(dataByTimeRange[time]);

    // Cleanup function to destroy the chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    
  }, [time]);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: '5px', height: '80px', borderColor: 'blue' }}></canvas>)
      <div id="buttons">
        <button onClick={() => updateChart('3d')}>Last 3 Days</button>
        <button onClick={() => updateChart('1w')}>1 Week</button>
        <button onClick={() => updateChart('1m')}>1 Month</button>
        <button onClick={() => updateChart('1y')}>1 Year</button>
      </div>
    </div>
  );
};

export default LineChart;
