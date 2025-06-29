// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useTheme } from '@/context/ThemeContext';
// import {InputProps} from '@/types/type'


// export const Input: React.FC<InputProps> = ({
//   label,
//   value,
//   onChangeText,
//   placeholder,a
//   secureTextEntry = false,
//   error,
//   keyboardType = 'default',
//   autoCapitalize = 'sentences',
// }) => {
//   const { theme } = useTheme();
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
//       <View style={[
//         styles.inputContainer,
//         {
//           borderColor: error ? theme.colors.error : (isFocused ? theme.colors.primary : theme.colors.border),
//           backgroundColor: theme.colors.surface,
//           borderRadius: theme.borderRadius.md,
//         }
//       ]}>
//         <TextInput
//           style={[styles.input, { color: theme.colors.text }]}
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           placeholderTextColor={theme.colors.textSecondary}
//           secureTextEntry={secureTextEntry && !isPasswordVisible}
//           keyboardType={keyboardType}
//           autoCapitalize={autoCapitalize}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />
//         {secureTextEntry && (
//           <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
//             <Ionicons
//               name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
//               size={20}
//               color={theme.colors.textSecondary}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//       {error && <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>}
//     </View>
//   );
// };

// const inputStyles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 8,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     paddingHorizontal: 16,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 16,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     padding: 4,
//   },
//   errorText: {
//     fontSize: 14,
//     marginTop: 4,
//   },
// });
