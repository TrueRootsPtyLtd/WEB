document.getElementById('donation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    if (amount > 0) {
        alert(`Amount entered: $${amount}. This form does not process payments.`);
        document.getElementById('impact-text').textContent = 'Impact estimates are unavailable until a documented calculation method is provided.';
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

