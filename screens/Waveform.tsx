import React, { useEffect, useState } from "react";
import {
  useSharedValue,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import Wave from "./Wave";
import { Pressable, Text, View } from "react-native";

interface WaveformProps {
  waveformArray: number[]; // 파형 데이터 배열
}

const WaveformScreen = ({ waveformArray }: Readonly<WaveformProps>) => {
  const c1y = useSharedValue(0);
  const c2y = useSharedValue(0);
  const c11y = useSharedValue(0);
  const c22y = useSharedValue(0);

  const animateWaves = async () => {
    for (let index = 0; index < waveformArray.length; index++) {
      const value = waveformArray[index];
      console.log(value, index);

      // 각 요소에 대한 애니메이션 실행
      //   c1y.value = withTiming(value, { duration: 500 });
      //   c2y.value = withTiming(1 - value, { duration: 500 });
      c1y.value = withDelay(
        0,
        withRepeat(withTiming(value, { duration: 500 }), -1, true)
      );

      c2y.value = withDelay(
        200,
        withRepeat(withTiming(0.5 - value, { duration: 500 }), -1, true)
      );

      c11y.value = withDelay(
        0,
        withRepeat(withTiming(0.5 - value * 0.7, { duration: 500 }), -1, true)
      );

      c22y.value = withDelay(
        200,
        withRepeat(withTiming(value * 0.7, { duration: 500 }), -1, true)
      );

      // 1초 대기
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  const handleWave = () => {
    // 애니메이션 초기화
    c1y.value = 0;
    c2y.value = 0;
    c11y.value = 0;
    c22y.value = 0;
    animateWaves();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Pressable onPress={handleWave}>
        <Text>Wave</Text>
      </Pressable>
      <Wave c1y={c1y} c2y={c2y} />
      <Wave c1y={c11y} c2y={c22y} fillColor="#f0c0804d" fromY={0.4} toY={0.2} />
      <Wave c1y={c11y} c2y={c22y} fillColor="#f0c08033" fromY={0.2} toY={0.4} />
    </View>
  );
};

export default WaveformScreen;
