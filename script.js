document.getElementById('clickMe').addEventListener('click', function() {
    const message = document.getElementById('message');
    message.textContent = 'Hello! You clicked the button.';
    message.style.color = 'green';
});