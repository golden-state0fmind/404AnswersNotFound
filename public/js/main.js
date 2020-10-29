/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
const handleClick = e => {
     if (e.target.id === 'registerBtn') {
          window.location.href = '/auth/signup';
     } else if (e.target.id === 'spanish_inquisition') {
          window.location.href = '/inquire/create/inquisition';
     }
}
document.getElementById('registerBtn').addEventListener('click', handleClick);
document.getElementById('spanish_inquisition').addEventListener('click', handleClick);
