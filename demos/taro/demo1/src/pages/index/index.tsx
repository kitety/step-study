import Taro, { useState, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

function Index() {
  const [userName, setUserName] = useState("hello");
  return (
    <View>
      <Text>{userName}</Text>
    </View>
  );
}
export default Index;
