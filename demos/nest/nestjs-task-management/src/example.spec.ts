describe("my test", () => {
  it("return  true", () => {
    expect(true).toEqual(true);
  });
});

// feature
class FriendsList {
  friends = [];
  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }
  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);
    if (idx === -1) {
      throw new Error("Friend not found!");
    }
    this.friends.splice(idx, 1);
  }
}
// test
describe("friends list", () => {
  let friendsList;
  // 每次it测试之前都会运行
  beforeEach(() => {
    friendsList = new FriendsList();
  });
  // const friendsList = new FriendsList();
  it("initializes friends list", () => {
    expect(friendsList.friends.length).toEqual(0);
  });
  it("add a  friend to the list", () => {
    friendsList.addFriend("name1");
    expect(friendsList.friends.length).toEqual(1);
  });
  it("announce friendship", () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend("name1");
    expect(friendsList.announceFriendship).toHaveBeenCalledWith("name1");
  });

  describe("remove friend", () => {
    it("remove a friend from the list", () => {
      friendsList.addFriend("name1");
      expect(friendsList.friends[0]).toEqual("name1");
      friendsList.removeFriend("name1");
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it("throw an error as friend not exist", () => {
      expect(() => friendsList.removeFriend("name2")).toThrow(
        new Error("Friend not found!")
      );
    });
  });
});
