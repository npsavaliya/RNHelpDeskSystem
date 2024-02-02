import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  View,
  TextStyle,
  Text,
  ViewStyle,
  ImageStyle,
  Alert,
} from "react-native";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {Icon, TextField, TextFieldAccessoryProps, Button} from '../../components';
import {fontScale, scale} from '../../utils/sizes';
import {colors} from '../../theme';
import {Error, loginUser} from '../../services/api';
import { saveString, saveUser, storageKeys } from '../../utils/storage';
import {isNonEmptyString} from '../../utils/common';
import { GlobalContext } from '../../contexts/global.context';

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
            style={$eyeIcon}
            containerStyle={$eyeIconBox}
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
    Alert.alert(
      'Success',
      'You logged in successfully', [
        {text: 'OK', onPress: navigateToScreen},
      ]);
  };

  const showLoginFailureMessage = (errorMessage: string) => {
    const message = errorMessage || 'Failed to login. Please try again';

    Alert.alert(
      'Failure',
      message, [
        {text: 'OK', onPress: clearForm},
      ]);
  };

  const login = React.useCallback((username: string, password: string) =>
    async () => {
      try {
        const loginResponse = await loginUser(username, password);
        if (loginResponse?.user?.id) {
          showLoginSuccessMessage(loginResponse.user.id);

          // save active session token in async storage
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
    <View style={$container}>
      <StatusBar style="auto" />
      <View style={$signInBox}>
        <Text style={[$labelStyle, {
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
        containerStyle={[$textFieldContainerStyle, { marginTop: scale(20) }]}
        inputWrapperStyle={$textFieldBox}
        LabelTextProps={{
          style: $labelStyle
        }}
        style={$inputStyle}
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
        containerStyle={$textFieldContainerStyle}
        inputWrapperStyle={$textFieldBox}
        RightAccessory={PasswordRightAccessory}
        LabelTextProps={{
          style: $labelStyle
        }}
        style={$inputStyle}
        onSubmitEditing={login(username, password)}
      />
      <Button
        text='Login'
        style={$loginBtnBox}
        onPress={login(username, password)}
        disabled={disabled}
      />
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  alignItems: 'center',
}

const $loginBtnBox: ViewStyle = {
  marginTop: scale(20),
  width: '80%'
}

const $signInBox: ViewStyle = {
  alignItems: 'flex-start',
  marginTop: scale(30),
};

const $signupBox: ViewStyle = {
  marginTop: scale(16),
  flexDirection: 'row',
  alignItems: 'center',
}

const $dontHaveAccountText: TextStyle ={
  color: colors.text
}

const $signupButton: ViewStyle = {
  marginLeft: scale(8),
  paddingVertical: 0,
  paddingHorizontal: 0,
  backgroundColor: colors.transparent,
}

const $signupText: TextStyle = {
  color: colors.palette.green500,
  fontSize: scale(16),
}

const $textFieldBox: ViewStyle = {
  width: '100%',
  backgroundColor: colors.textFieldBackground,
  borderWidth: 0,
}

const $inputStyle: TextStyle = {
  fontWeight: 'normal',
  color: colors.text,
  fontSize: fontScale(16),
  paddingHorizontal: scale(8),
  paddingVertical: scale(8),
  width: '100%',
};

const $labelStyle: TextStyle = {
  color: colors.text,
  fontSize: fontScale(16),
  lineHeight: scale(19),
  fontWeight: 'bold',
  marginBottom: scale(8),
};

const $textFieldContainerStyle: ViewStyle = {
  marginTop: scale(30),
  width: '80%',
};

const $eyeIconBox: ViewStyle = {
  marginRight: scale(15),
}

const $eyeIcon: ImageStyle = {
  height: scale(20),
  width: scale(20),
  resizeMode: 'contain',
}
