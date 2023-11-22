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
	
	<title>CommunityCrafter - Dashboard</title>
	
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	
	<script src="/webjars/jquery/jquery.min.js"></script>
	<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/js/script.js"></script>
	<script src="https://kit.fontawesome.com/c45b326a96.js" crossorigin="anonymous"></script>
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
		    	<li>
		        	<a href="/dashboard" class="nav-link active" aria-current="page"><i class="fa-solid fa-gauge me-2"></i>Dashboard</a>
		    	</li>
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
		<div class="container-fluid p-0" style="overflow-x: hidden;">
			<div class="row mx-auto mt-4" style="width: 80%;">
				<div class="row ms-1 mb-2 p-0">
					<h1 class="display-4 p-0" style="color: #9FC088;"><em>Welcome back, <c:out value="${user.firstName}" />!</em></h1>
					<c:choose>
						<c:when test="${user.getEvents().isEmpty()}">
							<div class="shadow py-3 px-4 mb-0">
								<p>We hope you're finding the site helpful and are able to find new opportunities for service in your area. You can use the form below to add an event to the system if you are aware of a volunteer opportunity in your area that isn't listed on the site. Thanks for your participation!</p>
								<p class="mb-0"><em> - the findVolunteers Staff</em></p>
							</div>
						</c:when>
						<c:otherwise>
							<h5 class="m-0 p-2">These are your posted events:</h5>
						</c:otherwise>
					</c:choose>
				</div>
				<c:forEach var="e" items="${events}">
					<c:if test="${e.getPoster().getId() == user.id}">
						<div class="card mb-3 p-0">
							<div style="height: 300px; overflow-x: hidden;"><img src="${e.imageURL}" class="card-img-top" alt="..."></div>
							<div class="card-body">
						    	<h5 class="card-title"><c:out value="${e.title}" /></h5>
						    	<h6><em><fmt:formatDate pattern="MMMM dd, yyyy" value="${e.start}" /> - <fmt:formatDate pattern="MMMM dd, yyyy" value="${e.end}" /></em></h6>
						    	<p class="card-text text-limiter-dash"><c:out value="${e.description}" /></p>
						    	<a href="/events/${e.id}/edit" class="btn btn-sm btn-moss text-end">Edit</a>
						    	<c:if test="${e.getImageURL().isEmpty() || e.getImageURL() == null}">
						    		<a href="/events/${e.id}/image" class="btn btn-sm btn-moss text-end">Add Image</a>
						    	</c:if>
						  	</div>
						</div>
					</c:if>
				</c:forEach>
			</div>
			
			<div class="row mx-auto mt-4 p-0" style="width: 80%;">
				<h1 class="display-5 p-0" style="color: #F0A160;"><em>Post an Event</em></h1>
				<form:form action="/events/new" modelAttribute="newEvent" method="POST" class="shadow row rounded bg-light g-3 mx-0 pt-2">
					<h4>Event:</h4>
					<p class="my-1"><span class="text-danger">*</span><em> - indicates a required field</em></p>
					<div class="col-12">
	    				<form:label path="title" class="form-label"><span class="text-danger">*</span>Title:</form:label>
	    				<form:input type="text" path="title" class="form-control" id="title" />
		  				<div><form:errors path="title" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-12">
	    				<form:label path="host" class="form-label"><span class="text-danger">*</span>Host/Organization:</form:label>
	    				<form:input type="text" path="host" class="form-control" id="host" />
		  				<div><form:errors path="host" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-12">
	  					<form:label path="description" class="form-label"><span class="text-danger">*</span>Description:</form:label>
	  					<form:textarea path="description" id="description" class="form-control"></form:textarea>
		  				<div><form:errors path="description" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-5">
	  					<form:label path="start" class="form-label"><span class="text-danger">*</span>Start Date:</form:label>
	  					<form:input type="date" path="start" id="start" class="form-control" />
		  				<div><form:errors path="start" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-5">
	  					<form:label path="end" class="form-label"><span class="text-danger">*</span>End Date:</form:label>
	  					<form:input type="date" path="end" id="start" class="form-control" />
		  				<div><form:errors path="end" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-2">
	  					<form:label path="needed" class="form-label">Needed:</form:label>
	  					<form:input type="number" path="needed" id="needed" class="form-control" />
		  				<div><form:errors path="needed" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<hr />
	  				<h4>Location:</h4>
	  				<div class="col-12">
	    				<form:label path="address" class="form-label">Address:</form:label>
	    				<form:input type="text" path="address" class="form-control" id="address" placeholder="1234 Main St" />
		  				<div><form:errors path="address" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-12">
	    				<form:label path="address2" class="form-label">Address 2:</form:label>
	    				<form:input type="text" path="address2" class="form-control" id="address2" placeholder="Apartment, studio, or floor" />
		  				<div><form:errors path="address2" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-6">
	    				<form:label path="city" class="form-label"><span class="text-danger">*</span>City:</form:label>
	    				<form:input type="text" path="city" class="form-control" id="city" />
		  				<div><form:errors path="city" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	  					<form:label path="state" class="form-label"><span class="text-danger">*</span>State:</form:label>
	  					<form:select class="form-control" path="state" id="state">
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
		  				<div><form:errors path="state" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
				    <div class="col-md-2">
	    				<form:label path="zipCode" class="form-label"><span class="text-danger">*</span>Zip:</form:label>
	    				<form:input type="text" path="zipCode" class="form-control" id="zipCode" />
		  				<div><form:errors path="zipCode" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<hr />
	  				<h4>Contact Info:</h4>
	  				<div class="col-md-4">
	  					<form:label path="contactPhone" class="form-label">Phone Number:</form:label>
	  					<form:input type="tel" path="contactPhone" pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}" placeholder="(310) 555-1212" class="form-control" />
		  				<div><form:errors path="contactPhone" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	  					<form:label path="contactEmail" class="form-label">Email:</form:label>
	  					<form:input type="text" path="contactEmail" class="form-control" />
		  				<div><form:errors path="contactEmail" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	  					<form:label path="contactTwitter" class="form-label">Twitter:</form:label>
	  					<form:input type="text" path="contactTwitter" class="form-control" />
		  				<div><form:errors path="contactTwitter" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	  					<form:label path="contactFacebook" class="form-label">Facebook:</form:label>
	  					<form:input type="text" path="contactFacebook" class="form-control" />
		  				<div><form:errors path="contactFacebook" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<div class="col-md-4">
	  					<form:label path="contactInstagram" class="form-label">Instagram:</form:label>
	  					<form:input type="text" path="contactInstagram" class="form-control" />
		  				<div><form:errors path="contactInstagram" class="text-danger" style="font-size: .75rem;" /></div>
	  				</div>
	  				<%-- <div class="col-md-4">
	  					<form:label path="contactWhatsApp" class="form-label">WhatsApp:</form:label>
	  					<form:input type="text" path="contactWhatsApp" class="form-control" />
		  				<div><form:errors path="contactWhatsApp" /></div>
	  				</div> --%>
	  				<div class="mb-3 text-center">
		  				<input type="submit" value="Post Event" class="col-2 btn btn-sm btn-moss" />  				
	  				</div>
	  			</form:form>
	  		</div>
	  		<br />
	  		<br />
	  		<br />
  		</div>
	</main>

</body>
</html>