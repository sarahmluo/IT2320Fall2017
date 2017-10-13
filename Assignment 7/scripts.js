var course1 = {

	"courseName" : "Calculus",
	"department" : "Mathematics",
	"courseNumber" : "1610",
	"students" : ["Phil", "Mary", "Peter"],
	"topics" : 
		{ "Limits": ["Limit Definition", "Continuity", "Limit Theorems"],
		 "Derivatives" : ["Definition of the Derivative", "Differentiation and Continuity", "Rules of Differentiation"],
		 "Integrals" : ["Definite and Indefinite Integral", "The Fundamental Theorem of Calculus"]},
	
	
};

var course2 = {
	
	"courseName" : "Trigonometry",
	"department" : "Mathematics",
	"courseNumber" : "1540",
	"students" : ["Larry", "Moe", "Curly"],
	"topics" : 
		{ "Trigonometric Functions" : ["Trig Ratios", "Values of Trigonometric Functions", "The Unit Circle"],
		 "Solving Triangles" : ["Law of Sines", "Law of Cosines"],
		 "Trigonometric Identities" : ["Fundamental Identities", "Sum and Difference Formulas", "Multiple Angle Formulas"]}
	

};

var courses = [course1, course2];

$(document).ready(function(){
	
	var body = $("body");
	
	for(c in courses){
		var temp = courses[c];
		body.append("<h2>" + temp.department + " " + temp.courseNumber + " " + temp.courseName + "</h2>");
		body.append("<h3> Current Enrollment: </h3>");
		//body.append("<p>");
		var str = "";
		for(s in temp.students){
			str += temp.students[s] + "<br />";
		}
		//body.append("</p>");
		body.append($("<p></p>").html(str));
		
		body.append("<h3> Course Topics: </h3>");
		
		var listStr = "";
		for(t in temp.topics){
			listStr += "<li>" + t;
			listStr += "<ul>";
				for(i in temp.topics[t]){
					listStr += "<li>" + temp.topics[t][i] + "</li>";
				}
			listStr += "</ul>";
			listStr += "</li>";
		}
		body.append($("<ol></ol>").html(listStr));
		
	}

});