var images = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg", "images/img5.jpg", "images/img6.jpg"];
var captions = ["Kind of hard to do Tai Chi if you can't breathe. Fuyang, Anhui, China (2013) <a target='_blank' href='https://www.theatlantic.com/science/archive/2017/03/how-climate-change-covered-china-in-smog/520197/'> Source </a>",
				"A lovely plastic waterway. Vacha Dam, Bulgaria (2009) <a target='_blank' href='http://www.huffingtonpost.com/entry/plastic-waste-oceans_us_58fed37be4b0c46f0781d426'> Source </a>",
				"There is something sad about this juxtaposition of pristine icebergs with scads of human-produced garbage. Illulissat, Greenland <a target='_blank' href='http://www.huffingtonpost.com/entry/plastic-waste-oceans_us_58fed37be4b0c46f0781d426'> Source </a>",
				"Rising ocean levels causes high tides that inundate the villages in Kiribati. This palm tree was killed by flooding from ocean waters. Tarawa, Kiribati (2015) <a target='_blank' href='https://www.theguardian.com/environment/gallery/2015/mar/17/pacific-islands-losing-way-of-life-to-climate-change-in-pictures'> Source </a>",
				"Coral reefs are dying due to rising temperatures and pollution. <a target='_blank' <a href='http://www.healthfreedoms.org/the-great-barrier-reef-die-off-is-the-result-of-more-than-just-climate-change/'> Source </a>",
				"Yep. That's the world I want to live in. <a target='_blank' href='https://permaculturenews.org/2013/07/25/fossil-fuel-use-pushes-carbon-dioxide-emissions-into-dangerous-territory/'> Source </a>"];
var imageIndex = 0;


function startSlideShow(myHTMLObject){

	myHTMLObject.style.display = "none";
	
	document.getElementsByClassName("slideShowNav")[0].style.display = "inline";
	document.getElementsByClassName("slideShowNav")[1].style.display = "inline";
	
	document.getElementById("slideShowImage").style.visibility = "visible";
	document.getElementById("slideShowCaption").style.visibility = "visible";
	
	document.getElementById("slideShowImage").src = images[0];
	document.getElementById("slideShowCaption").innerHTML = captions[0];
	
}

function navigateSlideShow(slideShowButton){

	// here we test for type and value. If we just test for value, weird things can happen. I think.
	if(slideShowButton.name === "forwards"){
		if(imageIndex == images.length-1){
			// do nothing
		} 
		else { // move forward
			imageIndex++;
			document.getElementById("slideShowImage").src = images[imageIndex];
			document.getElementById("slideShowCaption").innerHTML = captions[imageIndex];
		}
	}
	else { // move backwards
		if(imageIndex == 0){
			// do nothing
		} 
		else { // move forward
			imageIndex--;
			document.getElementById("slideShowImage").src = images[imageIndex];
			document.getElementById("slideShowCaption").innerHTML = captions[imageIndex];
		}
	
	}
	
} // end navigateSlideShow


function submitPledge(){
	var str = '<p class="thankYouMessage"><h2> Thank You! </h2></p>';
	var myDiv = document.getElementsByClassName("pledge")[0];

	myDiv.innerHTML = "";
	
	// Because you can't just build a string and assign it with innerHTML...
	myDiv.appendChild(document.createElement('p')).appendChild(document.createTextNode("Thank You!"));
	myDiv.firstChild.className = "thankYouMessage";	
}





