(function onEmbedWrapper() {
  if (window.Hull) {
    Hull.onEmbed(function onEmbed(rootNode, deployment, hull) {
      console.log("test");
    });
  }
}());
