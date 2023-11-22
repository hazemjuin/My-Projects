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
	<title>Joy Bundler</title>

	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	
	<script src="/webjars/jquery/jquery.min.js"></script>
	<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/js/script.js"></script>
</head>

<body>
	<main>
		<div class="d-flex flex-column flex-shrink-0 p-4 text-white bg-pumpkin" style="width: 220px;">
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
		    		<a href="/allEvents" class="nav-link text-white"><i class="fa-solid fa-calendar me-2"></i>Events</a>
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
 <!-- main body of page ---------------------------------------------------------------------- -->
		<div class="container-fluid" style="overflow-x: hidden;">
			<div class="row mx-auto mt-4" style="width: 90%;">
				<div class="col-8 mx-auto">
					<h4>Register:</h4>
					<form:form action="/register" modelAttribute="newUser" method="POST" class="shadow p-3">
						<div class="form-floating mb-3">
							<form:input type="text" path="firstName" class="form-control" placeholder="First Name" />
							<form:label path="firstName" class="form-label">First Name</form:label>							
						</div>
						<div class="mb-3 text-danger"><form:errors path="firstName" /></div>
						<div class="form-floating mb-3">
							<form:input type="text" path="lastName" class="form-control" placeholder="Last Name" />
							<form:label path="lastName" class="form-label">Last Name</form:label>							
						</div>
						<div class="mb-3 text-danger"><form:errors path="lastName" /></div>
						<div class="form-floating mb-3">
							<form:input type="email" path="email" class="form-control" placeholder="Email" />
							<form:label path="email" class="form-label">Email</form:label>							
						</div>
						<div class="mb-3 text-danger"><form:errors path="email" /></div>
						<div class="form-floating mb-3">
							<form:input type="password" path="password" class="form-control" placeholder="Password" />
							<form:label path="password" class="form-label">Password</form:label>							
						</div>
						<div class="mb-3 text-danger"><form:errors path="password" /></div>
						<div class="form-floating mb-3">
							<form:input type="password" path="confirm" class="form-control" placeholder="Confirm Password" />
							<form:label path="confirm" class="form-label">Confirm Password</form:label>							
						</div>
						<div class="mb-3 text-danger"><form:errors path="confirm" /></div>
						<input type="submit" value="Create" class="btn btn-sm btn-success" />
					</form:form>
				</div>
			</div>
			<br />
			<br />
			<br />
		</div>
	</main>
	
</body>
</html>