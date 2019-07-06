// L’utilisateur peut toutefois choisir de mettre le diaporama en pause. 
//Il peut également reculer ou avancer manuellement à l’aide d’un clic de souris,
// ainsi qu’avec les touches gauche et droite de son clavier.  voir keypress 37 et 39: https://openclassrooms.com/forum/sujet/controler-un-slider-avec-les-fleches-du-claviers

// voir :https://codepen.io/SitePoint/pen/zqVGQK

const carousel = function(){
	let slider = document.getElementById('slider');
	let slider_images = slider.getElementsByTagName('img');
	let main = document.getElementById('slider_main');
	let img_caption = document.getElementById("slider_caption");
	let nav = document.getElementById("slider_nav");
	let active;
	const timing = 5000; // On appelera setInterval

function set_active_nav(el){
	if (active) active.id ="";
	el.id="active";
	active = el;
}

function set_next_index(){
	let current_index = active.getAttribute("data-index");
	current_index++;
	if (current_index==slider_images.length) current_index = 0;
	return current_index;
}

function set_active_img(index){
	img_caption.innerHTML=slider_images[index].title;
	main.style.marginLeft = "-" + index + "00%";
}

function display_slide(index){
	set_active_img(index);
	set_active_nav(nav.children[index]);
}


function make_carousel(){
	if(slider){
		let images_length = slider_images.length;
		if(images_length==0) return;
		main.style.width = 100 * images_length + "%";
		for (let i = 0; i<images_length;i++){
			slider_images[i].style.width=100/images_length + "%";  // pour chaquee image de la boucle : on applique la largeur souhaitée
			let link = document.createElement("a"); // barre de navigation placéee en dessous du slider
		link.setAttribute('data-index',i);
		if (i==0){
			img_caption.innerHTML = slider_images[i].title;
			set_active_nav(link);
		}

		//click on circles
		link.onclick = function(){
			display_slide(this.getAttribute('data-index'));
		}
		nav.appendChild(link);
		}
// désactiver cette fonction pour enlever le click
		// slider.onclick=function(){
		// 	display_slide(set_next_index());
		// }


	}

	document.querySelector('#next').onclick=function() {
		display_slide(set_next_index());
	}

	document.querySelector('#previous').onclick=function() {
		display_slide(set_previous_index());
	}

	function set_previous_index() {
		let current_index=active.getAttribute("data-index");
		if(current_index==0)
	{
		current_index= slider_images.length-1;
	} else {
		current_index--;
	}
	return current_index;
}

	setInterval(function(){
		let current_index = set_next_index();
		display_slide(current_index);
	},timing);

}

return {
	make_carousel:make_carousel
};

}();

carousel.make_carousel();

