

const passwordInput = document.querySelector(".pass-field input");
console.log(passwordInput);
console.log(passwordInput.type);
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");

const requirements = [
    {regex: /.{8,}/, index: 0}, //minimum of 8 characters
    {regex: /[0-9]/, index: 1}, // At least one number
    {regex: /[a-z]/, index: 2}, // At least one lowercase letter
    {regex: /[^A-Za-z0-9]/, index: 3}, // At least one special character
    {regex: /[A-Z]/, index: 4}, // At least one uppercase letter
]

passwordInput.addEventListener("keyup",(e)=>{
    requirements.forEach(item =>{
        //check if the password matches the requirement regex
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];

        //updating class and icon of requirement item if requirement matched or not 

        if (isValid){
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className ="fa-solid fa-check";
        }
        else{
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className ="fa-solid fa-circle";
        }
    });
});



// eyeIcon.addEventListener("click",() =>{
//     // toggle the password input type between "password" and "text"

//     passwordInput.type = passwordInput.type === "text" ? "password": "text";

//     // quote the eye class based on the password input type 
//     eyeIcon.className =`fa-solid fa-eye${passwordInput.type === "password" ? "": "-slash"}`;  
// });

eyeIcon.addEventListener("click",() =>{
    if (passwordInput.type === "password"){
        passwordInput.type ="text";
        eyeIcon.className = "fa-solid fa-eye";
    }
    else{
        passwordInput.type ="password";
        eyeIcon.className = "fa-solid fa-eye-slash"
    }

})