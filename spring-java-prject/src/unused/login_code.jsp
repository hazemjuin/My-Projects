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
	
	<title>Insert title here</title>
	
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
	
	<script type="text/javascript" src="/js/script.js"></script>
	<script src="/webjars/jquery/jquery.min.js"></script>
	<script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
</head>

<body>
	<div class="col-5 ms-2 me-auto">
		<h4>Log In:</h4>
		<form:form action="/login" modelAttribute="newLogin" method="POST" class="p-3">
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
				<input type="submit" value="Log In" class="btn btn-sm btn-primary" />
		</form:form>
	</div>
</body>
</html>