import React from 'react';
import {Text, TouchableOpacity} from "react-native-web";


const TextButton = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
