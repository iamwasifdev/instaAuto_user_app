// components/ErrorBox.tsx
import { View, Text } from 'react-native';

interface ErrorBoxProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ErrorBox({ text, size = 'medium' }: ErrorBoxProps) {
  // Don't render if no text
  if (!text) return null;

  // Size styles
  const sizeStyles = {
    small: 'p-2 text-xs',
    medium: 'p-2 text-md',
    large: 'p-3 text-lg',
  };

  return (
    <View className={`bg-red-100 border-2 border-red-400 rounded ${sizeStyles[size]}`}>
      <Text className={`text-red-500 ${sizeStyles[size]}`}>
        {text}
      </Text>
    </View>
  );
}