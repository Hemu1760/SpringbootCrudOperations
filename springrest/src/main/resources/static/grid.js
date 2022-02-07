$(document).ready(function() {
	getcourses();
	var gridDataSource = new kendo.data.DataSource({
		//data: response,
		schema: {
			model: {
				fields: {
					id: { type: "number" },
					title: { type: "string" },
					description: { type: "string" },
					price: { type: "number" },
					author: { type: "string", editable: true ,editor:DropDownList}
				}
			}
		},

		sort: {
			field: "id",
			dir: "asc"
		},
		
	});

	$("#ordersGrid").kendoGrid({
		dataSource: gridDataSource,
		save: function(e) {
			var data = e.model;

			var postdata = {};
			postdata.id = data.id;
			postdata.title = data.title;
			postdata.description = data.description;
			postdata.price = data.price;
			postdata.author = data.author;



			$.ajax({
				type: "POST",
				contentType: 'application/json',
				url: "http://localhost:8080/courses",
				data: JSON.stringify(postdata),
				dataType: "json",
				success: function(result) {
					getcourses();
				},
				error: function() {
					console.log("Error updating the Product");
					location.reload(true);
				}
			});

		},
	remove: function(e) {

			$.ajax({
				type: "DELETE",
				url: "http://localhost:8080/courses/" + e.model.id,
				success: function() {
					alert(" Record Deeleted ");
				},
				error: function() {
					alert("Error deleting record");
					location.reload(true);
				}
			});
		},
		toolbar: ["create"],
		editable: "popup",
		height: 500,
		//width:1200,
		//pageable: true,
		sortable: true,
		filterable: true,
		columns: [{
			field: "id",
			title: "id",
			width: 160
		}, {
			field: "title",
			title: "title",
			width: 160,
		}, {
			field: "description",
			title: "description",
			width: 200,
		}, {
			field: "price",
			title: "price",
			width: 100,
		},{
			field: "author",
			title: "author",
		    editor:DropDownList,
			template:"#=author#",
			
		
			width: 150,
}, {
			title: "Actions",
			command: ["edit", "destroy"],
		}
		]
	});
});
function DropDownList(container, options) {
	$('<input required Name="author"' + options.field + '"/>')
		.appendTo(container)
		.kendoDropDownList({
	
		dataValueField: "author",
			dataTextField: "name",
				optionLabel: "select course Author",
		
			 dataSource: {
				data:[{ name: "Internet" },{ name: "web" },{ name: "service" }],
			
           
              
            update: {
                    type: "GET", 
                    url: "http://localhost:8080/courses",
                    dataType: "json"
                } }

		});
		
		
}

function getcourses() {

	$.ajax({
		url: 'http://localhost:8080/courses',
		dataType: "json",
		type: 'GET',
		contentType: "application/json",

		success: function(result) {

			$("#ordersGrid").data("kendoGrid").dataSource.data(result);
		},
		error: function(error) {
			console.log(error);
		}

	});

}