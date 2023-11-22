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
	
	<title>CommunityCrafter - Create Profile</title>
	
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	
	<script type="text/javascript" src="/js/script.js"></script>
	<script src="/webjars/jquery/jquery.min.js"></script>
	<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<script src="https://kit.fontawesome.com/c45b326a96.js" crossorigin="anonymous"></script>
</head>
	
<body>
	<main>
		<div class="d-flex flex-column flex-shrink-0 p-4 text-white bg-pumpkin" style="width: 220px;">
			<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"><span class="fs-4">CommunityCrafter</span></a>
		    <hr>
		    <ul class="nav nav-pills flex-column mb-auto">
		    	<li class="nav-item">
		        	<a href="/" class="nav-link text-white" aria-current="page"><i class="fa-solid fa-house me-2"></i>Home</a>
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
		<div class="container-fluid" style="overflow-y: hidden;">
			<div class="row mx-auto mt-4" style="width: 90%;">
				<h1 class="display-4" style="color: #F0A160;">User Profile:</h1>
				<form:form action="/users/profile" modelAttribute="profile" method="POST" class="shadow row rounded bg-light g-3">
				<p class="my-1"> <em> Please note all fields below are optional:</em></p>
					<!-- <h4>Please note all fields below are optional:</h4> -->
	  				<div class="col-md-4">
	  					<form:label path="userCity" class="form-label">City:</form:label>
	  					<form:input path="userCity" class="form-control" id="userCity"/>
		  				<div><form:errors path="userCity" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	  					<form:label path="userState" class="form-label">State:</form:label>
	  					<form:select class="form-control" path="userState" id="userState">
	  						<form:option value="">Select a State...</form:option>
							<form:option value="AK">Alaska</form:option>
							<form:option value="AL">Alabama</form:option>
							<form:option value="AR">Arkansas</form:option>
							<form:option value="AZ">Arizona</form:option>
							<form:option value="CA">California</form:option>
							<form:option value="CO">Colorado</form:option>
							<form:option value="CT">Connecticut</form:option>
							<form:option value="DC">District of Columbia</form:option>
							<form:option value="DE">Delaware</form:option>
							<form:option value="FL">Florida</form:option>
							<form:option value="GA">Georgia</form:option>
							<form:option value="HI">Hawaii</form:option>
							<form:option value="IA">Iowa</form:option>
							<form:option value="ID">Idaho</form:option>
							<form:option value="IL">Illinois</form:option>
							<form:option value="IN">Indiana</form:option>
							<form:option value="KS">Kansas</form:option>
							<form:option value="KY">Kentucky</form:option>
							<form:option value="LA">Louisiana</form:option>
							<form:option value="MA">Massachusetts</form:option>
							<form:option value="MD">Maryland</form:option>
							<form:option value="ME">Maine</form:option>
							<form:option value="MI">Michigan</form:option>
							<form:option value="MN">Minnesota</form:option>
							<form:option value="MO">Missouri</form:option>
							<form:option value="MS">Mississippi</form:option>
							<form:option value="MT">Montana</form:option>
							<form:option value="NC">North Carolina</form:option>
							<form:option value="ND">North Dakota</form:option>
							<form:option value="NE">Nebraska</form:option>
							<form:option value="NH">New Hampshire</form:option>
							<form:option value="NJ">New Jersey</form:option>
							<form:option value="NM">New Mexico</form:option>
							<form:option value="NV">Nevada</form:option>
							<form:option value="NY">New York</form:option>
							<form:option value="OH">Ohio</form:option>
							<form:option value="OK">Oklahoma</form:option>
							<form:option value="OR">Oregon</form:option>
							<form:option value="PA">Pennsylvania</form:option>
							<form:option value="PR">Puerto Rico</form:option>
							<form:option value="RI">Rhode Island</form:option>
							<form:option value="SC">South Carolina</form:option>
							<form:option value="SD">South Dakota</form:option>
							<form:option value="TN">Tennessee</form:option>
							<form:option value="TX">Texas</form:option>
							<form:option value="UT">Utah</form:option>
							<form:option value="VA">Virginia</form:option>
							<form:option value="VT">Vermont</form:option>
							<form:option value="WA">Washington</form:option>
							<form:option value="WI">Wisconsin</form:option>
							<form:option value="WV">West Virginia</form:option>
							<form:option value="WY">Wyoming</form:option>
						</form:select>
		  				<div><form:errors path="userState" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	  					<form:label path="userZipCode" class="form-label">ZipCode:</form:label>
	  					<form:input type="number" path="userZipCode" id="start" class="form-control" />
		  				<div><form:errors path="userZipCode" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-6">
	  					<form:label path="userPhone" class="form-label">Phone:</form:label>
	  					<form:input type="tel" path="userPhone" id="userPhone" pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}" placeholder="(310) 555-1212" class="form-control" />
		  				<div><form:errors path="userPhone" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<hr />
	  				<h4>Social Media:</h4>
	  				<div class="col-4">
	    				<form:label path="userTwitter" class="form-label">Twitter @:</form:label>
	    				<form:input type="text" path="userTwitter" class="form-control" id="userTwitter"/>
		  				<div><form:errors path="userTwitter" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-4">
	    				<form:label path="userFacebook" class="form-label">Facebook:</form:label>
	    				<form:input type="text" path="userFacebook" class="form-control" id="userFacebook"/>
		  				<div><form:errors path="userFacebook" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	    				<form:label path="userInstagram" class="form-label">Instagram @:</form:label>
	    				<form:input type="text" path="userInstagram" class="form-control" id="userInstagram" />
		  				<div><form:errors path="userInstagram" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<hr />
	  				<div class="mb-3 text-center">
		  				<input type="submit" value="Create" class="col-2 btn btn-sm btn-primary" />  				
	  				</div>
	  			</form:form>
	  		</div>
  		</div>
	</main>
</body>
</html>