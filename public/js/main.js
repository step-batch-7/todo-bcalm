const showAddListOption = function() {
  document.getElementById('addList').style['transform'] = 'scale(1)';
};

const cancelList = function() {
  document.getElementById('listName').value = '';
  document.getElementById('addList').style['transform'] = 'scale(0)';
};
