import { Text, TextProps } from "react-native";

// H1 - large heading
export function H1(props: TextProps & { className?: string }) {
  return (
    <Text
      {...props}
      className={`text-white/80 text-3xl font-bold ${props.className ?? ""}`}
    />
  );
}

// H2 - medium heading
export function H2(props: TextProps & { className?: string }) {
  return (
    <Text
      {...props}
      className={`text-white/80 text-2xl font-semibold ${props.className ?? ""}`}
    />
  );
}

// Body - default paragraph text
export function Body(props: TextProps & { className?: string }) {
  return (
    <Text
      {...props}
      className={`text-white/80 text-lg ${props.className ?? ""}`}
    />
  );
}

// Caption - small, muted text
export function Caption(props: TextProps & { className?: string }) {
  return (
    <Text
      {...props}
      className={`text-gray-400 text-sm ${props.className ?? ""}`}
    />
  );
}
