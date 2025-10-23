import { useAppStore } from '../store';
import type { Alert } from '../types';

export function AlertBanner() {
  const alerts = useAppStore(state => state.alerts);
  const setSelectedAlert = useAppStore(state => state.setSelectedAlert);

  // Get the most recent critical or warning alert
  const topAlert = alerts
    .filter(a => a.status === 'active')
    .sort((a, b) => {
      // Sort by severity first (critical > warning > info)
      const severityOrder = { critical: 3, warning: 2, info: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      // Then by timestamp (newest first)
      return b.timestamp - a.timestamp;
    })[0];

  if (!topAlert) return null;

  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 border-red-500 text-white';
      case 'warning':
        return 'bg-yellow-600 border-yellow-500 text-white';
      case 'info':
        return 'bg-blue-600 border-blue-500 text-white';
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

  const activeCount = alerts.filter(a => a.status === 'active').length;

  return (
    <div
      className={`absolute top-20 left-1/2 transform -translate-x-1/2 z-30 min-w-96 max-w-2xl cursor-pointer transition-all duration-300 hover:scale-105 animate-slide-down ${getSeverityStyles(
        topAlert.severity
      )} border-2 rounded-lg shadow-2xl p-4`}
      onClick={() => setSelectedAlert(topAlert.alert_id)}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl animate-pulse">{getSeverityIcon(topAlert.severity)}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase text-sm tracking-wide">
              {topAlert.severity} Alert
            </span>
            {activeCount > 1 && (
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded animate-pulse">
                +{activeCount - 1} more
              </span>
            )}
          </div>
          <p className="text-sm mt-1">{topAlert.message}</p>
        </div>
      </div>
    </div>
  );
}
