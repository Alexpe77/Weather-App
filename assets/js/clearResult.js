export function clearResult() {
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.innerHTML = '';
  document.getElementById('cityInput').value = '';
  document.getElementById('countryInput').value = '';
}