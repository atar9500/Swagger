import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

const TextField = React.memo(
  ({
    placeholder,
    icon,
    inputType,
    hideText,
    onType,
    error,
    value,
    style,
    tintColor = COLOR.white,
  }) => (
    <Input
      inputContainerStyle={[
        styles.inputContainerStyle,
        {borderColor: tintColor},
      ]}
      containerStyle={style}
      leftIcon={{
        name: icon,
        type: 'material-community',
        color: tintColor,
        size: 18,
      }}
      secureTextEntry={hideText}
      inputStyle={[styles.inputStyle, {color: tintColor}]}
      autoFocus={false}
      keyboardType={inputType}
      errorStyle={[styles.inputErrorStyle, {color: tintColor}]}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor={hexToRGB(tintColor, 0.8)}
      placeholder={placeholder}
      selectionColor={tintColor}
      onChangeText={onType}
      errorMessage={error}
      value={value}
    />
  ),
);

function hexToRGB(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  inputContainerStyle: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    height: 45,
  },
  inputErrorStyle: {
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 4,
  },
});

export default TextField;
