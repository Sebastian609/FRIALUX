import { useReadings } from '@/hooks/readings/get-last-24h-readings.hook';
import { ReadingType } from '@/types/readingTypes/readingtypes.type';
import React from 'react';

// 1. Importaciones de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 2. Registro de componentes de Chart.js (requerido)
// Chart.js es modular, por lo que debes registrar las partes que vas a usar.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ReadingsChartProps {
  readingType: ReadingType;
  moduleId: string;
}

const ReadingsChart: React.FC<ReadingsChartProps> = ({ moduleId, readingType }) => {
  const { data: readings, isLoading, isError } = useReadings(readingType.id, moduleId);

  // 3. Preparación de datos y opciones para Chart.js
  const chartDataAndOptions = React.useMemo(() => {
    if (!readings) return { data: { labels: [], datasets: [] }, options: {} };

    const sortedReadings = readings
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Chart.js necesita los datos en un formato específico
    const data = {
      labels: sortedReadings.map(r => new Date(r.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })),
      datasets: [
        {
          label: readingType.name || 'Reading Value',
          data: sortedReadings.map(r => parseFloat(r.value)),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1 // Esto suaviza la línea (similar a type="monotone")
        },
      ],
    };

    // Objeto de configuración para el gráfico
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: `Last 24 Hours: ${readingType.name}`,
        },
      },
      scales: {
        y: {
            beginAtZero: false // Puedes ajustarlo si prefieres que el eje Y empiece en 0
        }
      }
    };

    return { data, options };
  }, [readings, readingType.name]);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }

  if (chartDataAndOptions.data.datasets.length === 0 || chartDataAndOptions.data.datasets[0].data.length === 0) {
    return <p>No data to display in the chart for the last 24 hours.</p>;
  }

  return (
    // 4. Renderizado del componente de Chart.js
    <div className='w-full' style={{ width: '100%', height: '600px' }}>
      <Line options={chartDataAndOptions.options} data={chartDataAndOptions.data} />
    </div>
  );
};

export default ReadingsChart;