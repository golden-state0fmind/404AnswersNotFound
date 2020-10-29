const handleClick = e => {
     if (e.target.id === 'spanish_inquisition') {
          window.location.href = '/inquire/create/inquisition';
     }
     window.location.href = '/auth/signup';
};

document.getElementById('registerBtn').addEventListener('click', handleClick);

document
     .getElementById('spanish_inquisition')
     .addEventListener('click', handleClick);
