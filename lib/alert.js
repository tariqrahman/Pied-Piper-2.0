// Trigger an alert to signify log-out worked
function handleAlert(state) {
  if (!state) {
    alert('successfully signed out');
  }
  else {
    alert('successfully signed in');
  }
}

export default handleAlert;
