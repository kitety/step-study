import Taro, { useState } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";

function Index() {
  const [blogTitle, setBlogTitle] = useState<string>("tarodemo");
  function goTo() {
    Taro.navigateTo({ url: "/pages/index/index?blogTitle=" + blogTitle });
  }
  return (
    <View>
      <Text>The Index Page</Text>
      <Button onClick={goTo}>To Index Page</Button>
    </View>
  );
}
export default Index;
