var myNS = {};


// "Constructor" with properties
myNS.Book = function(title, author, genre, numPages, yearPublished, rating){
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.numPages = numPages;
	this.yearPublished = yearPublished;
	this.rating = rating;
}

myNS.Book.prototype.getTitleAndAuthor = function(){
	return this.title + " by " + this.author;
};

myNS.Book.prototype.getRating = function(){
	return this.rating + " stars";
};

myNS.book1 = new myNS.Book("The Year of the Flood", "Margaret Atwood", "Fiction/Science Fiction", "431", "2009", "4.1");
myNS.book2 = new myNS.Book("The Traveler", "John Twelve Hawks", "Science Fiction", "464", "2006", "3.8");

document.body.innerHTML = "Book 1: " + myNS.book1.getTitleAndAuthor();
document.body.innerHTML += "<br />";
document.body.innerHTML += "Book 2: " + myNS.book2.getTitleAndAuthor();

document.body.innerHTML += "<br />";

document.body.innerHTML += "Book 1 rating: " + myNS.book1.getRating();
document.body.innerHTML += "<br />";
document.body.innerHTML += "Book 2 rating: " + myNS.book2.getRating();
