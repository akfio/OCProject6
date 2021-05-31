

function bestMovie(){
	let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
	fetch(url)
		.then(res => {
			if (res.ok) {
				res.json()
				.then(data => {
					document.getElementById('img_best').src = data["results"][0]["image_url"];
					document.getElementById('titre_best').innerHTML = data["results"][0]["title"];
					fetch(data["results"][0]["url"])
						.then(res => res.json())
						.then(allData => document.getElementById('description_best').innerHTML = allData["description"])
					
				})
			} else {
				console.log("erreur");
				document.getElementById("titre_best").innerHTML = "ERREUR DE RECUPERATION"
			}
		})
	}
	



function all_best_movies(){
	let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
	fetch(url)
		.then(res => res.json())
		.then(data => {
			let find_img = document.getElementById('carousel_1').getElementsByTagName('img');
			let i = 1;
			let next = 0;
			while (i <= 4) {
				find_img[i-1].setAttribute('src', data["results"][i]["image_url"]);
				i++;
			}
			fetch(data["next"])
				.then(res => res.json())
				.then(newData => {
					while (5 < i <find_img.length) {
						find_img[i-1].setAttribute('src', newData["results"][next]["image_url"])
						next++;
						i++;					
					}	
				})
			})
	}
	

/*

function all_best_movies(){
	let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
	fetch(url)
		.then(res => res.json())
		.then(data => {
			let find_img = document.getElementById('carousel_1').getElementsByTagName('img');
			let i = 1;
			let next = 0;
			for (i = 1; i <= 4; i++) {
				find_img[i-1].setAttribute('src', data["results"][i]["image_url"]);
			}
			fetch(data["next"])
				.then(res => res.json())
				.then(newData => {
					for (i = 5; i < find_img.length; i++, next++) {
						find_img[i-1].setAttribute('src', newData["results"][next]["image_url"])					
					}	
				})
			})
	}

*/

function categorie(url, carouselID){
	fetch(url)
		.then(res => res.json())
		.then(data => {
			let find_img = document.getElementById(carouselID).getElementsByTagName('img');
			let i = 0;
			let next = 0;
			while(i <= 4){
				find_img[i].setAttribute('src', data["results"][i]["image_url"]);
				i++;}
			fetch(data["next"])
				.then(res => res.json())
				.then(newData => {
					while(5 < i < find_img.length){
						find_img[i].setAttribute('src', newData["results"][next]["image_url"])
						next++;
						i++;
					}	
				})
			})
	}






bestMovie()
all_best_movies()
categorie('http://localhost:8000/api/v1/titles/?genre=Adventure', 'carousel_2')
categorie('http://localhost:8000/api/v1/titles/?genre=Animation', 'carousel_3')
categorie('http://localhost:8000/api/v1/titles/?genre=Comedy', 'carousel_4')


let activeMovie = 0;
const toShow = 4;
const movies = document.getElementById('carousel_1').getElementsByClassName('movie');
const totalMovies = movies.length;


function carousel(){
	for (let one of movies) {
		one.style.display = "none";
	}
		
	if (activeMovie === -1) {
		activeMovie = 3;

		movies[activeMovie].style.display = "block";
		movies[activeMovie+1].style.display = "block";
		movies[activeMovie+2].style.display = "block";
		movies[activeMovie+3].style.display = "block";
	}
	else
	{
		movies[activeMovie].style.display = "block";
		movies[activeMovie+1].style.display = "block";
		movies[activeMovie+2].style.display = "block";
		movies[activeMovie+3].style.display = "block";
	}


	if (movies[activeMovie + toShow] === undefined || activeMovie >= totalMovies) {
		activeMovie = -1;
	}
	}

carousel()




function next(){
	
	activeMovie++;
	carousel()
}


function prev(){
	if (activeMovie === -1) {
		activeMovie = 2;
	} 
	else if (activeMovie === 0) {
		activeMovie = -1
	}

	else {
		activeMovie--;
	}

	carousel()
}


