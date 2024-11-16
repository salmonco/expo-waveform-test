import React from "react";
import {
  useSharedValue,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import Wave from "./Wave";
import { Pressable, Text, View } from "react-native";

export default function WaveScreen() {
  const c1y = useSharedValue(0.2);
  const c2y = useSharedValue(0.8);

  const handleWave = () => {
    c1y.value = withDelay(
      0,
      withRepeat(withTiming(0.8, { duration: 500 }), -1, true)
    );

    c2y.value = withDelay(
      200,
      withRepeat(withTiming(0.2, { duration: 500 }), -1, true)
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Wave</Text>
      <Pressable onPress={handleWave}>
        <Text>🌊</Text>
      </Pressable>
      <Wave c1y={c1y} c2y={c2y} />
    </View>
  );
}
