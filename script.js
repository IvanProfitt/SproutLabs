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













'use strict';

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	},
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener('click', function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}
} else {
	document.body.classList.add('_pc');
}

// burger menu
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// scroll on click
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach((menuLink) => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (
			menuLink.dataset.goto &&
			document.querySelector(menuLink.dataset.goto)
		) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue =
				gotoBlock.getBoundingClientRect().top +
				pageYOffset -
				document.querySelector('.header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');

				// auto close sub-menu
				if (
					menuBody.dataset.sub_menu_auto_close &&
					document.body.classList.contains('_touch')
				) {
					let menuArrows = document.querySelectorAll('.menu__arrow');
					for (let index = 0; index < menuArrows.length; index++) {
						menuArrows[index].parentElement.classList.remove('_active');
					}
				}
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth',
			});
			e.preventDefault();
		}
	}
}
