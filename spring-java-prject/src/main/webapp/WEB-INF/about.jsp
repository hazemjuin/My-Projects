<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- Formatting (dates) -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>CommunityCrafter - About</title>

<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/css/style.css">

<script type="text/javascript" src="/js/script.js"></script>
<script src="/webjars/jquery/jquery.min.js"></script>
<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
<script src="https://kit.fontawesome.com/c45b326a96.js"
	crossorigin="anonymous"></script>
</head>

<body>
	<main>
		<div
			class="d-flex flex-column flex-shrink-0 p-4 text-white bg-pumpkin"
			style="width: 220px;">
			<a href="/"
				class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"><span
				class="fs-4">CommunityCrafter</span></a>
			<hr>
			<ul class="nav nav-pills flex-column mb-auto">
				<li class="nav-item"><a href="/" class="nav-link text-white"><i
						class="fa-solid fa-house me-2"></i>Home</a></li>
				<c:if test="${user != null}">
					<li><a href="/dashboard" class="nav-link text-white"><i
							class="fa-solid fa-gauge me-2"></i>Dashboard</a></li>
				</c:if>
				<li><a href="/about" class="nav-link active"
					aria-current="page"><i class="fa-solid fa-circle-user me-2"></i>About</a>
				</li>
				<li><a href="/contact" class="nav-link text-white"><i
						class="fa-solid fa-envelope me-2"></i>Contact</a></li>
				<li><a href="/allEvents" class="nav-link text-white"><i
						class="fa-solid fa-calendar me-2"></i>Events</a></li>
			</ul>
			<hr>
			<c:choose>
				<c:when test="${user == null}">
					<div class="btn-group-vertical" role="group">
						<button type="button" class="btn btn-sm btn-offpumpkin"
							data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
						<button type="button" class="btn btn-sm btn-moss"
							data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
					</div>
				</c:when>
				<c:otherwise>
					<div class="text-center mb-3">
						Welcome,
						<c:out value="${user.firstName}" />
						!
					</div>
					<div class="btn-group-vertical" role="group">
						<button class="btn btn-sm btn-moss" onclick="goProfile()">Profile</button>
						<button class="btn btn-sm btn-danger" onclick="goLogOut()">Sign
							Out</button>
					</div>
				</c:otherwise>
			</c:choose>
		</div>
		<!-- main body of page ---------------------------------------------------------------------- -->
		<div style="overflow-x: hidden;">
			<div class="row mx-auto mt-5" style="width: 78%;">
				<h1 class="display-4 mb-2" style="color: #9FC088">
					About <em>CommunityCrafter</em>
				</h1>
				<div class="shadow px-4 pt-3 mb-5 bg-body rounded">
					<p class="lh-base">CommunityCrafter was developed to match
						community-minded people with volunteer opportunities in their
						neighborhoods and surrounding areas. It was also designed to
						provide local community services providers with a means to
						publicize their need for human assistance.</p>

					<p class="lh-base">The CommunityCrafter project was developed by
						 Coding Dojo bootcamp students to fill a void they felt
						existed in the local/community philanthropic space. Recognizing
						there were an increasing number of "looking for
						volunteers/volunteers needed" posts appearing across the social
						media landscape, the findVolunteers' developers wanted to provide
						a unified system to allow for people looking to give back to their
						communities through volunteerism access to open opportunities in
						their area. And, conversely, a system for organizations/services
						to post opportunities they want their communities to be aware of.</p>

					<p class="lh-base">Whether managing animals at a no-kill rescue
						shelter, serving hot meals at a homeless shelter, or aiding in
						rebuilding homes after disaster recovery, findVolunteers is a
						place for anyone looking to be civically minded with their time
						and labor to come and see those opportunities... and for those
						opportunities to have a place to be seen more readily.</p>

				</div>

				<div class="shadow p-3 mb-5 bg-body rounded">
					<div class="card-group p-0">
						<div class="card m-2">
							<img src="/img/new.jpg" class="card-img-top" alt="...">
							<div class="card-body bg-green">
								<p class="card-text">
									Hello I'm Thomas in Portland, Oregon. <br /> Fav Orgs: Free
									Tacos
								</p>
							</div>
						</div>
						<div class="card m-2">
							<img src="/img/aaaa.jpg" class="card-img-top" alt="...">
							<div class="card-body bg-green">
								<p class="card-text">
									Hello I'm America in Los Angeles, Californis. <br /> Fav Orgs:
									Face Painting for Pugs
								</p>
							</div>
						</div>
						<div class="card m-2">
							<img src="/img/new.jpg" class="card-img-top" alt="...">
							<div class="card-body bg-green">
								<p class="card-text">
									Hello I'm Massoud in Seattle, Washington. <br /> Fave Orgs:
									Free Haircuts for Balding People
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
	<div class="modal fade text-dark" id="loginModal" tabindex="-1"
		aria-labelledby="loginModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Login:</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<form:form action="/login" modelAttribute="newLogin" method="POST"
					class="p-3">
					<div class="form-floating mb-3">
						<form:input type="email" path="email" class="form-control"
							placeholder="Email" />
						<form:label path="email" class="form-label">Email</form:label>
					</div>
					<div class="mb-3 text-danger">
						<form:errors path="email" />
					</div>
					<div class="form-floating mb-3">
						<form:input type="password" path="password" class="form-control"
							placeholder="Password" />
						<form:label path="password" class="form-label">Password</form:label>
					</div>
					<div class="mb-3 text-danger">
						<form:errors path="password" />
					</div>
					<input type="submit" value="Log In" class="btn btn-sm btn-primary" />
				</form:form>
			</div>
		</div>
	</div>
	<div class="modal fade text-dark" id="registerModal" tabindex="-1"
		aria-labelledby="registerModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Register:</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<form:form action="/register" modelAttribute="newUser" method="POST"
					class="p-3">
					<div class="form-floating mb-3">
						<form:input type="text" path="firstName" class="form-control"
							placeholder="First Name" />
						<form:label path="firstName" class="form-label">First Name</form:label>
					</div>
					<div class="mb-3 text-danger">
						<form:errors path="firstName" />
					</div>
					<div class="form-floating mb-3">
						<form:input type="text" path="lastName" class="form-control"
							placeholder="Last Name" />
						<form:label path="lastName" class="form-label">Last Name</form:label>
					</div>
					<div>
						<form:errors path="lastName" />
					</div>
					<div class="form-floating mb-3">
						<form:input type="email" path="email" class="form-control"
							placeholder="Email" />
						<form:label path="email" class="form-label">Email</form:label>
					</div>
					<div class="mb-3 text-danger">
						<form:errors path="email" />
					</div>
					<div class="form-floating mb-3">
						<form:input type="password" path="password" class="form-control"
							placeholder="Password" />
						<form:label path="password" class="form-label">Password</form:label>
					</div>
					<div class="mb-3 text-danger">
						<form:errors path="password" />
					</div>
					<div class="form-floating mb-3">
						<form:input type="password" path="confirm" class="form-control"
							placeholder="Confirm Password" />
						<form:label path="confirm" class="form-label">Confirm Password</form:label>
					</div>
					<div class="mb-3 text-danger">
						<form:errors path="confirm" />
					</div>
					<input type="submit" value="Create" class=" btn btn-sm btn-success" />
				</form:form>
			</div>
		</div>
	</div>
</body>
</html>