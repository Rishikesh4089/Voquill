import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Mic, Square, Pause, Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { spacing, typography, sizes } from '@/constants/Theme';
import { RecordingStatus } from '@/types';
import useTheme from '@/hooks/useThemeContext';

interface VoiceRecorderProps {
  onRecordingStatusChange: (status: RecordingStatus) => void;
  onRecordingComplete: (recordingUri: string) => void;
}

export default function VoiceRecorder({
  onRecordingStatusChange,
  onRecordingComplete,
}: VoiceRecorderProps) {
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>(RecordingStatus.IDLE);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveformValues] = useState(
    Array.from({ length: 20 }, () => new Animated.Value(0))
  );
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // This would actually use Expo's Audio API in a real implementation
  // For now, we'll simulate recording behavior
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (recordingStatus === RecordingStatus.RECORDING) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }

    onRecordingStatusChange(recordingStatus);
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [recordingStatus]);

  // Animate waveform when recording
  useEffect(() => {
    if (recordingStatus === RecordingStatus.RECORDING) {
      animateWaveform();
    } else {
      waveformValues.forEach((value) => {
        Animated.timing(value, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [recordingStatus]);

  const animateWaveform = () => {
    const animations = waveformValues.map((value, index) => {
      return Animated.sequence([
        Animated.timing(value, {
          toValue: Math.random() * 0.8 + 0.2, // Random value between 0.2 and 1
          duration: 300 + Math.random() * 500, // Random duration
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(value, {
          toValue: Math.random() * 0.5 + 0.1, // Random value between 0.1 and 0.6
          duration: 300 + Math.random() * 500, // Random duration
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]);
    });

    Animated.stagger(50, animations).start(() => {
      if (recordingStatus === RecordingStatus.RECORDING) {
        animateWaveform();
      }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    setRecordingStatus(RecordingStatus.RECORDING);
    setRecordingTime(0);
  };

  const pauseRecording = async () => {
    setRecordingStatus(RecordingStatus.PAUSED);
  };

  const resumeRecording = async () => {
    setRecordingStatus(RecordingStatus.RECORDING);
  };

  const stopRecording = async () => {
    setRecordingStatus(RecordingStatus.STOPPED);
    // In a real app, this would return the actual recording URI
    onRecordingComplete('recording://mock-uri');
  };

  const renderRecordButton = () => {
    switch (recordingStatus) {
      case RecordingStatus.IDLE:
        return (
          <TouchableOpacity
            style={[
              styles.recordButton,
              styles.recordButtonIdle,
              { backgroundColor: Colors.primary[500] }
            ]}
            onPress={startRecording}
          >
            <Mic size={32} color="#fff" />
          </TouchableOpacity>
        );
      case RecordingStatus.RECORDING:
        return (
          <View style={styles.recordingControls}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: isDark ? Colors.gray[800] : Colors.gray[200] }
              ]}
              onPress={pauseRecording}
            >
              <Pause 
                size={24} 
                color={isDark ? Colors.gray[300] : Colors.gray[700]} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.recordButton,
                styles.recordButtonRecording,
                { backgroundColor: Colors.error[500] }
              ]}
              onPress={stopRecording}
            >
              <Square size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      case RecordingStatus.PAUSED:
        return (
          <View style={styles.recordingControls}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: isDark ? Colors.gray[800] : Colors.gray[200] }
              ]}
              onPress={resumeRecording}
            >
              <Play 
                size={24} 
                color={isDark ? Colors.gray[300] : Colors.gray[700]} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.recordButton,
                styles.recordButtonPaused,
                { backgroundColor: Colors.primary[500] }
              ]}
              onPress={stopRecording}
            >
              <Square size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {recordingStatus !== RecordingStatus.IDLE && (
        <View style={styles.waveformContainer}>
          {waveformValues.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                styles.waveformBar,
                {
                  height: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [4, 40],
                  }),
                  backgroundColor: recordingStatus === RecordingStatus.RECORDING
                    ? Colors.primary[500]
                    : isDark ? Colors.gray[600] : Colors.gray[300],
                },
              ]}
            />
          ))}
        </View>
      )}
      
      {recordingStatus !== RecordingStatus.IDLE && (
        <Text style={[
          styles.recordingTime,
          { color: isDark ? Colors.gray[300] : Colors.gray[700] }
        ]}>
          {formatTime(recordingTime)}
        </Text>
      )}
      
      <View style={styles.buttonContainer}>
        {renderRecordButton()}
      </View>
      
      <Text style={[
        styles.helpText,
        { color: isDark ? Colors.gray[400] : Colors.gray[600] }
      ]}>
        {recordingStatus === RecordingStatus.IDLE
          ? 'Tap microphone to start recording'
          : recordingStatus === RecordingStatus.RECORDING
          ? 'Recording... Tap square to stop'
          : recordingStatus === RecordingStatus.PAUSED
          ? 'Recording paused. Tap play to resume'
          : 'Processing recording...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  buttonContainer: {
    marginVertical: spacing.md,
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonIdle: {
    transform: [{ scale: 1 }],
  },
  recordButtonRecording: {
    transform: [{ scale: 0.9 }],
  },
  recordButtonPaused: {
    transform: [{ scale: 0.9 }],
  },
  recordingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recordingTime: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '600',
    marginVertical: spacing.md,
  },
  helpText: {
    fontSize: typography.fontSizes.sm,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '80%',
    maxWidth: 300,
    justifyContent: 'space-between',
  },
  waveformBar: {
    width: 4,
    borderRadius: 2,
  },
});