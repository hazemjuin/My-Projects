package com.hazem.javaproject.models;


import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="categories")
public class Category {
    // -------------------variables-------------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Category name can not be empty or blanked.")
    @Size(min=3, max=50, message="Category names should be between 3 and 50 characters long.")
    private String name;

    // For a many to one relationship
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "<name>_id")
    // private User <name>;

    // For a many to many relationship
    @ManyToMany
    @JoinTable(
        name = "eventCategories",
        joinColumns = @JoinColumn(name = "category_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Event> events;

    @ManyToMany
    @JoinTable(
    	name = "user_interests",
    	joinColumns = @JoinColumn(name = "category_id"),
    	inverseJoinColumns = @JoinColumn(name = "userProfile_id")
   	)
    private List<UserProfile> profiles;

    @Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;

    // -------------------constructors (include an empty one)-------------------
    public Category() {}

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

    // -------------------getters & setters-------------------
    public Long getId() {
    	return id;
    }
    public void setId(Long id) {
    	this.id = id;
    }
    
    public String getName() {
    	return name;
    }
    public void setName(String name) {
    	this.name = name;
    }
    
    public List<Event> getEvents() {
    	return events;
    }
    public void setEvents(List<Event> events) {
    	this.events = events;
    }
    
//    public List<UserProfile> getProfiles() {
//		return profiles;
//	}
//	public void setProfiles(List<UserProfile> profiles) {
//		this.profiles = profiles;
//	}

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