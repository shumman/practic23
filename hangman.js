console.log('hhhhhdddddeedeseseeello')
function register(){
    document.getElementById('Submit').innerText="Create Username"
    document.getElementById('register').innerText='Back To Login';
    document.getElementById('Submit').onclick=function(){
        let x=document.getElementById('Username').value
        if(!(x in localStorage)){
            let y=JSON.stringify([0,0,0])
            localStorage.setItem(x,y)
            document.getElementById('alert').innerHTML='User Successfully Created'
            document.getElementById('alert').style.color='green'
        }
        else{
            document.getElementById('alert').innerHTML='Username is already taken'
            document.getElementById('alert').style.color='red'
        }

    }
    document.getElementById('register').onclick=function(){
        document.getElementById('alert').innerHTML=''
        document.getElementById('Username').value=''
        document.getElementById('Submit').innerText="Log In"
        document.getElementById('register').innerText='Not registered??';
        document.getElementById('register').onclick=function(){
            register();
        };
        document.getElementById('Submit').onclick=function(){
          return login();
        }
    };
};
let user;
let count=0;
let wordlist;
let usedletters=[]
function check(ev){
    let x=document.getElementById('input').value;
    if(ev.key=='Enter'){
        document.getElementById('input').value='';
        if(usedletters.includes(x.toUpperCase())){
            document.getElementById('alreadyused').style.display='block'
            document.getElementById('alreadyused').innerText='You already used this letter'
        }
        else{
            if(wordlist.includes(x)){
                usedletters.push(x.toUpperCase())
                document.getElementById('alreadyused').style.display='none';
                document.getElementById('usedwords').style.display='inline';
                document.getElementsByClassName('word')[1].innerText=usedletters;
                let length=wordlist.length
                for(let i=0;i<length;i++){
                    if(wordlist[i]==x){
                        split(i,x.toUpperCase())
                    }
                }
            }
            else{
                if(x!=''){
                    usedletters.push(x.toUpperCase())
                    document.getElementById('alreadyused').style.display='none';
                    document.getElementById('usedwords').style.display='inline';
                    document.getElementsByClassName('word')[1].innerText=usedletters;
                    count+=1;
                    let z=document.getElementsByTagName('canvas')[0];
                    let u=z.getContext("2d");
                    if(count==1){
                        u.beginPath();
                        u.lineWidth=12;
                        u.arc(208.5, 114, 20, 0, 2 * Math.PI);
                        u.stroke();
                    }
                    else if(count==2){
                        u.beginPath()
                        u.lineWidth=12
                        u.moveTo(208.5,128)
                        u.lineTo(208.5,245)
                        u.stroke()
                    }
                    else if(count==3){
                        u.lineWidth=12
                        u.moveTo(140,210)
                        u.lineTo(208.5,160)
                        u.stroke()
                    }
                    else if(count==4){
                        u.lineWidth=12
                        u.moveTo(277,210)
                        u.lineTo(208.5,160)
                        u.stroke()
                    }
                    else if(count==5){
                        u.lineWidth=12
                        u.moveTo(208.5,238)
                        u.lineTo(140,290)
                        u.stroke()
                    }
                    else if(count==6){
                        u.lineWidth=12
                        u.moveTo(208.5,238)
                        u.lineTo(275,290)
                        u.stroke()
                    }
                }
            }
        }
    }
}
let z=document.getElementsByTagName('canvas')[0];
let u=z.getContext("2d");
u.beginPath()
u.lineWidth=17
u.moveTo(200,50)
u.lineTo(500,50)
u.lineTo(500,400)
u.lineTo(460,400)
u.lineTo(540,400)
u.moveTo(208.5,50)
u.lineTo(208.5,100)
u.stroke()

fetch('https://random-word-api.herokuapp.com/all').then(function(x){
    console.log(Date())
    return x.json()
}).then(function(y){
    display(y);
}).catch(()=>console.log('Couldnt Get Data'))
let chosenword;
let storedword;
function display(word){
    storedword=word;
    let randomword=word[(Math.round((Math.random()* word.length)+1))]
    console.log(randomword)
    chosenword=randomword
    let length=randomword.length
    let z='_';
    for(let i=0;i<length;i++){
        if(i==0){
            continue
        }
        else{
            z+=' _'
        }
    }
    wordlist=randomword.split('')
    document.getElementsByClassName('word')[0].innerText=z
    console.log(Date())
}

function split(index,x){
    let q=document.getElementsByClassName('word')[0].innerText
    q=q.split(' ')
    q[index]=x
    let r=q[0];
    let length=q.length;
    for(let i=1;i<length;i++){
        r+=` ${q[i]}`
    }
    document.getElementsByClassName('word')[0].innerText=r
}

function key(event){
    if(event.key=='Enter'){
        document.getElementById('Submit').click()
    }
}
function login(){
    let x=document.getElementById('Username').value
    if(x in localStorage){
        user=[x]
        document.getElementById('alert').innerHTML='Successfully Logged in';
        setTimeout(function(){
            document.getElementById('loginC').style.display='none';
            document.getElementsByTagName('canvas')[0].style.display='inline-block';
            document.getElementById('inside').style.display='block';
            let id=setInterval(function(){
                let userlength=localStorage.length
                let loggeduser=user[0]
                if(count==6){
                    let useritem=JSON.parse(localStorage.getItem(loggeduser));
                    document.getElementsByTagName('canvas')[0].style.display='none';
                    document.getElementById('inside').style.display='none';
                    document.getElementById('wonorlost').style.display='flex'
                    document.getElementById('chosen').innerText=`The word was: ${chosenword}`
                    document.getElementById('header').innerText=`Sorry ${loggeduser} You Lost this Round :(`
                    document.getElementById('wins').innerText=`Total Wins: ${useritem[0]}`;
                    document.getElementById('losses').innerText=`Total Losses: ${useritem[1]+1}`;
                    document.getElementById('totalgames').innerText=`Total Games Played: ${useritem[2]+1}`;
                    let y=JSON.stringify([useritem[0],useritem[1]+1,useritem[2]+1])
                    localStorage.setItem(loggeduser,y)
                    clearInterval(id)
                }
                else{
                    let q=document.getElementsByClassName('word')[0].innerText
                    q=q.split(' ')
                    if(!(q.includes('_') ||q.includes(''))){
                        let useritem=JSON.parse(localStorage.getItem(loggeduser));
                        document.getElementsByTagName('canvas')[0].style.display='none';
                        document.getElementById('inside').style.display='none';
                        document.getElementById('wonorlost').style.display='flex'
                        document.getElementById('header').innerText=`CONGRATULATIONS ${loggeduser} You WON this Round!!!`
                        document.getElementById('chosen').innerText=`The word was: ${chosenword}`
                        document.getElementById('wins').innerText=`Total Wins: ${useritem[0]+1}`;
                        document.getElementById('losses').innerText=`Total Losses: ${useritem[1]}`;
                        document.getElementById('totalgames').innerText=`Total Games Played: ${useritem[2]+1}`;
                        let y=JSON.stringify([useritem[0]+1,useritem[1],useritem[2]+1])
                        localStorage.setItem(loggeduser,y)
                        clearInterval(id)
                    }
                }
            },0.1)
        },2000)
    }
    else{
        document.getElementById('alert').innerHTML='Incorrect Username';
    }
}

function round(){
    count=0
    document.getElementById('wonorlost').style.display='none'
    display(storedword);
    document.getElementsByTagName('canvas')[0].style.display='inline-block';
    document.getElementById('inside').style.display='block';
    let z=document.getElementsByTagName('canvas')[0];
    let u=z.getContext("2d");
    u.clearRect(136,90,160,215);
    document.getElementById('usedwords').style.display='none';
    document.getElementsByClassName('word')[1].innerText='';
    usedletters=[]
    login();
}
