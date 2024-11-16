import React from "react";
import { SafeAreaView } from "react-native";
import WaveformScreen from "./screens/Waveform";

export default function App() {
  const sampleCount = 100; // 샘플 수

  const waveformArray = Array.from(
    { length: sampleCount },
    () => Math.random() * 0.5
  );

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <WaveformScreen waveformArray={waveformArray} />
    </SafeAreaView>
  );
}
