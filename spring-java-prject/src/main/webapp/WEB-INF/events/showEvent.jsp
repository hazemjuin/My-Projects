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

	<title>findVolunteers - Update Profile</title>

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
			<a href="/"	class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"><span class="fs-4">findVolunteers</span></a>
			<hr>
			<ul class="nav nav-pills flex-column mb-auto">
				<li class="nav-item"><a href="/" class="nav-link text-white"
					aria-current="page"><i class="fa-solid fa-house me-2"></i>Home</a>
				</li>
				<c:if test="${user != null}">
					<li><a href="/dashboard" class="nav-link text-white"><i
							class="fa-solid fa-gauge me-2"></i>Dashboard</a></li>
				</c:if>
				<li><a href="/about" class="nav-link text-white"><i
						class="fa-solid fa-circle-user me-2"></i>About</a></li>
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
		<div class="container-fluid" style="overflow-x: hidden;">
			<div class="row mx-auto mt-4" style="width: 90%;">
				<h1 class="display-4 mb-2 p-0" style="color: #9FC088"><em><c:out value="${event.title}" /></em></h1>
				<div class="shadow mb-4 p-0 bg-body rounded">
					<div style="height: 420px; overflow-x: hidden;"><img src="${event.imageURL}" class="card-img-top" alt="..."></div>
					<div class="p-4">
						<p class="mb-3"><strong class="me-2">Host/Organization:</strong><c:out value="${event.host}" /></p>
						<p class="mb-3"><strong class="me-2">Description:</strong><c:out value="${event.description}" /></p>
						<p class="mb-3"><strong class="me-2">Start Date:</strong><fmt:formatDate pattern="MMMM dd, yyyy" value="${event.start}" /></p>
						<p class="mb-3"><strong class="me-2">End Date:</strong><fmt:formatDate pattern="MMMM dd, yyyy" value="${event.end}" /></p>
						<hr />
						<h4>Location:</h4>
						<div class="mb-3 p-3">
							<table class="table">
								<tr>
									<td colspan=3 style="border-bottom-width: 0;"><strong class="me-2">Address:</strong><c:out value="${event.address}" /></td>
								</tr>
								<tr>
									<td colspan=3 style="border-bottom-width: 0;"><strong class="me-2">Address:</strong><c:out value="${event.address2}" /></td>
								</tr>
								<tr>
									<td style="border-bottom-width: 0;"><strong class="me-2">City:</strong><c:out value="${event.city}" /></td>
									<td style="border-bottom-width: 0;"><strong class="me-2">State:</strong><c:out value="${event.state}" /></td>
									<td style="border-bottom-width: 0;"><strong class="me-2">Zip</strong><c:out value="${event.zipCode}" /></td>
								</tr>
							</table>
						</div>
						<hr />
						<h4 class="mb-4">Contact Information:</h4>
						<p class="ms-4 mb-3">
							<strong class="me-2">Phone Number:</strong><c:out value="${event.contactPhone}" />
						</p>
						<p class="ms-4 mb-3">
							<strong class="me-2">Email:</strong><c:out value="${event.contactEmail}" />
						</p>
						<p class="ms-4 mb-3">
							<strong class="me-2">Twitter:</strong><c:out value="${event.contactTwitter}" />
						</p>
						<p class="ms-4 mb-3">
							<strong class="me-2">Facebook:</strong><c:out value="${event.contactFacebook}" />
						</p>
						<p class="ms-4 mb-3">
							<strong class="me-2">Instagram:</strong><c:out value="${event.contactInstagram}" />
						</p>
					</div>
				</div>
				<c:if test="${user.id == event.getPoster().getId()}">
					<a href="/events/${event.id}/edit" class="col-1 btn btn-sm btn-moss">Edit</a>
				</c:if>
			</div>
			<br />
			<br />
			<br />
		</div>
	</main>
</body>
</html>