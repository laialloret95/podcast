document.addEventListener('DOMContentLoaded', () => {

    console.log('IronGenerator JS imported successfully!');
  
  }, false);  

/* When the user clicks on the button of edit profile picture, 
toggle between hiding and showing the dropdown content */
function editImgDropDown() {
  document.getElementById("dropDown-btn").classList.toggle("show");
}