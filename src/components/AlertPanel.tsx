import { useState, useMemo } from 'react';
import { useAppStore } from '../store';
import type { Alert } from '../types';

type AlertFilter = 'all' | 'active' | 'acknowledged' | 'resolved';
type SeverityFilter = 'all' | 'critical' | 'warning' | 'info';

export function AlertPanel() {
  const alerts = useAppStore(state => state.alerts);
  const floors = useAppStore(state => state.floors);
  const acknowledgeAlert = useAppStore(state => state.acknowledgeAlert);
  const selectedAlert = useAppStore(state => state.selectedAlert);
  const setSelectedAlert = useAppStore(state => state.setSelectedAlert);

  const [statusFilter, setStatusFilter] = useState<AlertFilter>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    return alerts
      .filter(alert => {
        if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
        if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
        return true;
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [alerts, statusFilter, severityFilter]);

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
    }
  };

  const getStatusBadge = (status: Alert['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs bg-red-600 text-white rounded">Active</span>;
      case 'acknowledged':
        return <span className="px-2 py-1 text-xs bg-yellow-600 text-white rounded">Acknowledged</span>;
      case 'resolved':
        return <span className="px-2 py-1 text-xs bg-green-600 text-white rounded">Resolved</span>;
    }
  };

  const getRoomName = (roomId?: string) => {
    if (!roomId) return 'Unknown';
    for (const floor of floors) {
      const room = floor.rooms.find(r => r.room_id === roomId);
      if (room) return room.name;
    }
    return 'Unknown';
  };

  const getFloorName = (floorId?: string) => {
    if (!floorId) return 'Unknown';
    const floor = floors.find(f => f.floor_id === floorId);
    return floor?.name || 'Unknown';
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert.alert_id);
  };

  const handleAcknowledge = (alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    acknowledgeAlert(alertId);
  };

  const activeCount = alerts.filter(a => a.status === 'active').length;
  const acknowledgedCount = alerts.filter(a => a.status === 'acknowledged').length;
  const resolvedCount = alerts.filter(a => a.status === 'resolved').length;

  return (
    <div className="absolute bottom-4 left-4 w-96 max-h-[60vh] bg-gray-800 bg-opacity-95 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>🔔</span>
            Alerts
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>

        {isExpanded && (
          <>
            {/* Status Filter */}
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All ({alerts.length})
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  statusFilter === 'active'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setStatusFilter('acknowledged')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  statusFilter === 'acknowledged'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Ack'd ({acknowledgedCount})
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  statusFilter === 'resolved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Resolved ({resolvedCount})
              </button>
            </div>

            {/* Severity Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSeverityFilter('all')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  severityFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All Severity
              </button>
              <button
                onClick={() => setSeverityFilter('critical')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  severityFilter === 'critical'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Critical
              </button>
              <button
                onClick={() => setSeverityFilter('warning')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  severityFilter === 'warning'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Warning
              </button>
              <button
                onClick={() => setSeverityFilter('info')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  severityFilter === 'info'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Info
              </button>
            </div>
          </>
        )}
      </div>

      {/* Alert List */}
      {isExpanded && (
        <div className="overflow-y-auto max-h-[calc(60vh-180px)] p-2">
          {filteredAlerts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No alerts to display</p>
          ) : (
            <div className="space-y-2">
              {filteredAlerts.map(alert => (
                <div
                  key={alert.alert_id}
                  onClick={() => handleAlertClick(alert)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAlert === alert.alert_id
                      ? 'bg-blue-900 bg-opacity-50 border-blue-500'
                      : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-semibold text-sm uppercase ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        {getStatusBadge(alert.status)}
                      </div>
                      <p className="text-white text-sm mb-2">{alert.message}</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>
                            {getRoomName(alert.context.room_id)} - {getFloorName(alert.context.floor_id)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🕐</span>
                          <span>{formatTime(alert.timestamp)}</span>
                        </div>
                        {alert.context.count !== undefined && (
                          <div className="flex items-center gap-2">
                            <span>👥</span>
                            <span>Count: {alert.context.count}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {alert.status === 'active' && (
                    <button
                      onClick={(e) => handleAcknowledge(alert.alert_id, e)}
                      className="w-full mt-2 px-3 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
