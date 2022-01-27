const header=document.createElement('div');
header.innerHTML=`<h1 style="display:block;">Popular</h1>`;
document.body.appendChild(header);
const div=document.createElement('div');
div.classList.add("flex");
document.body.appendChild(div);
const header2=document.createElement('div');
header2.innerHTML=`<h1 style="display:block;">Top Rated</h1>`;
document.body.appendChild(header2);
const div2=document.createElement('div');
div2.classList.add("flex");
document.body.appendChild(div2);
const header3=document.createElement('div');
header3.innerHTML=`<h1 style="display:block;">Upcoming</h1>`;
document.body.appendChild(header3);
const div3=document.createElement('div');
div3.classList.add("flex");
document.body.appendChild(div3);
const divo=document.createElement('div');
divo.setAttribute("id","background");
document.body.appendChild(divo);
header.classList.add("header");
header2.classList.add("header");
header3.classList.add("header");


const form = document.querySelector("form");
const search = document.getElementById("search");
const pagination=document.createElement('div');

async function getArt(url,classNameRemove,classNameAdd,clearInnHTML,container){
    header.innerHTML=`<h1 style="display:block;">Popular</h1>`;
    header2.innerHTML=`<h1 style="display:block;">Top Rated</h1>`;
    header3.innerHTML=`<h1 style="display:block;">Upcoming</h1>`;
    container.classList.add("flex");
    if(clearInnHTML){
        clearInnerHTML();
    }
    divo.innerHTML='';
    div.classList.add(classNameAdd);
    div.classList.remove(classNameRemove);
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData) 
    respData.results.forEach(element => {
        const divs=document.createElement('div');
        divs.classList.add("cards");
        divs.innerHTML=`
            <img src=https://image.tmdb.org/t/p/original${element.poster_path} onclick="getMovie(${element.id})">
            <h2 style="cursor:pointer;" onclick="getMovie(${element.id})">${element.title}</h2>
        `;
        container.appendChild(divs);
        
    });
    const newurl = url.substring(0, url.length -1);
    console.log(newurl)
    if(div.classList.value == 'flexWrap')
    {
        pagination.innerHTML=`
        <div class='pagination' style="display:inline-flex;">
            <div class='item' onclick= "getArt('${newurl}1','flex','flexWrap',true,div);">1</div>
            <div class='item' onclick= "getArt('${newurl}2','flex','flexWrap',true,div);">2</div>
            <div class='item' onclick= "getArt('${newurl}3','flex','flexWrap',true,div);">3</div>
            <div class='item' onclick= "getArt('${newurl}4','flex','flexWrap',true,div);">4</div>
            <div class='item' onclick= "getArt('${newurl}5','flex','flexWrap',true,div);">5</div>
        </div>`;
        document.body.appendChild(pagination);
    }
}

function clearInnerHTML(){
    div.innerHTML='';
    div2.innerHTML='';
    div3.innerHTML='';
    header.innerHTML='';
    header2.innerHTML='';
    header3.innerHTML='';
    div.classList.remove("flex");
    div2.classList.remove("flex");
    div3.classList.remove("flex");
}


getArt('https://api.themoviedb.org/3/movie/popular?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&page=1',"flexwrap","flex",true,div); 
getArt('https://api.themoviedb.org/3/movie/top_rated?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&page=1',"flexwrap","flex",false,div2); 
getArt('https://api.themoviedb.org/3/movie/upcoming?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&page=1',"flexwrap","flex",false,div3);


async function getMovie(id){
    const trailerid="https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US"
    const urlid="https://api.themoviedb.org/3/movie/"+id+"?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US";
    const respo = await fetch(urlid);
    const respoData = await respo.json();
    const response = await fetch(trailerid);
    const trailerData = await response.json();
    var key;
    trailerData.results.forEach(trailer =>{
        console.log(trailer.type);
        if(trailer.type=="Trailer"){
           key= trailer.key;
        }
    });
    const trailerLink = "https://www.youtube.com/watch?v="+key;
    console.log(respoData) 
    const date=respoData.release_date;
    const release_date=date.substring(0,4);
    let genres='';
    respoData.genres.forEach(element => {
        genres=genres + element.name + "&nbsp&nbsp&nbsp";

     });
    clearInnerHTML();
    divo.innerHTML='';
    divo.innerHTML=`
        <div class="backgroundImg" style="background-image:linear-gradient(rgba(0,0,0, 0.7),rgba(0, 0, 00, 0.7)),url('https://image.tmdb.org/t/p/original${respoData.poster_path}');"></div>
        <div class="bigBox">
            <div class="imageBox">
                <img src="https://image.tmdb.org/t/p/original${respoData.poster_path}">
                <a href=${trailerLink} target="_blank"><h1>WATCH TRAILER</h1></a>
            </div>
            <div class="desc">
                <h1>${respoData.title}</h1>
                <h3>${release_date} | ${respoData.runtime} min | ${genres}</h3>
                <br>
                <h3>Vote Average: ${respoData.vote_average}</h3>
                <h4>THE STORY</h4><hr>
                <p>${respoData.overview}</p>
            </div>
        </div>
    `;
}


    function showMenu(){
        var box = document.getElementById("opening-box");
        var boxCS = window.getComputedStyle(box);
        height = boxCS.height;
        opacity = boxCS.opacity;
        if (height=="0px" && opacity==0){
            box.style.height="100px";
            box.style.opacity=1;
            box.style.pointerEvents='auto';
        }
        else{
            box.style.height="0px";
            box.style.opacity=0;
            box.style.pointerEvents='none';
        }
    }
    function hideMenu(){
        var box = document.getElementById("opening-box");
        box.style.height="0px";
        box.style.opacity=0;
        box.style.pointerEvents='none';
    }

    form.addEventListener('submit',(e) => {
        e.preventDefault();

        const searchTerm = search.value;
        var searchLink = 'https://api.themoviedb.org/3/search/movie?api_key=43a03fe0aeabd1f1c19a3175e23843e7&language=en-US&query='+searchTerm+'&include_adult=false&page=1';
        console.log(searchLink);
        if (searchTerm){
            getArt(searchLink,"flex","flexWrap",true,div);
            search.value='';
        }
    });