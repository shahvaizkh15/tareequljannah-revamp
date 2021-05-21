//Add the event listener for button click event
document.getElementById('evalForm').addEventListener('submit', function()
{
	$('#teacherFeedback').html('');
	document.getElementById("loginnow").disabled = true;
	let eUsername = document.getElementById('evalUsername').value;
	let ePassword = document.getElementById('evalPasswd').value;
	checkTheLogin(eUsername,ePassword); //Call the Loign check function
	event.preventDefault();
});

function checkTheLogin(eUsername,ePassword)
{
	
	//alert(eUsername);
	let search = {}
	search["username"] = eUsername;
	search["password"] = ePassword;
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : "loginTeacherAuth",
		data : JSON.stringify(search),
		dataType : 'json',
		timeout : 100000,
		success : function(data) {
			console.log("SUCCESS: ", data);
			displayTeacher(data);
		},
		error : function(e) {
			console.log("ERROR: ", e);
			 
		},
		done : function(e) {
			console.log("DONE");
		}
	});
}
function displayTeacher(data) {
	var json = "<p><b>Login success please wait... </b></p>";
	if(data["code"] == "-1")
	{
		var json = "<p><b>" + data["msg"] + "</b></p>";
		$('#teacherFeedback').html(json);
		document.getElementById('loginnow').disabled = false;
	}else{
		if(data["code"].length > 0)
		{
			$('#teacherFeedback').html(json);
			document.getElementById("sessID").value=data["code"];
			document.getElementById("sessName").value=data["msg"];
			document.getElementById("RedirectMe").submit();
		}else{
			json = "<p><b>System busy please try later... </b></p>";
			$('#teacherFeedback').html(json);
			document.getElementById('loginnow').disabled = false;
		}
	}
}
