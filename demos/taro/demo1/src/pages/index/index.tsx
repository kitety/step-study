import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Child from "./child";
import "./index.less";

function Index() {
  const [userName, setUserName] = useState<number>(1);
  const [blogTitle, setBlogTitle] = useState<string>("");
  useEffect(() => {
    setBlogTitle(this.$router.params.blogTitle);
  }, []);

  return (
    <View>
      <Text
        onClick={() => {
          setUserName(userName + 1);
        }}
      >
        {userName}
      </Text>
      <Child username={String(userName)} />
      {blogTitle && <Text>{blogTitle}</Text>}
    </View>
  );
}
export default Index;
