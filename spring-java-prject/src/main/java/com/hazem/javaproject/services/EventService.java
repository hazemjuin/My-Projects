package com.hazem.javaproject.services;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.hazem.javaproject.models.Event;
import com.hazem.javaproject.repositories.EventRepository;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    
    // shows all
    public List<Event> allEvents() {
        return eventRepository.findAll();
    }
    
    // validate ancillary fields
    public Event postNew(Event event, BindingResult result) {
    	if (event.getNeeded() != null) {
    		if (event.getNeeded() < 0) {
    			result.rejectValue("needed", "Positive", "Volunteers needed can not be negative.");
    		}
    	}
    	System.out.println(":" + event.getAddress());
    	if (event.getAddress() != "") {
    		if (event.getAddress().length() < 10 || event.getAddress().length() > 128) {
    			result.rejectValue("address", "Length", "Address should be between 10 and 128 characters long.");
    		}
    	}
    	System.out.println(":" + event.getAddress2());
    	if (event.getAddress2() != "") {
    		if (event.getAddress2().length() < 5 || event.getAddress2().length() > 50) {
    			result.rejectValue("address2", "Length", "Address should be between 5 and 50 characters long.");
    		}
    	}
//    	if (event.getCity() != "") {
//    		if (event.getCity().length() < 3 || event.getCity().length() > 128) {
//    			result.rejectValue("city", "Length", "City should be between 3 and 128 characters long.");
//    		}
//    	}
//    	if (event.getState() != "") {
//    		if (event.getState().length() < 2 || event.getState().length() > 12) {
//    			result.rejectValue("state", "Length", "State should be between 2 and 12 characters long.");
//    		}
//    	}
    	System.out.println(":" + event.getContactEmail());
    	if (event.getContactEmail() != "") {
    		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+
                    "[a-zA-Z0-9_+&*-]+)*@" +
                    "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                    "A-Z]{2,7}$";          
    		Pattern pat = Pattern.compile(emailRegex);
    		if (!pat.matcher(":" + event.getContactEmail()).matches()) {
    			result.rejectValue("contactEmail", "Pattern", "Please enter a valid email.");
    		}
    	}
    	System.out.println(":" + event.getContactTwitter());
    	if (event.getContactTwitter() != "") {
    		if (event.getContactTwitter().length() < 3 || event.getContactTwitter().length() > 15) {
    			result.rejectValue("contactTwitter", "Length", "Please enter a valid Twitter handle.");
    		}
    	}
    	System.out.println(":" + event.getContactFacebook());
    	if (event.getContactFacebook() != "") {
    		if (event.getContactFacebook().length() < 5) {
    			result.rejectValue("contactFacebook", "Length", "Please enter a valid Facebook username.");
    		}
    	}
    	if (event.getContactInstagram() != "") {
    		if (event.getContactInstagram().length() < 3 || event.getContactInstagram().length() > 30) {
    			result.rejectValue("contactInstagram", "Length", "Please enter a valid Instagram handle.");
    		}
    	}
    	if (result.hasErrors()) {
			return null;
		} else {
			return event;
		}
    }

    // creates one
    public Event createEvent(Event e) {
        return eventRepository.save(e);
    }

    // retrieves one by id
    public Event findEvent(Long id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if(optionalEvent.isPresent()) {
            return optionalEvent.get();
        } else {
            return null;
        }
    }

    // updates one
    public Event updateEvent(Event e) {
       	return eventRepository.save(e);
    }
    
    // deletes one
    public void deleteEvent(Long id) {
    	eventRepository.deleteById(id);
    }
}
