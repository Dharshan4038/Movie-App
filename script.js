let movieName = document.getElementById("movie-name");
let btn = document.querySelector(".btn");
let review = document.querySelector('.review');

key = "http://www.omdbapi.com/?i=tt3896198&apikey=c3e3fbc6";

//Function to fetch data from API 

btn.addEventListener('click',() => {
    getMovie();
})


let getMovie = () => {
    let movie = movieName.value;
    let url = `http://www.omdbapi.com/?t=${movie}&${key}`;
    if(movie.length <= 0) {
        review.innerHTML = `<h2 class="notice"> Please Enter A Movie Name </h2>`;
    }
    else {
        fetch(url)
            .then((response) => response.json())
            .then(async (data) => {
                if(data.ok) {
                    data = await data.json();
                }
                let str = data.Genre;
                let genre = str.split(', ');
                review.innerHTML = `
                    <div class="result">
                        <img src="${data.Poster}" alt="" class="image"/>
                        <div class="data">    
                            <h3>${data.Title}</h3>
                            <h2><i class="fa fa-star"></i> ${data.imdbRating}</h2>
                            <div class="parent">
                                <p class="item">${data.Rated}</p>
                                <p class="item">${data.Year}</p>
                                <p class="item">${data.Runtime}</p>
                            </div>
                            <div class="parent-1">
                                <p class="genre">${genre[0]}<p>            
                                <p class="genre">${genre[1]}<p> 
                                <p class="genre">${genre[2]}<p> 
                            </div>
                        </div>
                    </div>
                    <div class="plot">
                        <h2>Plot :</h2>
                        <p>${data.Plot}</p>
                    </div>
                    <div class="cast">
                        <h2>Main Cast :</h2>
                        <p>${data.Actors}</p>
                    </div>
                `
            }).catch(e => {
                review.innerHTML = `<h2 class="notice">Movie does not found</h2>`;
            })
    }
}

