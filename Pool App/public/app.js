const auth = firebase.auth()
const firebaseDb = firebase.database()
var decheck = 0;
function check() {
    decheck = 1;
}
function signUp() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pwd').value;

    console.log(email, name, pass)

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        swal({
            title: "Warning!",
            text: "Please enter you email address. example@gmail.com",
            icon: "warning",
        });
    }
    if (name === '' || name === " ") {
        swal({
            title: "Warning!",
            text: "Please enter you name.",
            icon: "warning",
        });
    }
    else if (pass.length < 6) {
        swal({
            title: "Warning!",
            text: "Please enter atleast 6 number",
            icon: "warning",
        });
    } else {
        auth.createUserWithEmailAndPassword(email, pass)
            .then((data) => {
                var uid = data.user.uid;
                var objData = {
                    email: email,
                    name: name
                }
                firebaseDb.ref("users/" + uid + '/').set(objData)
                    .then(() => {
                        swal({
                            title: "Success!",
                            text: "congratulations",
                            icon: "success",
                        });

                    })
                window.location = "index.html"
            })
            .catch((error) => {
                // Handle Errors here.
                swal({
                    title: "Warning!",
                    text: error.message,
                    icon: "warning",
                });
                // ...
            });
    }

}

// signup function


// login function

function logIn() {
    var email = document.getElementById('userEmail').value;
    var password = document.getElementById('userPwd').value;

    console.log(email)
    auth.signInWithEmailAndPassword(email, password)
        .then(function (result) {
            document.getElementById('error').style.display = 'none'
            console.log(result.uid)

            // window.location = "";
            document.getElementById("signbtn").style.display = "none";
            document.getElementById("logbtn").style.display = "none";
            document.getElementById("head1").style.display = "none";
            document.getElementById("outbtn").style.display = "inline";
            document.getElementById("botarea").style.display = "inline";



        })
        .catch((error) => {
            // Handle Errors here.
            document.getElementById('error').innerText = error.message
            // ...
        });
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = user.uid;
        //   console.log(uid)

    } else {
        // User is signed out.
        // ...
    }
});
function signout() {
    firebase.auth().signOut().then(function () {
        window.location = "index.html"
        window.location = "../index.html"
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    })
}
function topool() {
    if (decheck === 0) {
        location = "./Pool.html";
    }
    else if (decheck === 1) {
        location = "./pages/Pool.html";
    }

}
function tolist() {
    if (decheck === 0) {
        location = "./poolinglist.html";
    }
    else if (decheck === 1) {
        location = "./pages/poolinglist.html";
    }
}
function watch() {
    document.getElementById("outbtn").style.display = "inline";
    decheck = 0;
}
function sub() {
    let pol = document.getElementById("pname").value;
    let que = document.getElementById("question").value;
    let op1 = document.getElementById("op1").value;
    let op2 = document.getElementById("op2").value;
    let op3 = document.getElementById("op3").value;
    let op4 = document.getElementById("op4").value;

    let pooling = {
        poolName: pol,
        question: que,
        optn1: op1,
        optn2: op2,
        optn3: op3,
        optn4: op4
    };
    firebaseDb.ref("pool/").push(pooling)

    location = "./Pool.html";
}
function pool() {
    decheck = 0;
    let poolis = [];
    document.getElementById("outbtn").style.display = "inline";
    document.getElementById("listview").style.display = "none";
    let ul = document.getElementById("poolList");

    firebaseDb.ref("pool/").once("value", (pooli) => {
        let pol = pooli.val();
        console.log(pol);
        for (var key in pol) {
            pol[key].uid = key;
            poolis.push(pol[key]);

        }
        poolis.map((v, i) => {
            console.log(v.poolName);
            let li = document.createElement("li");
            li.setAttribute("class", 'list-group-item');
            let btn = document.createElement("span");
            //btn.setAttribute("onClick", "gete();")
            btn.setAttribute("class", 'badge');
            btn.setAttribute("class", 'glyphicon glyphicon-menu-down')
            let polTxt = document.createTextNode(v.poolName);
            // let plus = '+';
            // btn.appendChild(plus);
            li.appendChild(polTxt);
            li.appendChild(btn);
            ul.appendChild(li);
            console.log(v.question);

            btn.addEventListener("click", (uid) => {
                document.getElementById("listview").style.display = "inline";
                document.getElementById("pollg").setAttribute("style", "display: none;");
                document.getElementById("polgot").setAttribute("style", "display: inline;");
                let pollName = document.getElementById("poolNam");
                let questi = document.getElementById("Pollque");
                let polt = document.createTextNode(v.poolName);
                let polq = document.createTextNode(v.question);
                pollName.appendChild(polt);
                questi.appendChild(polq);
                let option1 = document.getElementById("option1");
                let otnt1 = document.createTextNode(v.optn1);
                option1.appendChild(otnt1);
                let option2 = document.getElementById("option2");
                let otnt2 = document.createTextNode(v.optn2);
                option2.appendChild(otnt2);
                let option3 = document.getElementById("option3");
                let otnt3 = document.createTextNode(v.optn3);
                option3.appendChild(otnt3);
                let option4 = document.getElementById("option4");
                let otnt4 = document.createTextNode(v.optn4);
                option4.appendChild(otnt4);
                //  firebaseDb.ref("pool/,).once
                let ab = [];
                let ac = [];
                // let current = firebase.auth().currentUser.uid;
                // firebaseDb.ref("voted/" + v.poolName + '/').once("value", (te) => {
                //     let ae = te.val();
                //     ac.push(ae);
                //     console.log(ac.length);
                // })
                option1.addEventListener("click", (uid) => {
                    let current = firebase.auth().currentUser.uid;
                    firebaseDb.ref("voted/" + v.poolName + '/' + v.optn1 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn2 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn3 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn4 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        for (var i = 0; i < ab.length; i++) {
                            console.log(ab[i])
                            if (ab[i] === current) {
                                console.log(ab[i])
                                alert("you should not able to vote again");
                                
                            }
                            else {

                                firebaseDb.ref("voted/" + v.poolName + '/' + v.optn1 + '/').push(current);
                                location = 'poolinglist.html';
                            }
                        }
                    // }
                })
                option2.addEventListener("click", (uid) => {
                    let current = firebase.auth().currentUser.uid;
                    // firebaseDb.ref("voted/" + v.poolName + '/').once("value", (te) => {
                    //     let ae = te.val();
                    //     ac.push(ae);
                    // })
                    // if (ac.length === 0) {
                    //     firebaseDb.ref("voted/" + v.poolName + '/' + v.optn2 + '/').push(current);
                    //     location = 'poolinglist.html';

                    // }
                    // else {
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn1 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn2 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn3 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn4 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        for (var i = 0; i < ab.length; i++) {
                            if (current === ab[i]) {
                                alert("you should not able to vote again");

                            }
                            else {
                                firebaseDb.ref("voted/" + v.poolName + '/' + v.optn2 + '/').push(current);
                                location = 'poolinglist.html';
                            }
                        }
                    
                })
                option3.addEventListener("click", (uid) => {
                    let current = firebase.auth().currentUser.uid;
                    // firebaseDb.ref("voted/" + v.poolName + '/').once("value", (te) => {
                    //     let ae = te.val();
                    //     ac.push(ae);
                    // })
                    // if (ac.length === 0) {
                    //     firebaseDb.ref("voted/" + v.poolName + '/' + v.optn3 + '/').push(current);
                    //     location = 'poolinglist.html';

                    // }
                    // else {
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn1 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn2 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn3 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn4 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        for (var i = 0; i < ab.length; i++) {
                            if (current === ab[i]) {
                                alert("you should not able to vote again");
                            }
                            else {
                                firebaseDb.ref("voted/" + v.poolName + '/' + v.optn3 + '/').push(current);
                                location = 'poolinglist.html';
                            }
                        }
                    
                })
                option4.addEventListener("click", (uid) => {
                    let current = firebase.auth().currentUser.uid;
                    // firebaseDb.ref("voted/" + v.poolName + '/').once("value", (te) => {
                    //     let ae = te.val();
                    //     ac.push(ae);
                    // })
                    // if (ac.length === 0) {
                    //     firebaseDb.ref("voted/" + v.poolName + '/' + v.optn4 + '/').push(current);
                    //     location = 'poolinglist.html';

                    // }
                    // else {
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn1 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn2 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn3 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        firebaseDb.ref("voted/" + v.poolName + '/' + v.optn4 + '/').once("value", (qw) => {
                            let ch = qw.val();
                            for (var key in ch) {
                                ch[key].uid = key;
                                ab.push(ch[key]);
                            }

                        })
                        for (var i = 0; i < ab.length; i++) {
                            if (current === ab[i]) {
                                alert("you should not able to vote again");
                            }
                            else {
                                firebaseDb.ref("voted/" + v.poolName + '/' + v.optn4 + '/').push(current);
                                location = 'poolinglist.html';
                            }
                        }

                    // }
                })
                let opn1 = document.getElementById("opn1");
                let opn2 = document.getElementById("opn2");
                let opn3 = document.getElementById("opn3");
                let opn4 = document.getElementById("opn4");
                let len1 = [];
                let len2 = [];
                let len3 = [];
                let len4 = [];
                firebaseDb.ref("voted/"+v.poolName+'/'+v.optn1+'/').once("value",(sh)=>{
                    let r = sh.val();
                    for(var key in r){
                        r[key].uid = key;
                        len1.push(r[key]);
                    }
                    let op1 = document.createTextNode(len1.length);
                    opn1.appendChild(op1);
                })
                firebaseDb.ref("voted/"+v.poolName+'/'+v.optn2+'/').once("value",(sh)=>{
                    let r = sh.val();
                    for(var key in r){
                        r[key].uid = key;
                        len2.push(r[key]);
                    }
                    let op2 = document.createTextNode(len2.length);
                    opn2.appendChild(op2);

                })
                firebaseDb.ref("voted/"+v.poolName+'/'+v.optn3+'/').once("value",(sh)=>{
                    let r = sh.val();
                    for(var key in r){
                        r[key].uid = key;
                        len3.push(r[key]);
                    }
                    let op3 = document.createTextNode(len3.length);
                    opn3.appendChild(op3);
                })
                firebaseDb.ref("voted/"+v.poolName+'/'+v.optn4+'/').once("value",(sh)=>{
                    let r = sh.val();
                    for(var key in r){
                        r[key].uid = key;
                        len4.push(r[key]);
                    }
                    
                let op4 = document.createTextNode(len4.length);
                opn4.appendChild(op4);
                })



                // firebaseDb.ref("vote/").once("value",(voter)=>{
                //     let vr = [];
                //     vr.push(voter.val())
                //     console.log(vr);
                // })
            })
        })


    })
}