import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store';
import type { FusedEntity } from '../types';

export function usePlaybackManager(historicalData: Map<number, FusedEntity[]> | null) {
  const {
    isPlaybackMode,
    playbackStartTime,
    playbackEndTime,
    playbackCurrentTime,
    setPlaybackCurrentTime,
    setEntities,
  } = useAppStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const playbackIntervalRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  // Build trajectories for entities
  const buildTrajectories = (
    currentTime: number,
    data: Map<number, FusedEntity[]>
  ): FusedEntity[] => {
    if (!data) return [];

    const entities = data.get(currentTime);
    if (!entities) return [];

    // Build trajectory for each entity (last 30 seconds)
    const trajectoryWindow = 30000; // 30 seconds
    const startTrajectoryTime = currentTime - trajectoryWindow;

    return entities.map(entity => {
      const trajectory: Array<{ x: number; y: number; z: number; timestamp: number }> = [];

      // Collect positions from historical data
      for (let t = startTrajectoryTime; t <= currentTime; t += 100) {
        const snapshot = data.get(t);
        if (snapshot) {
          const historicalEntity = snapshot.find(e => e.entity_id === entity.entity_id);
          if (historicalEntity) {
            trajectory.push({
              x: historicalEntity.position.x,
              y: historicalEntity.position.y,
              z: historicalEntity.position.z,
              timestamp: t,
            });
          }
        }
      }

      return {
        ...entity,
        trajectory,
      };
    });
  };

  // Update playback position
  const updatePlayback = () => {
    if (!isPlaybackMode || !historicalData || !isPlaying) return;

    const now = Date.now();
    const deltaTime = now - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = now;

    // Calculate new time based on playback speed
    const timeIncrement = deltaTime * playbackSpeed;
    let newTime = playbackCurrentTime + timeIncrement;

    // Loop back to start if reached end
    if (newTime >= playbackEndTime) {
      newTime = playbackStartTime;
    }

    // Round to nearest 100ms (our data interval)
    newTime = Math.round(newTime / 100) * 100;

    setPlaybackCurrentTime(newTime);

    // Get entities at current time with trajectories
    const entitiesWithTrajectories = buildTrajectories(newTime, historicalData);
    setEntities(entitiesWithTrajectories);
  };

  // Start/stop playback
  useEffect(() => {
    if (isPlaying && isPlaybackMode && historicalData) {
      lastUpdateTimeRef.current = Date.now();
      playbackIntervalRef.current = window.setInterval(updatePlayback, 16); // ~60 FPS
    } else {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
    }

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
      }
    };
  }, [isPlaying, isPlaybackMode, historicalData, playbackSpeed, playbackCurrentTime]);

  // Update entities when seeking
  const handleSeek = (time: number) => {
    setPlaybackCurrentTime(time);
    if (historicalData) {
      const roundedTime = Math.round(time / 100) * 100;
      const entitiesWithTrajectories = buildTrajectories(roundedTime, historicalData);
      setEntities(entitiesWithTrajectories);
    }
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Change playback speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  return {
    isPlaying,
    playbackSpeed,
    handlePlayPause,
    handleSeek,
    handleSpeedChange,
  };
}
