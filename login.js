document.getElementById('btn').addEventListener('click', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value
  const pass = parseInt(document.getElementById('pass').value)
  let savedName = "abcd";
  let savedPass = 1234;
  if(name == savedName && pass==savedPass){
    alert('loged in...')
    window.location.href = './work.html'
  }
  else {
    alert('ivalid name or pass')
  }
})