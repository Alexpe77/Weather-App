export function clearResult() {
    document.getElementById('photo1').src = '';
    document.getElementById('photo1').alt = '';
    document.getElementById('cityTitle').textContent = '';
    document.getElementById('forecasts').innerHTML = '';
  }  