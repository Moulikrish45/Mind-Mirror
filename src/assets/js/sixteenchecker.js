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




var cur_grp =0
var cur_ind=0
var arr=[2,1,2,0,0]
const pers = [
    ["I","E"],
    ["S","N"],
    ["T","F"],
    ["P","J"],
    ["-T", "-A"]
]
const mulp = [-1,
    1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    1,
    -1,
    1,
    -1,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    1,
    1,
    1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    1,
    -1,
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    1,
    1,
    1,
    -1,
    1,
    1,
    1,
    1,
    -1,
    -1,
    1,
    -1,
    -1,
    -1,
    1,
    -1]

const index = [0
    ,1
    ,2
    ,3
    ,4
    ,0
    ,3
    ,2
    ,3
    ,4
    ,0
    ,1
    ,2
    ,3
    ,4
    ,0
    ,1
    ,2
    ,1
    ,4
    ,0
    ,1
    ,2
    ,3
    ,2
    ,0
    ,4
    ,2
    ,3
    ,1
    ,0
    ,1
    ,2
    ,3
    ,4
    ,0
    ,1
    ,2
    ,3
    ,4
    ,0
    ,1
    ,0
    ,3
    ,4
    ,1
    ,4
    ,2
    ,3
    ,4
    ,0
    ,1
    ,0
    ,2
    ,4
    ,3
    ,1
    ,2
    ,3
    ,4
    ]

const questions = [
"You regularly make new friends.",

"Complex and novel ideas excite you more than simple and straightforward ones.",

"You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",

"Your living and working spaces are clean and organized.",

"You usually stay calm, even under a lot of pressure.",

"You find the idea of networking or promoting yourself to strangers very daunting.",

"You prioritize and plan tasks effectively, often completing them well before the deadline.",

"People's stories and emotions speak louder to you than numbers or data.",

"You like to use organizing tools like schedules and lists.",

"Even a small mistake can cause you to doubt your overall abilities and knowledge.",

"You feel comfortable just walking up to someone you find interesting and striking up a conversation.",

"You are not too interested in discussions about various interpretations of creative works.",

"You prioritize facts over people's feelings when determining a course of action.",

"You often allow the day to unfold without any schedule at all.",

"You rarely worry about whether you make a good impression on people you meet.",

"You enjoy participating in team-based activities.",

"You enjoy experimenting with new and untested approaches.",

"You prioritize being sensitive over being completely honest.",

"You actively seek out new experiences and knowledge areas to explore.",

"You are prone to worrying that things will take a turn for the worse.",

"You enjoy solitary hobbies or activities more than group ones.",

"You cannot imagine yourself writing fictional stories for a living.",

"You favor efficiency in decisions, even if it means disregarding some emotional aspects.",

"You prefer to do your chores before allowing yourself to relax.",

"In disagreements, you prioritize proving your point over preserving the feelings of others.",

"You usually wait for others to introduce themselves first at social gatherings.",

"Your mood can change very quickly.",

"You are not easily swayed by emotional arguments.",

"You often end up doing things at the last possible moment.",

"You enjoy debating ethical dilemmas.",

"You usually prefer to be around others rather than on your own.",

"You become bored or lose interest when the discussion gets highly theoretical.",

"When facts and feelings conflict, you usually find yourself following your heart.",

"You find it challenging to maintain a consistent work or study schedule.",

"You rarely second-guess the choices that you have made.",

"Your friends would describe you as lively and outgoing.",

"You are drawn to various forms of creative expression, such as writing.",

"You usually base your choices on objective facts rather than emotional impressions.",

"You like to have a to-do list for each day.",

"You rarely feel insecure.",

"You avoid making phone calls.",

"You enjoy exploring unfamiliar ideas and viewpoints.",

"You can easily connect with people you have just met.",

"If your plans are interrupted, your top priority is to get back on track as soon as possible.",

"You are still bothered by mistakes that you made a long time ago.",

"You are not too interested in discussing theories on what the world could look like in the future.",

"Your emotions control you more than you control them.",

"When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",

"Your personal work style is closer to spontaneous bursts of energy than organized and consistent efforts.",

"When someone thinks highly of you, you wonder how long it will take them to feel disappointed in you.",

"You would love a job that requires you to work alone most of the time.",

"You believe that pondering abstract philosophical questions is a waste of time.",

"You feel more drawn to busy, bustling atmospheres than to quiet, intimate places.",

"If a decision feels right to you, you often act on it without needing further proof.",

"You often feel overwhelmed.",

"You complete things methodically without skipping over any steps.",

"You prefer tasks that require you to come up with creative solutions rather than follow concrete steps.",
       
"You are more likely to rely on emotional intuition than logical reasoning when making a choice.",

"You struggle with deadlines.",

"You feel confident that things will work out for you."

]

// for(let i=0;i<5;i++){
//     let p=0,n=0,t=0
//     for(let j=0;j<60;j++){
//         if(index[j] == i){
//             if(mulp[j]== -1,){
//                 n++
//             }
//             else{
//                 p++
//             }
//             t++
//         }
//     }
//     console.log(i,":","-1, : ",n," 1, : ",p," Total : ",t)
// }

for(let i=0;i<60;i++){
    console.log(i,": ",pers[index[i]][mulp[i]>0? 0 : 1])
}


const ques_containers= document.querySelectorAll("div.ques > h3")
const inputs = document.querySelectorAll("input[type=radio]")
console.log(ques_containers)

add_ques()


const form = document.getElementById("data-form");
console.log(form)
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const myFormData = new FormData(e.target);
    const formDataObj = Object.fromEntries(myFormData.entries());
    console.log(formDataObj);
    update_score(formDataObj);

    if (cur_grp >= 54) {
        let btn = document.getElementById("next");
        btn.textContent = "Submit";
    }
    if (cur_grp >= 60) {
        for (let i = 0; i < 5; i++) {
            console.log(i, ":", arr[i]);
        }
        let res = typeGen();
        console.log(res);
        updateResult(res);

        // Store the result in localStorage or pass via URL
        localStorage.setItem("personalityType", res);
        location.replace("results.html");  // Redirect to results page
    } else {
        add_ques();
    }

    // Reset inputs
    inputs.forEach((e) => {
        if (e.value == "0") {
            e.checked = true;
            return;
        }
        e.checked = false;
    });
});

function add_ques(){
    ques_containers.forEach((e) => {
        e.textContent = questions[cur_grp+cur_ind]
        cur_ind++ 
    })  
    cur_ind=0
    cur_grp+=6  
}

function update_score(formDataObj){
    for(let i=0;i<6;i++){
        let ind = cur_grp+i
        let ans = formDataObj[("answer"+(i+1))] - '0'
        arr[index[ind]] += (ans)*mulp[ind] 
    }
    console.log(cur_grp)
    console.log(arr)
}

function typeGen(){
    let res=""
    for(let i=0;i<5;i++){
        res= res+pers[i][(arr[i]>=0)?0:1]
    }
    return res
}



async function  updateResult(result)
{
    try {
        
            var storedObject = localStorage.getItem("myObject");
            var obj = JSON.parse(storedObject);
            let id = obj.id;
            console.log(id);
            await updateUserResultInFirestore(id,result);
            console.log("success!");
        
        
      } catch (error) {
        console.error("Error updating user result:", error);

      }
   }


async function updateUserResultInFirestore(userId, newResult) {
    try {
        const usersRef = db.collection("users");
       
        const userDocRef = usersRef.doc(userId);

        
        await userDocRef.update({ result: newResult });

        localStorage.removeItem('myObject')

        console.log("User result updated successfully.");
    } catch (error) {
        console.error("Error updating user result in Firestore:", error);
        throw error;
    }
  }

