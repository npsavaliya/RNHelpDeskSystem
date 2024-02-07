import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  View,
  Text,
} from "react-native";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {Icon, TextField, TextFieldAccessoryProps, Button} from '../../components';
import {fontScale, scale} from '../../utils/sizes';
import {colors} from '../../theme';
import {loginUser} from '../../services/api';
import { saveUser, storageKeys } from '../../utils/storage';
import {isNonEmptyString} from '../../utils/common';
import { GlobalContext } from '../../contexts/global.context';
import { styles } from './loginStyle';
import Toast from 'react-native-root-toast';

/**
 * Login screen for user and service team
 * user login - username: user, password: password
 * service team login - username: admin, password: admin
 */
export default function Login(props: NativeStackScreenProps<StackScreens, 'Login'>) {

  const usernameInputRef = React.useRef<any>();
  const passwordInputRef = React.useRef<any>();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  const { user, checkLogin } = React.useContext(GlobalContext);

  const PasswordRightAccessory = React.useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={hidePassword ? "view" : "hidden"}
            color={colors.palette.neutral100}
            style={styles.eyeIcon}
            containerStyle={styles.eyeIconBox}
            onPress={() => setHidePassword(hide => !hide)}
          />
        )
      },
    [hidePassword],
  );

  const navigateToScreen = () => {
    checkLogin?.();
  };


  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  const showLoginSuccessMessage = (userId: number) => {
    // Alert.alert(
    //   'Success',
    //   'You logged in successfully', [
    //     {text: 'OK', onPress: navigateToScreen},
    //   ]);

    Toast.show('You logged in successfully', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: colors.palette.green500,
    });

    setTimeout(() => {
      navigateToScreen();
    }, 1000);
    
  };

  const showLoginFailureMessage = (errorMessage: string) => {
    const message = errorMessage || 'Failed to login. Please try again';

    // Alert.alert(
    //   'Failure',
    //   message, [
    //     {text: 'OK', onPress: clearForm},
    //   ]);

    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      textColor: colors.error
    });

    setTimeout(() => {
      clearForm();
    }, 1000);
  };

  const login = React.useCallback((username: string, password: string) =>
    async () => {
      try {
        const loginResponse = await loginUser(username, password);
        if (loginResponse?.user?.id) {
          showLoginSuccessMessage(loginResponse.user.id);

          // save user in async storage
          await saveUser(storageKeys.user, loginResponse.user);

          return;
        }
        showLoginFailureMessage('User not found');

        // focus username input to try refilling the form
        usernameInputRef.current.focus();
      } catch (error) {
        showLoginFailureMessage('User not found');

        // focus username input to try refilling the form
        usernameInputRef.current.focus();
      }
    }, []);

  const disabled = !(isNonEmptyString(username) && isNonEmptyString(password));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.signInBox}>
        <Text style={[styles.labelStyle, {
          color: colors.palette.green500,
          fontSize: fontScale(20)
        }]}>Sign In</Text>
      </View>
      <TextField
        ref={usernameInputRef}
        value={username}
        onChangeText={(text: string) => setUsername(text)}
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        keyboardType='email-address'
        label='User Name'
        placeholder="Enter"
        placeholderTextColor={'rgba(255, 255, 255, 0.24)'}
        containerStyle={[styles.textFieldContainerStyle, { marginTop: scale(20) }]}
        inputWrapperStyle={styles.textFieldBox}
        LabelTextProps={{
          style: styles.labelStyle
        }}
        style={styles.inputStyle}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      <TextField
        ref={passwordInputRef}
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={hidePassword}
        label='Password'
        placeholder='Enter'
        placeholderTextColor={'rgba(255, 255, 255, 0.24)'}
        containerStyle={styles.textFieldContainerStyle}
        inputWrapperStyle={styles.textFieldBox}
        RightAccessory={PasswordRightAccessory}
        LabelTextProps={{
          style: styles.labelStyle
        }}
        style={styles.inputStyle}
        onSubmitEditing={login(username, password)}
      />
      <Button
        text='Login'
        style={styles.loginBtnBox}
        onPress={login(username, password)}
        disabled={disabled}
      />
    </View>
  );
}
