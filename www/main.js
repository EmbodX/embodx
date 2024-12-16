import './style.css'
import './network.css'

import init, { send_device_control_toggle_to_bevy, send_device_state_to_bevy } from './public/out/embodx'
import './components/qrcode-display'
import './components/footer-display'

const qrcodeDisplay = document.querySelector("qrcode-display");
qrcodeDisplay.setAttribute("data", window.location.href);

document.getElementById('start').addEventListener('click', () => {
  console.log('start');
  document.body.classList.add('playing');
  // init();

// Initialize WASM
init().then(() => {
    // Expose the functions globally
    window.send_device_control_toggle_to_bevy = send_device_control_toggle_to_bevy;
    window.send_device_state_to_bevy = send_device_state_to_bevy;
    
    console.log('WASM functions are now available globally');
});

});

document.querySelector('.back-home-page').addEventListener('click', () => {
  console.log('stop');
  window.location.reload(); // todo find an more elegant and performant to cleanup wasm instanciations
})
