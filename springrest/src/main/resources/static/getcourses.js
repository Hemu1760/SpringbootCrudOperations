$(document).ready(function() {

	$.ajax({
		url: 'http://localhost:8080/courses',
		// dataType: "json",
		type: 'GET',
		contentType: "application/json",


		success: function(result) {
			var courses = result;

			console.log(result);
			//create table
			var tableString = "<table border=1><tr><th>id</th><th>title</th><th>description</th><th>price</th></tr><th>author</th></table>";
			$("#myTable").append(tableString);
			//console.log(courses.length);
			
			var tr = [];
			for (var i = 0; i < courses.length; i++) {
				
				tr.push('<tr>');
				tr.push('<td>' + courses[i].id + '</td>');
				tr.push('<td>' + courses[i].title + '</td>');
				tr.push('<td>' + courses[i].description + '</td>');
				tr.push('<td>' + courses[i].price + '</td>');
				tr.push('<td>' + courses[i].author + '</td>');
				tr.push('</tr>');
			}
			$('#myTable').append($(tr.join('')));
			
		},
		error: function(error) {
			console.log(error);
		}
	});
});