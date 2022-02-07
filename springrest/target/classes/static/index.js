function addCourse() {
    var course_name = document.getElementById('coursename').value;
    var course_id = document.getElementById('courseID').value;
    var course_description = document.getElementById('courseDescription').value;
    var course_price = document.getElementById('coursePrice').value;
    var course_author = document.getElementById('courseAuthor').value;
    console.log(course_id);
    console.log(course_name);
    console.log(course_description);
    console.log(course_price);
    console.log(course_author);
    let dataObject = {
        id: parseInt(course_id),
        title: course_name,
        description: course_description,
        price: parseFloat(course_price),
		author: course_author
		
    };
    console.log(dataObject);
    console.log(typeof (dataObject));
    $.ajax({
        url: 'http://localhost:8080/courses',
        dataType: "json",
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(dataObject),
        success: function (result) {
            console.log("ADD OPERATION SUCCESSFULL" + result);
        },
        error: function (error) {
            console.log(error);
        }
    });
}