document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.querySelector('.form-booking');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Add timestamp
            data.timestamp = new Date().toISOString();

            // Send to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbw9ecDjQf6E_4OgEx4t2BiRVjSop10T70KxrvoKTqd9LcZ1LvuWPiu3WvfjmUQMfx_r/exec', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
                    bookingForm.reset();
                } else {
                    alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
            });
        });
    }
});
