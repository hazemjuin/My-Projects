package com.hazem.javaproject.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.hazem.javaproject.models.Event;
import com.hazem.javaproject.models.LoginUser;
import com.hazem.javaproject.models.User;
import com.hazem.javaproject.services.EventService;
import com.hazem.javaproject.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
public class EventController {
	// -----------------------variables-----------------------
	@Autowired
	private EventService eventService;

	@Autowired
	private UserService userService;

	// show all no login required
	@GetMapping("/events")
	public String index(HttpSession session, Model model) {
		Long userId = (Long) session.getAttribute("user_id");
		if (userId == null) {
			model.addAttribute("newUser", new User());
			model.addAttribute("newLogin", new LoginUser());
			return "/events/events.jsp";
		} else {
			User currentUser = userService.findUser(userId);
			List<Event> events = eventService.allEvents();
			model.addAttribute("events", events);
			model.addAttribute("user", currentUser);
			model.addAttribute("newUser", new User());
			model.addAttribute("newLogin", new LoginUser());
			return "/events/events.jsp";
		}
	}

	// create
//    @GetMapping("/events/new")
//    public String newEvent(@ModelAttribute("event") Event event, HttpSession session) {
//        Long userId = (Long) session.getAttribute("user_id");
//    	if (userId == null) {
//    	    return "redirect:/";
//    	} else {
//            return "/events/newEvent.jsp";
//    	}
//    }
	@PostMapping("/events/new")
	public String create(@Valid @ModelAttribute("newEvent") Event newEvent, BindingResult result, HttpSession session,
			Model model) {
		Long userId = (Long) session.getAttribute("user_id");
		if (userId == null) {
			return "redirect:/";
		} else {
			eventService.postNew(newEvent, result);
			if (result.hasErrors()) {
//    	    	System.out.println(result);
				User currentUser = userService.findUser(userId);
				List<Event> events = eventService.allEvents();
				model.addAttribute("user", currentUser);
				model.addAttribute("events", events);
				return "/dashboard.jsp";
			} else {
				User currentUser = userService.findUser(userId);
				newEvent.setPoster(currentUser);
				Event savedEvent = eventService.createEvent(newEvent);
				model.addAttribute("event", savedEvent);
				return "/events/imageUpload.jsp";
			}
		}
	}

	// upload an image
	@GetMapping("/events/{id}/image")
	public String adImage(@PathVariable("id") Long id, HttpSession session, Model model) {
		Long userId = (Long) session.getAttribute("user_id");
		if (userId == null) {
			return "redirect:/";
		} else {
			Event currentEvent = eventService.findEvent(id);
			if (userId.equals(currentEvent.getPoster().getId())) {
				model.addAttribute("event", currentEvent);
				return "/events/imageUpload.jsp";
			} else {
				return "redirect:/dashboard";
			}
		}
	}

	@PutMapping("/events/{id}/image")
	public String upload(@PathVariable("id") Long id, HttpSession session,
			@RequestParam("imageURL") MultipartFile multipartFile) throws IOException {
		Long userId = (Long) session.getAttribute("user_id");
		if (userId == null) {
			return "redirect:/";
		} else {
			Event currentEvent = eventService.findEvent(id);
			String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
			if (fileName != null) {
				String imageURL = "/uploads/" + fileName;
				currentEvent.setImageURL(imageURL);
				eventService.updateEvent(currentEvent);

				String uploadDir = "./uploads";
				Path uploadPath = Paths.get(uploadDir);
				if (!Files.exists(uploadPath)) {
					Files.createDirectories(uploadPath);
				}

				try (InputStream inputStream = multipartFile.getInputStream()) {
					// construct file path
					Path filePath = uploadPath.resolve(fileName);
					Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
				} catch (IOException e) {
					throw new IOException("Could not save uploaded file: " + fileName);
				}
			}
		}

		return "redirect:/dashboard";
	}

	// display one found by id
	@GetMapping("/events/{id}")
	public String showOneeventById(@PathVariable("id") Long id, HttpSession session, Model model) {
		Long userId = (Long) session.getAttribute("user_id");
		Event eventToShow = eventService.findEvent(id);
		model.addAttribute("event", eventToShow);
		if (userId == null) {
			System.out.println("no user");
			return "/events/showEvent.jsp;";
		} else {
			System.out.println("with user");
			User currentUser = userService.findUser(userId);
			model.addAttribute("user", currentUser);
			System.out.println(eventToShow);
			return "/events/showEvent.jsp";
		}
	}

	// update one found by id
	@GetMapping("/events/{id}/edit")
	public String edit(@PathVariable("id") Long id, HttpSession session, Model model) {
		Long userId = (Long) session.getAttribute("user_id");
		if (userId == null) {
			return "redirect:/";
		} else {
			Event eventToShow = eventService.findEvent(id);
			if (userId.equals(eventToShow.getPoster().getId())) {
				model.addAttribute("event", eventToShow);
				return "/events/updateEvent.jsp";
			} else {
				return "redirect:/events";
			}
		}
	}

	@PutMapping("/events/{id}/edit")
	public String update(@PathVariable("id") Long id, @Valid @ModelAttribute("event") Event event, BindingResult result,
			HttpSession session) {
		Long userId = (Long) session.getAttribute("user_id");
		if (userId == null) {
			return "redirect:/";
		} else {
			eventService.postNew(event, result);
			if (result.hasErrors()) {
				return "/events/edit.jsp";
			} else {
				Event eventToEdit = eventService.findEvent(id);
				if (userId.equals(eventToEdit.getPoster().getId())) {
					eventService.updateEvent(event);
					return "redirect:/events";
				} else {
					return "redirect:/home";
				}
			}
		}
	}

	// delete one
	@DeleteMapping("/events/{id}")
	public String destroy(@PathVariable("id") Long id, HttpSession session) {
		Long userId = (Long) session.getAttribute("user_id");
		if (userId == null) {
			return "redirect:/";
		} else {
			Event eventToDelete = eventService.findEvent(id);
			if (userId.equals(eventToDelete.getPoster().getId())) {
				eventService.deleteEvent(id);
				return "redirect:/events";
			} else {
				return "redirect:/home";
			}
		}
	}
}