import { useMemo } from 'react';
import { useAppStore, type TimeRange } from '../store';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function AnalyticsDashboard() {
  const showAnalytics = useAppStore(state => state.showAnalytics);
  const setShowAnalytics = useAppStore(state => state.setShowAnalytics);
  const timeRange = useAppStore(state => state.analyticsTimeRange);
  const setTimeRange = useAppStore(state => state.setAnalyticsTimeRange);
  const occupancyTrend = useAppStore(state => state.occupancyTrend);
  const occupancy = useAppStore(state => state.occupancy);
  const selectedFloorId = useAppStore(state => state.selectedFloorId);
  const heatmapData = useAppStore(state => state.heatmapData);

  if (!showAnalytics) {
    return (
      <button
        onClick={() => setShowAnalytics(true)}
        className="absolute bottom-4 right-4 z-10 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
      >
        📊 Show Analytics
      </button>
    );
  }

  return (
    <div className="absolute top-20 left-4 z-20 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-4 w-[600px] max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Analytics Dashboard</h2>
        <button
          onClick={() => setShowAnalytics(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Time Range Selector */}
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Occupancy Trend Chart */}
      <OccupancyTrendChart trendData={occupancyTrend} timeRange={timeRange} />

      {/* Peak Statistics */}
      <PeakStatistics trendData={occupancyTrend} />

      {/* Demographics Panel */}
      <DemographicsPanel occupancy={occupancy} />

      {/* Density Heatmap */}
      {selectedFloorId && heatmapData && (
        <DensityHeatmap heatmapData={heatmapData} />
      )}
    </div>
  );
}

function TimeRangeSelector({
  timeRange,
  setTimeRange,
}: {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}) {
  const ranges: { value: TimeRange; label: string }[] = [
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
  ];

  return (
    <div className="mb-4">
      <label className="text-sm text-gray-400 mb-2 block">Time Range</label>
      <div className="flex gap-2">
        {ranges.map(range => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              timeRange === range.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function OccupancyTrendChart({
  trendData,
  timeRange,
}: {
  trendData: Array<{ timestamp: number; count: number; male_count: number; female_count: number }>;
  timeRange: TimeRange;
}) {
  const chartData = useMemo(() => {
    return trendData.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        ...(timeRange === '7d' ? { month: 'short', day: 'numeric' } : {}),
      }),
      Total: point.count,
      Male: point.male_count,
      Female: point.female_count,
    }));
  }, [trendData, timeRange]);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Occupancy Trend</h3>
      <div className="bg-gray-900 rounded-lg p-3">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#fff',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line
              type="monotone"
              dataKey="Total"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Male"
              stroke="#10B981"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Female"
              stroke="#F59E0B"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PeakStatistics({
  trendData,
}: {
  trendData: Array<{ timestamp: number; count: number }>;
}) {
  const stats = useMemo(() => {
    if (trendData.length === 0) {
      return { peak: 0, peakTime: new Date(), average: 0 };
    }

    let peak = 0;
    let peakTime = new Date(trendData[0].timestamp);
    let sum = 0;

    trendData.forEach(point => {
      if (point.count > peak) {
        peak = point.count;
        peakTime = new Date(point.timestamp);
      }
      sum += point.count;
    });

    return {
      peak,
      peakTime,
      average: Math.round(sum / trendData.length),
    };
  }, [trendData]);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Peak Occupancy</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-1">Peak Count</div>
          <div className="text-2xl font-bold text-blue-400">{stats.peak}</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-1">Peak Time</div>
          <div className="text-sm font-semibold text-white">
            {stats.peakTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-1">Average</div>
          <div className="text-2xl font-bold text-green-400">{stats.average}</div>
        </div>
      </div>
    </div>
  );
}

function DemographicsPanel({
  occupancy,
}: {
  occupancy: Array<{ male_count: number; female_count: number }>;
}) {
  const demographics = useMemo(() => {
    const totalMale = occupancy.reduce((sum, occ) => sum + occ.male_count, 0);
    const totalFemale = occupancy.reduce((sum, occ) => sum + occ.female_count, 0);
    const total = totalMale + totalFemale;

    return [
      { name: 'Male', value: totalMale, percentage: total > 0 ? ((totalMale / total) * 100).toFixed(1) : '0' },
      { name: 'Female', value: totalFemale, percentage: total > 0 ? ((totalFemale / total) * 100).toFixed(1) : '0' },
    ];
  }, [occupancy]);

  const COLORS = ['#3B82F6', '#F59E0B'];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-3">Gender Distribution</h3>
      <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
        <ResponsiveContainer width="50%" height={150}>
          <PieChart>
            <Pie
              data={demographics}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              paddingAngle={5}
              dataKey="value"
            >
              {demographics.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#fff',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 pl-4">
          {demographics.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-300">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-white">{item.value}</div>
                <div className="text-xs text-gray-400">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DensityHeatmap({
  heatmapData,
}: {
  heatmapData: {
    grid: number[][];
    max_value: number;
    bounds: { min_x: number; max_x: number; min_y: number; max_y: number };
  };
}) {
  const getHeatColor = (value: number, maxValue: number): string => {
    if (maxValue === 0) return 'rgb(17, 24, 39)'; // gray-900
    
    const intensity = value / maxValue;
    
    if (intensity < 0.2) return 'rgb(30, 58, 138)'; // blue-900
    if (intensity < 0.4) return 'rgb(29, 78, 216)'; // blue-700
    if (intensity < 0.6) return 'rgb(234, 179, 8)'; // yellow-500
    if (intensity < 0.8) return 'rgb(249, 115, 22)'; // orange-500
    return 'rgb(220, 38, 38)'; // red-600
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-3">Density Heatmap</h3>
      <div className="bg-gray-900 rounded-lg p-3">
        <div className="grid gap-[1px] bg-gray-800" style={{
          gridTemplateColumns: `repeat(${heatmapData.grid[0]?.length || 0}, minmax(0, 1fr))`,
        }}>
          {heatmapData.grid.map((row, y) =>
            row.map((value, x) => (
              <div
                key={`${x}-${y}`}
                className="aspect-square"
                style={{
                  backgroundColor: getHeatColor(value, heatmapData.max_value),
                }}
                title={`Density: ${value}`}
              />
            ))
          )}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>Low Traffic</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(30, 58, 138)' }} />
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(29, 78, 216)' }} />
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(234, 179, 8)' }} />
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(249, 115, 22)' }} />
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(220, 38, 38)' }} />
          </div>
          <span>High Traffic</span>
        </div>
      </div>
    </div>
  );
}
