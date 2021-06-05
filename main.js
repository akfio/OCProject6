
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
						.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										})
					
				})
			} else {
				console.log("erreur");
				document.getElementById("titre_best").innerHTML = "ERREUR DE RECUPERATION"
			}
		})
	}
	

function all_best_movies(){
	let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
	let find_img = document.getElementById('carousel_1').getElementsByTagName('img');
	fetch(url)
		.then(res => res.json())
		.then(data => {
			let find_img = document.getElementById('carousel_1').getElementsByTagName('img');
			let i = 1;
			let next = 0;
			for (i; i <= 4; i++) {
				find_img[i-1].setAttribute('src', data["results"][i]["image_url"]);
			}
			fetch(data["next"])
				.then(res => res.json())
				.then(newData => {
					for (i; 5 < i < find_img.length; i++, next++){
						find_img[i-1].setAttribute('src', newData["results"][next]["image_url"]);
					} 	
				})
			})
	}
	

function categorie(url, carouselID){
	let find_img = document.getElementById(carouselID).getElementsByTagName('img');
	fetch(url)
		.then(res => res.json())
		.then(data => {
			let i = 0;
			let next = 0;
			for(i; i <= 4; i++){
				find_img[i].setAttribute('src', data["results"][i]["image_url"]);
				}
			fetch(data["next"])
				.then(res => res.json())
				.then(newData => {
					for(i; 5 < i < find_img.length; i++, next++){
						find_img[i].setAttribute('src', newData["results"][next]["image_url"])
					}	
				})
			})
	}



bestMovie()
all_best_movies()
categorie('http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score', 'carousel_2')
categorie('http://localhost:8000/api/v1/titles/?genre=Animation&sort_by=-imdb_score', 'carousel_3')
categorie('http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score', 'carousel_4')



//Fonction gérant le carousel

let activeMovie = 0;

function carousel(carouselID){

	const toShow = 4;
	const movies = document.getElementById(carouselID).getElementsByClassName('movie');
	const totalMovies = movies.length;

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


function next(carouselID){
	
	activeMovie++;
	carousel(carouselID)
}


function prev(carouselID){
	if (activeMovie === -1) {
		activeMovie = 2;
	} 
	else if (activeMovie === 0) {
		activeMovie = -1
	}

	else {
		activeMovie--;
	}

	carousel(carouselID)
}



carousel('carousel_1')
carousel('carousel_2')
carousel('carousel_3')
carousel('carousel_4')



//Modal 
var modal = document.getElementById("modal");
var close = document.getElementById('modal_close')

function show(){
	modal.style.display = "block";
}
close.onclick = function(){
	modal.style.display = "none";
}


function bestModal(i){
	fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
		.then(res => {
			if (res.ok) {
				res.json()
				.then(data => {

					if (i < 5) {
						fetch(data["results"][i]["url"])
						.then(res => res.json())
						.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})
					}else{
						fetch(data["next"])
						.then(res => res.json())
						.then(newData => {
							i-= 5
							fetch(newData["results"][i]["url"])
								.then(res => res.json())
								.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})})
					}				
	})}}) 		
		}


function adventureModal(i){
	fetch('http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score')
		.then(res => {
			if (res.ok) {
				res.json()
				.then(data => {

					if (i < 5) {
						fetch(data["results"][i]["url"])
						.then(res => res.json())
						.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})
					}else{
						fetch(data["next"])
						.then(res => res.json())
						.then(newData => {
							i-= 5
							fetch(newData["results"][i]["url"])
								.then(res => res.json())
								.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})})
					}				
	})}}) 		
		}



function animationModal(i){
	fetch('http://localhost:8000/api/v1/titles/?genre=Animation&sort_by=-imdb_score')
		.then(res => {
			if (res.ok) {
				res.json()
				.then(data => {

					if (i < 5) {
						fetch(data["results"][i]["url"])
						.then(res => res.json())
						.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})
					}else{
						fetch(data["next"])
						.then(res => res.json())
						.then(newData => {
							i-= 5
							fetch(newData["results"][i]["url"])
								.then(res => res.json())
								.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})})
					}				
	})}}) 		
		}



function comedyModal(i){
	fetch('http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score')
		.then(res => {
			if (res.ok) {
				res.json()
				.then(data => {

					if (i < 5) {
						fetch(data["results"][i]["url"])
						.then(res => res.json())
						.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})
					}else{
						fetch(data["next"])
						.then(res => res.json())
						.then(newData => {
							i-= 5
							fetch(newData["results"][i]["url"])
								.then(res => res.json())
								.then(allData => {document.getElementById('description_best').innerHTML = allData["description"];
										document.getElementById("modal_title").innerHTML = allData["title"];
										document.getElementById("modal_img").src = allData["image_url"];
										document.getElementById("modal_genre").innerHTML = allData["genres"];
										document.getElementById("modal_date").innerHTML = allData["date_published"];
										document.getElementById("modal_note").innerHTML = allData["avg_vote"];
										document.getElementById("modal_imdb").innerHTML = allData["imdb_score"];
										document.getElementById("modal_director").innerHTML = allData["directors"];
										document.getElementById("modal_actors").innerHTML = allData["actors"];
										document.getElementById("modal_time").innerHTML = allData["duration"];
										document.getElementById("modal_origine").innerHTML = allData["countries"];
										document.getElementById("modal_office").innerHTML = allData["worldwide_gross_income"];
										if ( allData["worldwide_gross_income"] === null) {document.getElementById("modal_office").innerHTML = 'Donnée non fournie'};
										document.getElementById("modal_resume").innerHTML = allData["long_description"];
										})})
					}				
	})}}) 		
		}
