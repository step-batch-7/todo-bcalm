const openSideBar = function(e) {
  const sideBar = document.getElementById('sideBar');
  sideBar.style['transition'] = 'width 0.1s';
  sideBar.style.width = '20vw';
  sideBar.style['display'] = 'block';
  document.getElementById('menuBar').style['display'] = 'none';
  document.getElementById('crossButton').style['display'] = 'block';
};

const closeSideBar = function(e) {
  document.getElementById('sideBar').style.width = '0vw';
  document.getElementById('menuBar').style['display'] = 'block';
  document.getElementById('crossButton').style['display'] = 'none';
};
