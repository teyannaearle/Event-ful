import React from 'react'

function Form({myEvent, handleTextChange, handleSubmit}) {
    return (
        <form className="eventform-container" onSubmit={handleSubmit}>
        <label htmlFor="event_name">Event Name</label>
        <input
          className="three-d pg-input"
          id="event_name"
          type="text"
          value={myEvent.name}
          placeholder="Name your Event"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="event_budget">Event Budget</label>
        <input
          className="three-d pg-input"
          id="event_budget"
          type="number"
          value={myEvent.budget}
          placeholder="Set your Budget"
          onChange={handleTextChange}
          min={1}
          required
        />
        <label htmlFor="event_time">Event Time</label>
        <input
          className="three-d pg-input"
          id="event_time"
          type="time"
          value={myEvent.time}
          placeholder="Enter Event Time"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="event_date">Event Date</label>
        <input
          className="three-d pg-input"
          id="event_date"
          type="date"
          value={myEvent.date}
          placeholder="Enter Event Date"
          onChange={handleTextChange}
          required
        />
        <button className="pg-buttons" type="submit" id="next"> 
          Next &#187;
        </button>
      </form>
    )
}

export default Form
