<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. --> 
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!-- Formatting (dates) --> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"  %>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	
	<title>CommunityCrafter - User Profile</title>
	
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	
	<script type="text/javascript" src="/js/script.js"></script>
	<script src="/webjars/jquery/jquery.min.js"></script>
	<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<script src="https://kit.fontawesome.com/c45b326a96.js" crossorigin="anonymous"></script>
</head>

<body>
	<main class="">
		<div class="d-flex flex-column flex-shrink-0 p-4 text-white bg-pumpkin vh-100" style="width: 220px;">
			<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"><span class="fs-4">CommunityCrafter</span></a>
		    <hr>
		    <ul class="nav nav-pills flex-column mb-auto">
		    	<li class="nav-item">
		        	<a href="/" class="nav-link text-white"><i class="fa-solid fa-house me-2"></i>Home</a>
		    	</li>
		    	<c:if test="${user != null}">
		    		<li>
		        		<a href="/dashboard" class="nav-link text-white"><i class="fa-solid fa-gauge me-2"></i>Dashboard</a>
		    		</li>
		    	</c:if>
		    	<li><a href="/about" class="nav-link text-white"><i class="fa-solid fa-circle-user me-2"></i>About</a>
		    	</li>
		    	<li>
		        	<a href="/contact" class="nav-link text-white"><i class="fa-solid fa-envelope me-2"></i>Contact</a>
		    	</li>
		    	<li>
		    		<a href="/allEvents" class="nav-link active"><i class="fa-solid fa-calendar me-2"></i>Events</a>
		    	</li>
		    </ul>
   			<hr>
   			<c:choose>
   				<c:when test="${user == null}">
				    <div class="btn-group-vertical" role="group">
						<button type="button" class="btn btn-sm btn-offpumpkin" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
						<button type="button" class="btn btn-sm btn-moss" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
		  			</div>
   				</c:when>
   				<c:otherwise>
   					<div class="text-center mb-3">Welcome, <c:out value="${user.firstName}" />!</div>
   					<div class="btn-group-vertical" role="group">
				    	<button class="btn btn-sm btn-moss" onclick="goProfile()">Profile</button>
				    	<button class="btn btn-sm btn-danger" onclick="goLogOut()">Sign Out</button>
				    </div>
   				</c:otherwise>
   			</c:choose>
  		</div>
  		<div class="py-6 pt-3">
			<div class="container-fluid" style="overflow-y: hidden;">
			<div class="row mx-auto mt-4" style="width: 90%;">
				<h1 class="display-4 ms-0 px-0"><em><c:out value="${user.firstName}" />'s User Profile</em></h1>
				<p></p>
					<div class="shadow p-3 mb-5 bg-body rounded">
						<p><strong class="">City: </strong><c:out value="${profile.userCity}" /></p>
						<p><strong>State:</strong><c:out value="${profile.userState}" /></p>
						<p><strong>Zip Code: </strong><c:out value="${profile.userZipCode}" /></p>
						<p class="mb-3"><strong>Phone: </strong><c:out value="${profile.userPhone}" /></p>
					</div>
					<div class="shadow p-3 mb-5 bg-body rounded">
						<div class="box">
							<h4><em>Social Media</em></h4>
							<p class="ms-2"><strong>Twitter: </strong><c:out value="${profile.userTwitter}" /></p>
							<p class="ms-2"><strong>Facebook: </strong><c:out value="${profile.userFacebook}" /></p>
							<p class="ms-2"><strong>Instagram: </strong><c:out value="${profile.userInstagram}" /></p>
						</div>					
					<a href="/users/profile/${profile.id}/edit" class="col-2 btn btn-sm btn-moss">Update Profile</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</body>
</html>