document.getElementById('donation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    if (amount > 0) {
        alert(`Thank you for your donation of $${amount}!`);
        // Simulate impact calculation
        const trees = Math.floor(amount / 10);
        document.getElementById('impact-text').textContent = `Your donation could help plant ${trees} native trees!`;
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
