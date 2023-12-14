const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// ==========================WRAPPER for Achievement SEction========================

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);







// =========================others=============================


const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close")

    //   ------------------show menu-------------------
    // validate if constant exists
    if(navToggle){
        navToggle.addEventListener('click',() => {
            navMenu.classList.add("show-menu")
        })
    }

    // ------------------------Menu hidden ---------------------
    // validate if constant exists
    if(navClose){
        navClose.addEventListener('click',() => {
            navMenu.classList.remove("show-menu")
        })
    }

    // ======================Remove Menu Mobile==================
    const navLinks = document.querySelectorAll('.nav-link')

    function linkAction(){
        const navMenu = document.getElementById("nav-menu")
        // when we click on each nav linkAction, we remove the show menu class
        navMenu.classList.remove("show-menu")
    }
    navLinks.forEach(n => n.addEventListener('click', linkAction) )


    // ========================Change Background Header=======================
    function scrollHeader(){
        const header = document.getElementById("header")
        // when the scroll is greater than 80 viewport height, add the class scroll header to the tag header
        if(this.scrollY >= 80)
         header.classList.add("scroll-header");
         else-header.classList.remove("scroll-header")
    }
    window.addEventListener("scroll", scrollHeader)




// -----------------Swipper for testimonial or Referal-----------------
var swiper = new Swiper(".testimonial-wrapper",{
    loop: "true",
    pagination:{
        el: ".swiper-pagination",
        clickable:true,
    },
});


// ==========================Scroll section Active link=========================
// get all sections that have an id defined
const sections = document.querySelectorAll("section[id]");

// add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter(){
    //get current scroll position
    let scrollY = window.pageYOffset;
    //how we loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute("id");
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add("active-link");
        }
        else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove("active-link"); 
        }
    })
}

// -------------------_______________............_______________--------------------
//===============---...........-Project Item FILTER-........---==================
const filterContainer = document.querySelector(".project-filter-inner"),
      filterBtns = filterContainer.children,
      totalFilterBtn =   filterBtns.length,
      projectItems = document.querySelectorAll(".project-item"),
      totalProjectItem = projectItems.length;
    //   console.log(totalProjectItem);

      for(let i=0; i<totalFilterBtn; i++){
        filterBtns[i].addEventListener('click', function(){
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add('active');

            const filterValue = this.getAttribute("data-filter");
            // console.log(filterValue)
            for(let k=0; k<totalProjectItem; k++){
               if(filterValue === projectItems[k].getAttribute("data-category")) {
                projectItems[k].classList.remove("hide");
                projectItems[k].classList.add("show");
               }
               else{
                projectItems[k].classList.add("hide");
                projectItems[k].classList.remove("show");
               }
               if(filterValue === "all"){
                projectItems[k].classList.remove("hide");
                projectItems[k].classList.add("show");
               }
            }
        })
      }




//--------------------...................____________________....................--------------------
//=========================Theme/Display Customize============================
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll('.choose-size span');
const colorPalette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");


// open Modal
const openThemeModal = () =>{
    themeModal.style.display = 'grid';
}
//close modal
const closeThemeModal = (e) =>{
    if(e.target.classList.contains('customize-theme')){
       themeModal.style.display = 'none';
    }
}

theme.addEventListener("click", openThemeModal);
themeModal.addEventListener("click", closeThemeModal);


// ========================---FONTS---==================================
//remove active class from spans or font size selectors
const removeSizeSelector = () =>{
    fontSizes.forEach(size => {
        size.classList.remove('active')
    })
}

fontSizes.forEach(size =>{
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active')
        if(size.classList.contains('font-size-1')){
            fontSize = '12px';
        }
        else if(size.classList.contains('font-size-2')){
            fontSize = '14px';
        }
        else if(size.classList.contains('font-size-3')){
            fontSize = '16px';
        }
        else if(size.classList.contains('font-size-4')){
            fontSize = '18px';
        }
        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;

    })
})

//====================Primary Colors========================

//remove active class from colors if other is selected
const changeActiveColorClass = () =>{
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        }
        else if(color.classList.contains('color-2')){
            primaryHue = 52;
        }
        else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }
        else if(color.classList.contains('color-4')){
            primaryHue = 152;
        }
        else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }
        color.classList.add("active");
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

// =======================-----Theme BACKGROUND------=====================
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// --------change background color---------
const changeBg = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);   
}

Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    // remove customized from local storage
    window.location.reload();
})

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBg();
})

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from others
    Bg2.classList.remove('active');
    Bg1.classList.remove('active');
    changeBg();
})



// auto type
var typed = new Typed('.auto-type', {
    strings: ['<i>WEB</i> developer' , 'Software Engineer'],
    typeSpeed: 100,
    backSpeed:100,
    backDelay:700,
    loop:true
  });



  //Send form data to email
   const form = document.querySelector('form')
   const email = document.getElementById('email');
   const subject = document.getElementById('sub');
   const description = document.getElementById('text');
   
  function sendEmail(){
     const bodyMessage = `Email: ${email.value} <br> Subject: ${subject.value} <br>
     description:${description.value}`;
    
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "cvam.personal@gmail.com",
        Password : "C70268D7411E541B4D0C82D99A488091A027",
        To : 'cvam.personal@gmail.com',
        From : "cvam.personal@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if(message == 'OK'){
            Swal.fire(
                'Success!',
                'Message sent successfully !',
                'success'
              )
        }
      }
    );
    
  }
  form.addEventListener("submit",(e) => {
    e.preventDefault();
    sendEmail();
  })