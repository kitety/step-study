// module.exports = {
//   exportTrailingSlash: true,
//   exportPathMap: function() {
//     return {
//       "/": { page: "/" }
//     };
//   }
// };
function getPosts() {
  return [
    { id: "hello-nextjs", title: "Hello Next.js" },
    { id: "learn-nextjs", title: "Learn Next.js is awesome" },
    { id: "deploy-nextjs", title: "Deploy apps with ZEIT" }
  ];
}

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };

    getPosts().forEach(p => {
      paths[`/p/${p.id}`] = {
        page: "/p/[id]",
        query: { id: p.id }
      };
    });

    return paths;
  }
};
