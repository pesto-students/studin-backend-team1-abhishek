let ug = require('ug');

let graph = new ug.Graph();

// load graph from flatfile into RAM
graph.load('/path_to_saved_graph.ugd', function() {

  // get the closest 100 'listings' nodes, at a minimum depth (distance) of 3
  let results = graph.closest(node, {
    compare: function(node) { return node.entity === 'connection'; },
    minDepth: 3,
    count: 100
  });
  
  // results is now an array of Paths, which are each traces from your starting node to your result node...
  let resultNodes = result.map(function(path) {
    return path.end();
  })

  console.log('Generated Recommendations --> ', resultNodes);
  let connRecommendations = doSomething(resultNodes); // render, whatever you'd like

});