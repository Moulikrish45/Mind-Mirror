


const firebaseConfig = {
    apiKey: "AIzaSyAOWJ0x8p0BQ5P24yiHJJGPu6FEckgHRaI",
    authDomain: "personality16-c7a11.firebaseapp.com",
    projectId: "personality16-c7a11",
    storageBucket: "personality16-c7a11.appspot.com",
    messagingSenderId: "25223366012",
    appId: "1:25223366012:web:0cd5f6ef0490ea2b61d0f9",
    measurementId: "G-QESLT974TN"
  };

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

  
document.getElementById('excel').addEventListener('click', () => {
    getAllUsersFromFirestore();
});
document.getElementById('logout').addEventListener('click', () => {
  logout();
});

const progressIndicator = document.getElementById('progressIndicator');


  
async function getAllUsersFromFirestore() {
 
  progressIndicator.style.display = 'block';

  try {
   
      const usersRef = db.collection("users");
      const querySnapshot = await usersRef.get();

     
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet([]);

      const fieldOrder = ['name', 'reg_no','email','department','year','result'];

 
      querySnapshot.forEach((doc) => {
          const userData = doc.data();

          
          const rearrangedUserData = {};
          fieldOrder.forEach(field => {
              rearrangedUserData[field] = userData[field] || ''; 
          });

         
          XLSX.utils.sheet_add_json(worksheet, [rearrangedUserData], { skipHeader: true, origin: -1 });
      });

 
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

      XLSX.writeFile(workbook, 'users.xlsx');

      progressIndicator.style.display = 'none';
  } catch (error) {
   
      progressIndicator.style.display = 'none'; 
      
      showSnackbar(error);
      console.log("Error getting documents: ", error);
  }
}

function logout() {
 
  window.close();
}




  
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent=message;
  snackbar.className = "show";
  setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}
  
  
