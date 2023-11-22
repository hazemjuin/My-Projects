package com.hazem.javaproject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hazem.javaproject.models.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    // this method retrieves all from the database
    List<Event> findAll();

//    List<Event> findAllByStartAsc();
    
}