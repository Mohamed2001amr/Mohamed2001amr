let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    
    //check for active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        
            //add active class on element with data-color === local storage item
     if (element.dataset.color === mainColors) {
         
         //add active class
         element.classList.add("active");
     }
        
    });   
}

//////////////////////////////////////////////////////////////////////////////////

//random background option
let backgroundOption = true;

//variable to control the interval
let backgroundInterval;

//check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
    
    if (backgroundLocalItem === 'true') {
        
        backgroundOption = true;
    } else {
     
     backgroundOption = false;
     
    }
    
    //remove class active from all spans
    document.querySelectorAll(".random-background span").forEach(element => {
     
     element.classList.remove("active");
     });
    
    if (backgroundLocalItem === 'true') {
     
        document.querySelector(".random-background .yes").classList.add("active");
        
    } else {
     
     document.querySelector(".random-background .no").classList.add("active");
     
    }
}

// toggle spin on icon
document.querySelector(".toggle-setting img").onclick = function() {
    
    //toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");
    
    //toggle class open on main setting box
    document.querySelector(".setting-box").classList.toggle("open");
};

//switch color
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
    
    //click on every list item
    li.addEventListener("click", (e) => {
        
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        
        //set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);
        
        handleActive(e);
    });
    
 });

//////////////////////////////////////////////////////////////////////////////////

//switch random background option
const randomBackground = document.querySelectorAll(".random-background span");

//loop on all span
randomBackground.forEach(span => {
    
    //click on every span
    span.addEventListener("click", (e) => {
        
        //remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            
            element.classList.remove("active");
            
        });
        
        //add active class on self
        e.target.classList.add("active");
        
        if (e.target.dataset.background === 'yes') {
            
            backgroundOption = true;
            randomImage();
            
            localStorage.setItem("background-option", true);
            
        }else {
         
         backgroundOption = false;
         clearInterval(backgroundInterval);
         
         localStorage.setItem("background-option", false);
         
        }
        
    });
    
 });

//////////////////////////////////////////////////////////////////////////////////

// select landing page element
let landingpage = document.querySelector(".landing-page");

// get array of  imag
let imgArray = ["1.jpg","2.jpg","3.jpg","4.jpg"];

//function to randomize image
function randomImage() {
  
  if (backgroundOption === true) {
       
   backgroundInterval = setInterval(() => {
       //get random nuber
       let randomNumber = Math.floor(Math.random() * imgArray.length);
   
       // change background image url
       landingpage.style.backgroundImage = 'url("photo/' + imgArray[randomNumber] + '")';  
   
   }, 1000); 
 }
 
}

randomImage();

//////////////////////////////////////////////////////////////////////////////////

//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
 
 //skills offset top
 let skillsOffsetTop = ourSkills.offsetTop;
 
 //skills outer height
 let skillsOuterHeight = ourSkills.offsetHeight;
 
 //window height
 let windowHeight = this.innerHeight;
 
 //window scrollTop
 let windowScrollTop = this.pageYOffset;
 
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
     
     let allSkills = document.querySelectorAll(" .skill-progress span");
     
     allSkills.forEach(skill => {
      
       skill.style.width = skill.dataset.progress;
      
      }); 
  }
 
};

//////////////////////////////////////////////////////////////////////////////////

//create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
 
  img.addEventListener('click', (e) => {
   
   //create overlay element
   let overlay = document.createElement("div");
   
   //add class to overlay
   overlay.className = 'popup-overlay';
   
   //append overlay to the body
   document.body.appendChild(overlay);
   
   //create the popup box
   let popupBox = document.createElement("div");
   
   //add class to the popup Box
   popupBox.className = "popup-box";
   
   if (img.alt !== null) {
    
    //create heading
    let imgHeading = document.createElement("h3");
    
    //create text for heading
    let imgText = document.createTextNode(img.alt);
    
    //append the text to the heading
    imgHeading.appendChild(imgText);
    
    //append the heading to the popup Box
    popupBox.appendChild(imgHeading);
    
   }
   
   //create the image
   let popupImage = document.createElement("img");
   
   //set image source
   popupImage.src = img.src;
   
   //add image to popup Box
   popupBox.appendChild(popupImage);
   
   //append the popup box to the body
   document.body.appendChild(popupBox);
   
   //create the close span
   let closeButton = document.createElement("span");
   
   //create the close button text
   let closeButtonText = document.createTextNode("X");
   
   //append text to close button
   closeButton.appendChild(closeButtonText);
   
   //add class to close button
   closeButton.className = 'close-button';
   
   //add close button to the popup Box
   popupBox.appendChild(closeButton);
 
  });

});

// close popup
document.addEventListener("click", function (e) {
 
 if (e.target.className == 'close-button') {
    
    //remove the current popup
    e.target.parentNode.remove();
    
    document.querySelector(".popup-overlay").remove();
    
 }
 
 });

//////////////////////////////////////////////////////////////////////////////////

//select all links
const allbullets = document.querySelectorAll(".nav-bullets .bullet");

allbullets.forEach(bullet => {
 
 bullet.addEventListener("click", (e) => {
  
  document.querySelector(e.target.dataset.section).scrollIntoView({

    behavior: 'smooth'
   
   });
  
  });
 
 });

//////////////////////////////////////////////////////////////////////////////////

// handle active state
function handleActive(ev) {
    
    //Remove Active Class From All Childerns
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
     
     element.classList.remove("active");
     
     });
    
    //Add Active Class On Self
     ev.target.classList.add("active");
}

//////////////////////////////////////////////////////////////////////////////////

//Reset Button
document.querySelector(".reset-options").onclick = function() {
 
 localStorage.removeItem("color-option");
 localStorage.removeItem("background-option");
 localStorage.removeItem("bullets-option");
 
 window.location.reload();
 
}

//////////////////////////////////////////////////////////////////////////////////

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e){
 
 // Stop Propagation
 e.stopPropagation();
 
 //toggle class "menu-active" on button
 this.classList.toggle("menu-active");
 
 //toggle class "open" on links
 tLinks.classList.toggle("open");

};

// Click Anywhere OutSide Menu And Toggle Button
document.addEventListener("click", (e) => {
 
 if (e.target !== toggleBtn && e.target !== tLinks) {
    
   //Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
             
       //toggle class "menu-active" on button
       toggleBtn.classList.toggle("menu-active");
       
       //toggle class "open" on links
       tLinks.classList.toggle("open");
       
    }
 }
 
 });

//stop propagation on menu
tLinks.onclick = function (e){
 e.stopPropagation();
}

//////////////////////////////////////////////////////////////////////////////////

