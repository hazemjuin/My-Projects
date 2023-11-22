package com.hazem.javaproject.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.hazem.javaproject.models.UserProfile;
import com.hazem.javaproject.repositories.UserProfileRepository;

@Service
public class UserProfileService {
    @Autowired
    private UserProfileRepository userProfileRepository;
    
    // shows all
    public List<UserProfile> allUserProfiles() {
        return userProfileRepository.findAll();
    }
    
    // validate user profile
    public UserProfile postNewProfile(UserProfile profile, BindingResult result) {
    	if (profile.getUserCity() != "") {
    		if (profile.getUserCity().length() < 3 || profile.getUserCity().length() > 128) {
    			result.rejectValue("userCity", "Length", "City should be between 3 and 128 characters long.");
    		}
    	}
    	if (profile.getUserState() != "") {
    		if (profile.getUserState().length() < 2 || profile.getUserState().length() > 12) {
    			result.rejectValue("userState", "Length", "State should be between 2 and 12 characters long.");
    		}
    	}
    	if (profile.getUserZipCode() != "") {
    		if (profile.getUserZipCode().length() < 5 || profile.getUserZipCode().length() > 10) {
    			result.rejectValue("userZipCode", "Length", "Zip Code should be between 5 and 10 characters long.");
    		}
    	}
    	if (profile.getUserTwitter() != "") {
    		if (profile.getUserTwitter().length() < 3 || profile.getUserTwitter().length() > 15) {
    			result.rejectValue("userTwitter", "Length", "Please enter a valid Twitter handle.");
    		}
    	}
    	if (profile.getUserFacebook() != "") {
    		if (profile.getUserFacebook().length() < 5) {
    			result.rejectValue("userFacebook", "Length", "Please enter a valid Facebook username.");
    		}
    	}
    	if (profile.getUserInstagram() != "") {
    		if (profile.getUserInstagram().length() < 3 || profile.getUserInstagram().length() > 30) {
    			result.rejectValue("userInstagram", "Length", "Please enter a valid Instagram handle.");
    		}
    	}
    	if (result.hasErrors()) {
			return null;
		} else {
			return profile;
		}
    }

    // creates one
    public UserProfile createUserProfile(UserProfile e) {
        return userProfileRepository.save(e);
    }

    // retrieves one by id
    public UserProfile findUserProfile(Long id) {
        Optional<UserProfile> optionalUserProfile = userProfileRepository.findById(id);
        if(optionalUserProfile.isPresent()) {
            return optionalUserProfile.get();
        } else {
            return null;
        }
    }

    // updates one
    public UserProfile updateUserProfile(UserProfile e) {
       	return userProfileRepository.save(e);
    }
    
    // deletes one
    public void deleteUserProfile(Long id) {
    	userProfileRepository.deleteById(id);
    }
}