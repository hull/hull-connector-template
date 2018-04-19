(function onEmbedWrapper() {
  if (window.Hull) {
    // you can use object spread syntax
    const a = { a: 1 };
    const b = { b: 2 };
    const c = { ...a , ...b, c: 3 };
    Hull.onEmbed(function onEmbed(rootNode, deployment, hull) {
      console.log("test");
    });
  }
}());
