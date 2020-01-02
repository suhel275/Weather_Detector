const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const fetchData = location => {
  const url = `/weather?address=${location}`;

  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      }

      messageOne.textContent = data.location;
      messageTwo.textContent = data.foreCast;
    });
  });
};

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'loading....';
  messageTwo.textContent = '';
  fetchData(location);
});
