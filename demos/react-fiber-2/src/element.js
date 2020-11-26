export default {
  type: "div",
  props: {
    id: "a1",
    children: [
      {
        type: "div",
        props: {
          id: "b1",
          children: [
            {
              type: "div",
              props: {
                id: "c1",
              },
            },
            {
              type: "div",
              props: {
                id: "c2",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          id: "b2",
        },
      },
    ],
  },
};
