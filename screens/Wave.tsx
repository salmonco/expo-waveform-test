import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useDerivedValue,
  useAnimatedProps,
  SharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SIZE = 250;
const { width } = Dimensions.get("window");

export default function Wave({
  c1y,
  c2y,
  fillColor = "#f0c08080",
  fromY = 0.5,
  toY = 0.5,
}: Readonly<{
  c1y: SharedValue<number>;
  c2y: SharedValue<number>;
  fillColor?: string;
  fromY?: number;
  toY?: number;
}>) {
  const data = useDerivedValue(() => ({
    from: { x: 0, y: fromY },
    c1: { x: 1 / 3, y: c1y.value },
    c2: { x: 2 / 3, y: c2y.value },
    to: { x: 1, y: toY },
  }));

  const path = useAnimatedProps(() => {
    const { from, c1, c2, to } = data.value;

    return {
      d: [
        `M ${from.x * width} ${from.y * SIZE}`, // 시작점
        `C ${c1.x * width} ${c1.y * SIZE} ${c2.x * width} ${c2.y * SIZE} ${
          to.x * width
        } ${to.y * SIZE}`, // 곡선
        `L ${to.x * width} ${SIZE}`, // 아래쪽으로 선을 연결
        `L ${from.x * width} ${SIZE}`, // 시작점으로 아래쪽 선 연결
        "Z", // 경로 닫기
      ].join(" "),
    };
  });

  return (
    <Svg
      style={{ width, height: SIZE, position: "absolute", bottom: 0 }}
      viewBox={`0 0 ${width} ${SIZE}`}
    >
      <AnimatedPath fill={fillColor} animatedProps={path} />
    </Svg>
  );
}
