// Figma page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const optionItems = document.querySelectorAll('.option-item');
    
    optionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            optionItems.forEach(option => {
                option.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
});