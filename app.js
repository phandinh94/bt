let searchInput = document.getElementById("input");
let ul = document.getElementById("List")
function getData(url, fn) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                fn(undefined, JSON.parse(xhr.responseText));
            } else {
                fn(new Error(xhr.statusText), undefined);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}
searchInput.addEventListener("keyup", ()=>{
    ul.innerHTML = ""
    getData(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${searchInput.value}`,function(err,res){
        if(err){
            console.log(err);
        } else {
            // console.log(res);
            for (i=0; i <res[1].length; i++){
                let newTitle = res[1][i];
                // console.log(newTitle);
                getData(`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${newTitle}`,(errImg,resImg)=>{
                    if (errImg) {
                        console.log(errImg);
                    } else {
                        console.log(resImg);
                        let result = Object.keys(resImg.query.pages)[0];
                        let linkPicture = resImg.query.pages[result].thumbnail.source;
                        let linkShow = resImg.query.pages[result].pageprops["wikibase-shortdesc"];
                        ul.innerHTML += `<li class="List-item">
                        <div class="list-img">
                        <img src="${linkPicture}" alt="photo">
                        </div>
                        <div class="tittle">
                        <h4>${newTitle}</h4>
                        <p>${linkShow}</p>
                        </div>
                        </li>`
                    }
                })
            } 
        }
    })
})


