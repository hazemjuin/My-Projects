package com.hazem.javaproject.models;


import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name="user_profiles")
public class UserProfile {
	// -------------------variables-------------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	private String userCity;
	
	private String userState;
	
	private String userZipCode; // to accommodate five-four
	
	private String userPhone; // using type="tel" and pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
	
	private String userTwitter;
	
	private String userFacebook;
	
	private String userInstagram;
	 
//	there is no way to share a link, only QR code or via their phone app directly.
//	@Min(value=10, message="Please provide your Whatsapp number.")
//	private int userWhatsApp;
    
    @Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;

    // One-To-One with User
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
    
    // For a many to many relationship with Category
    @ManyToMany
    @JoinTable(
    	name = "user_interests",
    	joinColumns = @JoinColumn(name = "userProfile_id"),
    	inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> userInterests;
    
    // -------------------constructors (include an empty one)-------------------
    public UserProfile() {}

    // -------------------methods-------------------
    // These tie to the mandatory variables above:
    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getUserCity() {
		return userCity;
	}
	public void setUserCity(String userCity) {
		this.userCity = userCity;
	}

	public String getUserState() {
		return userState;
	}
	public void setUserState(String userState) {
		this.userState = userState;
	}

	public String getUserZipCode() {
		return userZipCode;
	}
	public void setUserZipCode(String userZipCode) {
		this.userZipCode = userZipCode;
	}

	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public String getUserTwitter() {
		return userTwitter;
	}
	public void setUserTwitter(String userTwitter) {
		this.userTwitter = userTwitter;
	}

	public String getUserFacebook() {
		return userFacebook;
	}
	public void setUserFacebook(String userFacebook) {
		this.userFacebook = userFacebook;
	}

	public String getUserInstagram() {
		return userInstagram;
	}
	public void setUserInstagram(String userInstagram) {
		this.userInstagram = userInstagram;
	}

//	public int getUserWhatsApp() {
//		return userWhatsApp;
//	}
//	public void setUserWhatsApp(int userWhatsApp) {
//		this.userWhatsApp = userWhatsApp;
//	}
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public List<Category> getUserInterests() {
		return userInterests;
	}

	public void setUserInterests(List<Category> userInterests) {
		this.userInterests = userInterests;
	}

	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}