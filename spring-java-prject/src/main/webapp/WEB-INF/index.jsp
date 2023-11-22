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
	
	<title>CommunityCrafter</title>
	
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	
	<script src="/webjars/jquery/jquery.min.js"></script>
	<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<script src="https://kit.fontawesome.com/c45b326a96.js" crossorigin="anonymous"></script>
	<script type="text/javascript" src="/js/script.js"></script>
</head>

<body>
	<main>
		<div class="d-flex flex-column flex-shrink-0 p-4 text-white bg-pumpkin" style="width: 220px;">
			<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"><span class="fs-4">CommunityCrafter</span></a>
		    <hr>
		    <ul class="nav nav-pills flex-column mb-auto">
		    	<li class="nav-item">
		        	<a href="/" class="nav-link active" aria-current="page"><i class="fa-solid fa-house me-2"></i>Home</a>
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
		<div style="overflow-x: hidden;">
			<div class="row mx-auto mt-4" style="width: 90%;">
				<div class="shadow card bg-dark text-white p-0" style="height: 360px; overflow-y: hidden;">
					<img src="/img/landscape.jpg" class="img-fluid" alt="..." >
					<div class="card-img-overlay p-4 mt-5">
						<h3 class="card-title"><em>Finding Fulfillment... through volunteerism!</em></h3>
						<p class="card-text">Have some extra time on your hands? Looking to give back to your community but can't afford to donate money? Try your hand at volunteering! Local organizations are looking for help doing everything from food service to dog grooming, to home building.</p>
						<p class="card-text">And you could be the PERFECT fit for the job.</p>
					</div>
				</div>
			</div>
			<div class="my-5 mx-auto text-center" style="width: 80%;">
				<div class="shadow card bg-lightbrown">
					<div class="card-body">
						<h5 class="card-title">Know about a volunteer opportunity?</h5>
    					<p class="card-text">You can post events in your community by registering with the site.</p>
    					<button type="button" class="btn btn-sm btn-offpumpkin" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
  					</div>
				</div>
			</div>
			<div class="row mx-auto p-0" style="width: 90%">
				<c:forEach var="e" items="${events}">
					<div class="col-sm-4">
						<div class="card px-0 mb-5">
						  <img src="${e.imageURL}" class="card-img-top" alt="volunteers packing food into boxes">
						  <div class="card-body">
						    <h5 class="card-title text-limiter-index"><c:out value="${e.title}" /></h5>
						    <p class="card-text text-limiter-index"><c:out value="${e.description}" /></p>
						    <a href="/events/${e.id}" class="btn btn-sm btn-moss">More</a>
						  </div>
						</div>
					</div>
				</c:forEach>
			</div>
		</div>
	</main>
	
	<div class="modal fade text-dark" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
   				<div class="modal-header">
     				<h5 class="modal-title" id="staticBackdropLabel">Login:</h5>
     				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   				</div>
   				<form:form action="/login" modelAttribute="newLogin" method="POST" class="p-3">
					<div class="form-floating mb-3">
						<form:input type="text" path="email" class="form-control" placeholder="Email" />
						<form:label path="email" class="form-label">Email</form:label>							
					</div>
					<div class="mb-3 text-danger"><form:errors path="email" /></div>
					<div class="form-floating mb-3">
						<form:input type="password" path="password" class="form-control" placeholder="Password" />
						<form:label path="password" class="form-label">Password</form:label>							
					</div>
					<div class="mb-3 text-danger"><form:errors path="password" /></div>
					<input type="submit" value="Log In" class="btn btn-sm btn-primary" />
				</form:form>
   			</div>
   		</div>
   	</div>
	<div class="modal fade text-dark" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
    			<div class="modal-header">
      				<h5 class="modal-title" id="staticBackdropLabel">Register:</h5>
      				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    			</div>
    			<form:form action="/register" modelAttribute="newUser" method="POST" class="p-3">
					<div class="form-floating mb-3">
						<form:input type="text" path="firstName" class="form-control" placeholder="First Name" />
						<form:label path="firstName" class="form-label">First Name</form:label>							
					</div>
					<div class="mb-3 text-danger"><form:errors path="firstName" /></div>
					<div class="form-floating mb-3">
						<form:input type="text" path="lastName" class="form-control" placeholder="Last Name" />
						<form:label path="lastName" class="form-label">Last Name</form:label>							
					</div>
					<div><form:errors path="lastName" /></div>
					<div class="form-floating mb-3">
						<form:input type="text" path="email" class="form-control" placeholder="Email" />
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
					<input type="submit" value="Create" class=" btn btn-sm btn-success" />
				</form:form>
    		</div>
    	</div>
    </div>

</body>
</html>