import React, { Component } from 'react'
import dynamic from 'umi/dynamic';

// export default class componentName extends Component {
//   render() {
//     return (
//       <div>
//         User
//       </div>
//     )
//   }
// }
const User = dynamic({
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => <div> <div>
        User
      </div></div>);
      }, 1000);
    });
  },
});
export default User

