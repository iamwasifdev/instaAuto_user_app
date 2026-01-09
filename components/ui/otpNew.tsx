import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

interface OTPInputProps {
  code: string;
  setCode: (code: string) => void;
  maximumLength?: number;
  setIsPinReady: (ready: boolean) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ 
  code,
  setCode,
  maximumLength = 4,
  setIsPinReady,
}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<TextInput>(null);
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  
  const boxDigit = (_: number, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused
        ? styles.splitBoxesFocused
        : styles.splitBoxes;

    return (
      <View style={StyledSplitBoxes} key={index}>
        <Text style={styles.splitBoxText}>{digit}</Text>
      </View>
    );
  };

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    setIsPinReady(code.length === maximumLength);
    return () => {
      setIsPinReady(false);
    };
  }, [code, maximumLength, setIsPinReady]);

  useEffect(() => {
    // Auto-focus on mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.splitOTPBoxesContainer}
        onPress={handleOnPress}
        activeOpacity={1}
      >
        {boxArray.map(boxDigit)}
      </TouchableOpacity>
      <TextInput
        style={styles.textInputHidden}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        keyboardType="numeric"
        returnKeyType="done"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
      />
    </View>
  );
};

// Example usage component
export default function App() {
  const [otpCode, setOtpCode] = useState<string>('');
  const [isPinReady, setIsPinReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleVerify = (): void => {
    if (isPinReady) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert(`OTP Verified: ${otpCode}`);
        setOtpCode('');
      }, 1500);
    }
  };

  const handleResend = (): void => {
    setOtpCode('');
    alert('OTP Resent!');
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to your phone
        </Text>

        <View style={styles.otpContainer}>
          <OTPInput
            code={otpCode}
            setCode={setOtpCode}
            maximumLength={4}
            setIsPinReady={setIsPinReady}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            (!isPinReady || isLoading) && styles.buttonDisabled,
          ]}
          onPress={handleVerify}
          disabled={!isPinReady || isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
          <Text style={styles.resendText}>did not receive the code? </Text>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    marginBottom: 32,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splitOTPBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  splitBoxes: {
    borderColor: '#DDDDDD',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    minWidth: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#FAFAFA',
  },
  splitBoxesFocused: {
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    minWidth: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  splitBoxText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  textInputHidden: {
    position: 'absolute',
    width: 300,
    height: 70,
    opacity: 0,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    flexDirection: 'row',
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
  },
  resendLink: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
});