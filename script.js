document.addEventListener("DOMContentLoaded", function () {
  const fancyElements = document.querySelectorAll(".fancy");

  fancyElements.forEach((text) => {
      const strText = text.textContent;
      text.textContent = "";

      for (let i = 0; i < strText.length; i++) {
          const span = document.createElement('span');
          span.className = 'effect';

          // Add space between words
          if (strText[i] === ' ') {
              span.innerHTML = '&nbsp;';
          } else {
              span.textContent = strText[i];
          }

          text.appendChild(span);
      }

      const spans = text.querySelectorAll('.effect');

      const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
              text.classList.add('visible');
              observer.disconnect();
              initiateAnimation(spans);
          }
      }, { rootMargin: "-10% 0%" }); // Adjust the rootMargin as needed

      observer.observe(text);

      function initiateAnimation(spans) {
          spans.forEach((span, index) => {
              span.addEventListener('animationend', () => {
                  span.classList.add('pull-up');
              });

              setTimeout(() => {
                  span.classList.add('pull-up');
              }, index * 60); // Adjust the delay as needed
          });
      }
  });
});

  
  
  document.addEventListener("DOMContentLoaded", function () {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    let openAccordion = null;

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const arrow = this.querySelector('.arrow');

            if (openAccordion && openAccordion !== accordionItem) {
                // Close the currently open accordion
                openAccordion.classList.remove('active');
                openAccordion.querySelector('.accordion-content').style.maxHeight = '0';
                openAccordion.querySelector('.arrow').classList.remove('clicked');
            }

            // Toggle active class for styling
            accordionItem.classList.toggle('active');

            // Toggle visibility of content
            accordionContent.style.maxHeight = accordionItem.classList.contains('active') ? accordionContent.scrollHeight + 'px' : '0';

            // Rotate the arrow with transition
            arrow.classList.toggle('clicked');

            // Update the open accordion
            openAccordion = accordionItem;
        });
    });
});


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
  var windowHeight = window.innerHeight;

  // Get the positions of your elements
  var firstElementPosition = document.getElementById("firstElement").getBoundingClientRect().top;
  var secondElementPosition = document.getElementById("secondElement").getBoundingClientRect().top;
  var thirdElementPosition = document.getElementById("thirdElement").getBoundingClientRect().top;

  // Define the thresholds for color changes based on element positions and viewport height
  var firstColorChangePosition = firstElementPosition - (windowHeight - 25); // Adjust as needed
  var secondColorChangePosition = secondElementPosition - (windowHeight -1300); // Adjust as needed
  var thirdColorChangePosition = thirdElementPosition - (windowHeight-3000); // Adjust as needed

  if (scrollPosition < firstColorChangePosition) {
    document.body.style.backgroundColor = "white";
  } else if (scrollPosition < secondColorChangePosition) {
    document.body.style.backgroundColor = "#DBDBCA";
  } else if (scrollPosition < thirdColorChangePosition) {
    document.body.style.backgroundColor = "#c8dec8";
  } else {
    document.body.style.backgroundColor = "#bfdbe8";
    
  }
}





function toggleMenu() {
  var navMenu = document.getElementById("navMenu");
  if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
  } else {
      navMenu.style.display = "block";
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
  }
}



document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();
  // Here you can add JavaScript to handle form submission like AJAX request to a backend server
  // For demonstration purpose, let's just log the form data
  const formData = new FormData(event.target);
  for (const entry of formData.entries()) {
    console.log(entry[0] + ": " + entry[1]);
  }
  alert("Form submitted! Check the console for the form data.");
});