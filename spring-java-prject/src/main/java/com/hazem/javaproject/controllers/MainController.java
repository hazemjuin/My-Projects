package com.hazem.javaproject.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.hazem.javaproject.models.Event;
import com.hazem.javaproject.models.LoginUser;
import com.hazem.javaproject.models.User;
import com.hazem.javaproject.services.EventService;
import com.hazem.javaproject.services.UserService;

import jakarta.servlet.http.HttpSession;

@Controller
public class MainController {
//	-----------------------variables-----------------------
  @Autowired
  private UserService userService;
  
  @Autowired
  private EventService eventService;

  // landing page
  @GetMapping("/")
  public String index(Model model, HttpSession session) {
  	model.addAttribute("newUser", new User());
  	model.addAttribute("newLogin", new LoginUser());
  	model.addAttribute("events", eventService.allEvents());
  	if (session.getAttribute("user_id") != null) {
  		Long userId = (Long) session.getAttribute("user_id");
  		User currentUser = userService.findUser(userId);
  		model.addAttribute("user", currentUser);
  	}
      return "/index.jsp";
  }
  
  @GetMapping("/dashboard")
  public String home(HttpSession session, Model model) {
  	Long userId = (Long) session.getAttribute("user_id");
  	if (userId == null) {
  		return "redirect:/";
  	} else {
  		User currentUser = userService.findUser(userId);
  		List<Event> events = eventService.allEvents();
  		model.addAttribute("user", currentUser);
  	    model.addAttribute("events", events);
          model.addAttribute("newEvent", new Event());
  		return "/dashboard.jsp";
  	}
  }
  
  // about no login required
  @GetMapping("/about")
  public String about(HttpSession session, Model model) {
  	model.addAttribute("newUser", new User());
  	model.addAttribute("newLogin", new LoginUser());
  	if (session.getAttribute("user_id") != null) {
  		Long userId = (Long) session.getAttribute("user_id");
  		User currentUser = userService.findUser(userId);
  		model.addAttribute("user", currentUser);
  	}
  	return "/about.jsp";
  }

  // contact no login required
  @GetMapping("/contact")
  public String contact(HttpSession session, Model model) {
  	model.addAttribute("newUser", new User());
  	model.addAttribute("newLogin", new LoginUser());
  	if (session.getAttribute("user_id") != null) {
  		Long userId = (Long) session.getAttribute("user_id");
  		User currentUser = userService.findUser(userId);
  		model.addAttribute("user", currentUser);
  	}
  	return "/contact.jsp";
  }
  @PostMapping("/contact")
  public String sendContact() {
  	return null;
  }
  
  @GetMapping("/allEvents")
  public String allEvents(HttpSession session, Model model) {
  	List<Event> events = eventService.allEvents();
  	model.addAttribute("events", events);
  	model.addAttribute("newUser", new User());
  	model.addAttribute("newLogin", new LoginUser());
  	if (session.getAttribute("user_id") != null) {
  		Long userId = (Long) session.getAttribute("user_id");
  		User currentUser = userService.findUser(userId);
  		model.addAttribute("user", currentUser);
  	}
  	return "/events/events.jsp";
  }

}
