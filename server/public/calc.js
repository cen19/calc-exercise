var actions = [];


var temp = '';

var queueAction = function(button) {
  console.log('button is working for ', button);
  console.log('temp', temp);
  if (!Number(button)) {
    if (temp) {
      actions.push(temp);
      temp = '';
      actions.push(button);
    } else {
      if (!Number(actions[actions.length - 1])) {
        actions.pop();
        actions.push(button);
      }
    }
  } else {
    temp += button;
  }
  displayAction(temp || button);
};

var displayAction = function(action) {
  document.getElementById('input-field').value = action;
};

var getAnswer = function() {
  actions.push(temp);

  var submitActions = new XMLHttpRequest();
  submitActions.open('POST', 'http://localhost:3000/calc', true);
  submitActions.setRequestHeader('Content-type', 'application/json');  
  submitActions.send(JSON.stringify(actions));
  submitActions.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText, typeof this.responseText);
      var answer = this.responseText;
      // console.log(this.responseText.answer, typeof this.responseText.answer);
      document.getElementById('input-field').value = this.responseText;
    }
  };

};