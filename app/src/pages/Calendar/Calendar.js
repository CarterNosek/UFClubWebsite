import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';

// Setups the localizer by providing the moment object
const localizer = momentLocalizer(moment)


// Convert 24-hour time to 12-hour format
const convertTo12HourFormat = (time) => {
  if (!time) return '';
  
  // Parse the 24-hour time
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const minute = minutes;
  
  // Determine AM/PM
  const ampm = hour >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  let AMPMHour = (hour % 12);

  if (AMPMHour < 10){
    AMPMHour = `0${AMPMHour}`;
  }
  const convertedHour = AMPMHour;
  
  // Return formatted time
  return `${convertedHour}:${minute} ${ampm}`;
};

//Defines the main calendar that takes a token to check for admin permissions
export default function EventCalendar({ token }) {
  //Updates the current event table
  const [events, setEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  //Currently selected event to be displayed by the UI
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  //Declares event table formatting
  const [newEventForm, setNewEventForm] = useState({
    event_name: '',
    month: '',
    day: '',
    year: '',
    location: '',
    person_of_contact: '',
    start_time: '',
    end_time: '',
    points_awarded: 0
  });

  //Declares update event table formatting
  const [updateEventForm, setUpdateEventForm] = useState({
    month: '',
    day: '',
    year: '',
    location: '',
    person_of_contact: '',
    start_time: '',
    end_time: '',
    points_awarded: 0
  });

  //Reads the Events table and converts to big-calendar event format
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/access_events');
      const data = await response.json();
      
      // Convert fetched events to react-big-calendar format with additional details
      const formattedEvents = data.map(events => ({
        ...events,
        title: events.event_name,
        start: new Date( moment(`${events.year}-${events.month}-${events.day} ${events.start_time}`).format('YYYY-MM-DDTHH:mm:ssZ')),
        end: new Date( moment(`${events.year}-${events.month}-${events.day} ${events.end_time}`).format('YYYY-MM-DDTHH:mm:ssZ'))
      }));


      setEvents(data);
      setCalendarEvents(formattedEvents);

      let event_names = "";
      events.forEach(event => {
        event_names += event.event_name + " ";
      });
      console.log("Successfully fetched events:", event_names);

    }
    catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  //Based on any changes to the data table fetches the events to be displayed
  useEffect(() => {
    fetchEvents();
  }, []);
    

  // Handle event click to show details
  const handleEventClick = (event) => {
   setSelectedEvent(event);
  };

  // Handles the close event form button function
  const handleCloseEventForm = () => {
    setSelectedEvent(null);
  };

  //Handles when the update button is pressed on selected event
  const handleSubmitUpdate = async () => {
    //Ensures an event is correctly selected
    if (!selectedEvent) return;

    //If no new input is given set to original description
    try {
      const response = await fetch('http://localhost:8080/update_event', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_name: selectedEvent.event_name,
          month: updateEventForm.month,
          day: updateEventForm.day,
          year: updateEventForm.year,
          location: updateEventForm.location,
          person_of_contact: updateEventForm.person_of_contact,
          start_time: updateEventForm.start_time,
          end_time: updateEventForm.end_time,
          points_awarded: updateEventForm.points_awarded,
        }) 
      });

      const result = await response.text();

      // Refresh events 
      fetchEvents();

      // Close the the event modifier menu
      setUpdateEventForm({month: "", day: "", year: "", location: "",
        person_of_contact: "", start_time: "", end_time: "", points_awarded: 0});
      setSelectedEvent(null);

      if (result === 'Event updated.') {
        console.log('Event successfully updated!');
      } else {
        console.log('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
    
  };

  // Handles the deletion of an event from button function
  const handleDeleteEvent =  async (e) => {
    if (!selectedEvent) return;

    try {
      const response = await fetch('http://localhost:8080/delete_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_name: selectedEvent.event_name,
          month: selectedEvent.month,
          day: selectedEvent.day,
          year: selectedEvent.year,
          start_time: selectedEvent.start_time,
          end_time: selectedEvent.end_time
        })
      });

      const result = await response.text();
      
      if (result === 'Event deleted.') {
        // Refresh events 
        fetchEvents();
        
        // Close the the event modifier menu
        setSelectedEvent(null);

        console.log('Event successfully deleted!');
      } else {
        console.log('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Submits new event to Database
  const handleFormEventSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/create_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEventForm)
      });

      const result = await response.text();
      
      if (result === 'Event added.') {
      //Refresh events on calendar
      fetchEvents();
      //Clear Event Form
      setNewEventForm({event_name: "", month: "", day: "", year: "", location: "",
        person_of_contact: "", start_time: "", end_time: "", points_awarded: 0});
      }
    }
    catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // changes event in the current event form
  const handleFormEventChange = (e) => {
    setNewEventForm({ ...newEventForm, [e.target.name]: e.target.value });
  };

  // changes event in the current update event form
  const handleUpdateFormChange = (e) => {
    setUpdateEventForm({ ...updateEventForm, [e.target.name]: e.target.value });
  };


  return(
  <div className="calendar-container">
    {/* Big calendar displaying portion */}
    <div className="calendar-part">
      <Calendar
      events={calendarEvents}
      localizer={localizer}
      views={['month', 'week', 'day']}
      style = {{height: 600, width: '100%'}}
      onSelectEvent={handleEventClick}
      />
    </div>

    {/* Side-bar selection event form data*/}
    {selectedEvent && (
      <div className="event-modification-details-form">
        <div className="event-form-content">
          <h2>Event: {selectedEvent.event_name}</h2>
          <button className="close-event-form-button" onClick={handleCloseEventForm}>×</button>

          <div className="event-details">
              <p><strong>Date:</strong> {selectedEvent.month}/{selectedEvent.day}/{selectedEvent.year}</p>
              <p><strong>Time:</strong> {convertTo12HourFormat(selectedEvent.start_time)} - {convertTo12HourFormat(selectedEvent.end_time)}</p>
              {selectedEvent.location && <p><strong>Location:</strong> {selectedEvent.location}</p>}
              {selectedEvent.person_of_contact && <p><strong>Contact:</strong> {selectedEvent.person_of_contact}</p>}
              {selectedEvent.points_awarded > 0 && <p><strong>Points:</strong> {selectedEvent.points_awarded}</p>}
          </div>
          {/*Grants admin permissions to delete the event from the data base with proper token*/}
          {token && (
          <><div className="event-update-form">
            <form onSubmit={handleSubmitUpdate}>
              <div>
                <label>Month (MM):</label>
                <input
                  type="number"
                  name="month"
                  min="1"
                  max="12"
                  value={updateEventForm.month}
                  onChange={handleUpdateFormChange}
                  required />
              </div>

              <div>
                <label>Day:</label>
                <input
                  type="number"
                  name="day"
                  min="1"
                  max="31"
                  value={updateEventForm.day}
                  onChange={handleUpdateFormChange}
                  required />
              </div>

              <div>
                <label>Year:</label>
                <input
                  type="number"
                  name="year"
                  value={updateEventForm.year}
                  onChange={handleUpdateFormChange}
                  required />
              </div>

              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={updateEventForm.location}
                  onChange={handleUpdateFormChange} />
              </div>

              <div>
                <label>Contact Person:</label>
                <input
                  type="text"
                  name="person_of_contact"
                  value={updateEventForm.person_of_contact}
                  onChange={handleUpdateFormChange} />
              </div>

              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  name="start_time"
                  value={updateEventForm.start_time}
                  onChange={handleUpdateFormChange}
                  required />
              </div>

              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  name="end_time"
                  value={updateEventForm.end_time}
                  onChange={handleUpdateFormChange}
                  required />
              </div>

              <div>
                <label>Points Awarded:</label>
                <input
                  type="number"
                  name="points_awarded"
                  value={updateEventForm.points_awarded}
                  onChange={handleUpdateFormChange} />
              </div>

              <button type="submit">Update Event</button>
            </form>
            </div>
            <button
              className="delete-event-button"
              onClick={handleDeleteEvent}
            >
              Delete Event
            </button>
          </>
        )}

          </div>
        </div>
      )}

      {/*Displays the event creation form*/}
      {token && (
          <div className="event-creation-form">
            <h2>Create New Event</h2>
            <form onSubmit={handleFormEventSubmit}>
              <div>
                <label>Event Name:</label>
                <input
                  type="text"
                  name="event_name"
                  value={newEventForm.event_name}
                  onChange={handleFormEventChange}
                  required
                />
              </div>

              <div>
                <label>Month (MM):</label>
                <input
                  type="number"
                  name="month"
                  min="1"
                  max="12"
                  value={newEventForm.month}
                  onChange={handleFormEventChange}
                  required
                />
              </div>

              <div>
                <label>Day:</label>
                <input
                  type="number"
                  name="day"
                  min="1"
                  max="31"
                  value={newEventForm.day}
                  onChange={handleFormEventChange}
                  required
                />
              </div>

              <div>
                <label>Year:</label>
                <input
                  type="number"
                  name="year"
                  value={newEventForm.year}
                  onChange={handleFormEventChange}
                  required
                />
              </div>

              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={newEventForm.location}
                  onChange={handleFormEventChange}
                />
              </div>

              <div>
                <label>Contact Person:</label>
                <input
                  type="text"
                  name="person_of_contact"
                  value={newEventForm.person_of_contact}
                  onChange={handleFormEventChange}
                />
              </div>

              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  name="start_time"
                  value={newEventForm.start_time}
                  onChange={handleFormEventChange}
                  required
                />
              </div>

              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  name="end_time"
                  value={newEventForm.end_time}
                  onChange={handleFormEventChange}
                  required
                />
              </div>

              <div>
                <label>Points Awarded:</label>
                <input
                  type="number"
                  name="points_awarded"
                  value={newEventForm.points_awarded}
                  onChange={handleFormEventChange}
                />
              </div>
              <button type="submit">Create Event</button>
          </form>
        </div>
      )}

  </div>
  )
};     
  