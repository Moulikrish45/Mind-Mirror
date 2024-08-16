import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc,collection} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAOWJ0x8p0BQ5P24yiHJJGPu6FEckgHRaI",
    authDomain: "personality16-c7a11.firebaseapp.com",
    projectId: "personality16-c7a11",
    storageBucket: "personality16-c7a11.appspot.com",
    messagingSenderId: "25223366012",
    appId: "1:25223366012:web:0cd5f6ef0490ea2b61d0f9",
    measurementId: "G-QESLT974TN"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db =getFirestore(app)


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
var obj = {
  id: "",
};
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
const progressIndicator = document.getElementById('progressIndicator');

 // Signed in
document.getElementById('Signup').addEventListener('click',async (e) => {
  e.preventDefault();
  const name = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const department = document.getElementById('department').value;
  const year = document.getElementById('year').value;
  const reg_no = document.getElementById('reg').value;
  
  progressIndicator.style.display = 'block';
  console.log(email,password)
  if (name!="" && email !="" && password!="" && department!="" && year!="")
  {
     
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addUserToFirestore(userCredential.user.uid,name,email,department,year,reg_no);
      
    obj.id=userCredential.user.uid;
     localStorage.setItem("myObject", JSON.stringify(obj));
      console.log("stored",obj.id);
      window.open("./pers_quiz.html", "_blank");
     console.log("added")
    } catch (error) {
      showSnackbar(error)
      console.error('Error signing up:', error.message);
    }
    finally {
      progressIndicator.style.display = 'none'; 
    }
  }
  else{
    showSnackbar("please enter all details");
    progressIndicator.style.display = 'none'; 
  }
});

async function addUserToFirestore(userId, name, email, department, year, registernumber) {
  try {
    const userRef = doc(db, "users",userId); 
    await setDoc(userRef, { 
      name: name,
      reg_no:registernumber,
      email: email,
      department: department,
      year: year,
      result:"nothing",
    });
    console.log("User data added to Firestore");
  } catch (error) {
    console.error("Error adding user data to Firestore:", error);
    throw error;
  }
}



document.getElementById('loginbtn').addEventListener('click',async(e)=>{
  const email = document.getElementById('lemail').value;
  const password = document.getElementById('lpassword').value;
  console.log(email,password)
  progressIndicator.style.display = 'block';
  if (email!="" && password!=""){
    try {
      var admin="";
      const userCredential = await signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        admin=user.uid; 
        obj.id=userCredential.user.uid;   
        localStorage.setItem("myObject", JSON.stringify(obj));
      console.log("stored",obj.id);
      });
      if(admin =="Qm0dAoW1QvV3NksM6ixyTJPxPeH3")
      {
        window.open("./admin.html", "_blank");
      }
      else{
        window.open("./pers_quiz.html", "_blank");
      }
      
    } catch (error) {
      console.error('Error signing up:', error.message);
      showSnackbar("Login failed");
    }finally{
      progressIndicator.style.display='none'
    }

  }else{
    showSnackbar("please fill all details");
    progressIndicator.style.display='none'
  }
});

document.getElementById('forget').onclick = ()=>{
  let email = prompt("enter your email address here");
  if(email!="" && email!==null){
    forgotPassword();
    function forgotPassword() {
      sendPasswordResetEmail(auth,email)
        .then(function() {
          showSnackbar("request sent to your email address");
        })
        .catch(function(error) {
         
          console.error(error.message);
          showSnackbar(error.message);
        });
    }
    
  }else if(email===null){
          showSnackbar("I hope you don't forget the password.🤞")
  }
  else{
    showSnackbar("make sure ur email is not empty")
  }
  
}
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent=message;
  snackbar.className = "show";
  setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}