import Taro,{ View, Text } from "@tarojs/components";

interface IProps {
  username: string;
}
function Child({ username }: IProps) {
  return (
    <View>
      <Text>The child {username}</Text>
    </View>
  );
}
export default Child;
