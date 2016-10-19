var Stack = {
  stack: function() {
    var vec;

    this.push = function(element) {
      if (typeof(vec) === 'undefined') {
        vec = [];
      }
      vec.push(element);
    }

    this.pop = function() {
      return vec.pop();
    }

    this.top = function() {
      return vec[vec.length - 1];
    }
  }
}
