package com.hazem.javaproject.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.hazem.javaproject.models.LoginUser;
import com.hazem.javaproject.models.User;
import com.hazem.javaproject.models.UserProfile;
import com.hazem.javaproject.services.UserProfileService;
import com.hazem.javaproject.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
public class UserController {
    // -----------------------variables-----------------------
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserProfileService userProfileService;
    
//    @Autowired
//    private EventService eventService;
    
    // create new
    @GetMapping("/register")
    public String index(Model model) {
    	model.addAttribute("newUser", new User());
    	model.addAttribute("newLogin", new LoginUser());
        return "/users/register.jsp";
    }
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("newUser") User newUser, BindingResult result, Model model, HttpSession session) {
    	// do validation checks on email and password
    	userService.register(newUser, result);
    	if (result.hasErrors()) {
    		return "/users/register.jsp";
    	} else {
    		session.setAttribute("user_id", newUser.getId());
    		return "redirect:/dashboard";
    	}
    }
    
    // login
    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, BindingResult result, Model model, HttpSession session) {
    	User user = userService.login(newLogin, result);
    	if (result.hasErrors()) {
    		return "/users/login.jsp"; // #loginModal
    	} else {
    		session.setAttribute("user_id", user.getId());
    		return "redirect:/dashboard";
    	}
    	
    }
    
    // logout
    @GetMapping("/logout")
    public String logout(HttpSession session) {
    	session.invalidate();
    	return "redirect:/";
    }
    
    // profile
    @GetMapping("/users/profile")
    public String showProfile(HttpSession session, Model model) {
    	Long userId = (Long) session.getAttribute("user_id");
    	if (userId == null) {
    	    return "redirect:/";
    	} else {
    		User currentUser = userService.findUser(userId);
    		model.addAttribute("user", currentUser);
    		if (currentUser.getProfile() != null) {
    			UserProfile currentUserProfile = userProfileService.findUserProfile(currentUser.getProfile().getId());
    			model.addAttribute("profile", currentUserProfile);
    			return "/users/showUserProfile.jsp";
    		} else {
    			model.addAttribute("profile", new UserProfile());
    			return "/users/newUserProfile.jsp";
    		}
    	}
    }
    @PostMapping("/users/profile")
    public String createProfile(@ModelAttribute("profile") UserProfile profile, BindingResult result, HttpSession session, Model model) {
    	Long userId = (Long) session.getAttribute("user_id");
    	if (userId == null) {
    	    return "redirect:/";
    	} else {
    		userProfileService.postNewProfile(profile, result);
    		if (result.hasErrors()) {
    	    	return "/users/newUserprofile.jsp";
    	    } else {
    	    	User currentUser = userService.findUser(userId);
    	    	profile.setUser(currentUser);
    	    	UserProfile newProfile = userProfileService.createUserProfile(profile);
    	    	currentUser.setProfile(newProfile);
    	    	return "redirect:/dashboard";
    	    }
    	}
    }
    
    @GetMapping("/users/profile/{id}/edit")
    public String editProfile(@PathVariable("id") Long id, HttpSession session, Model model) {
    	Long userId = (Long) session.getAttribute("user_id");
    	if (userId == null) {
    	    return "redirect:/";
    	} else {
    		User currentUser = userService.findUser(userId);
    		UserProfile currentUserProfile = userProfileService.findUserProfile(id);
    		model.addAttribute("user", currentUser);
    		model.addAttribute("profile", currentUserProfile);
    		return "/users/editUserProfile.jsp";
    	}
    }
    @PutMapping("/users/profile/{id}/edit")
    public String updateProfile(@PathVariable("id") Long id, @ModelAttribute("profile") UserProfile profile, HttpSession session, BindingResult result, Model model) {
    	Long userId = (Long) session.getAttribute("user_id");
    	if (userId == null) {
    	    return "redirect:/";
    	} else {
    		userProfileService.postNewProfile(profile, result);
    		if (result.hasErrors()) {
    	    	return "/users/editUserProfile.jsp";
    	    } else {
    	    	UserProfile currentProfile = userProfileService.findUserProfile(id);
    	    	if (userId.equals(currentProfile.getUser().getId())) {
    	    		User currentUser = userService.findUser(userId);
        	    	profile.setUser(currentUser);
    	    		userProfileService.updateUserProfile(profile);
    	    		return "redirect:/users/profile";
    	    	} else {
    	    		return "redirect:/";    	    		
    	    	}
    	    }
    	}
    }
    
    
//    // display one found by id
//    @GetMapping("/users/{id}")
//    public String showOneuserById(@PathVariable("id") Long id, Model model) {
//        User userToShow = userService.findUser(id);
//        model.addAttribute("user", userToShow);
//        return "/users/show.jsp";
//    }

//    // update one found by id
//    @GetMapping("/users/{id}/edit")
//    public String edit(@PathVariable("id") Long id, Model model) {
//    	User userToShow = userService.findUser(id);
//    	model.addAttribute("user", userToShow);
//    	return "/users/edit.jsp";
//    }
//    @PutMapping("/users/{id}")
//    public String update(@Valid @ModelAttribute("user") User user, BindingResult result) {
//    	if (result.hasErrors()) {
//        	return "/users/edit.jsp";
//    	} else {
//		userService.updateUser(user);
//		return "redirect:/users";
//    	}
//    }

//    // delete one
//    @DeleteMapping("/users/{id}")
//    public String destroy(@PathVariable("id") Long id) {
//        userService.deleteUser(id);
//        return "redirect:/users";
//    }

}