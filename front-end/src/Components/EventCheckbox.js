import React from 'react'

export default function EventCheckbox() {
    return (
        <section className="NewEvent">
      <form onSubmit={handleSubmit}>
        <label>
          DJ
          <input
            value="djs"
            type="checkbox"
            checked={eventForm.djs}
            onChange={toggleState}
          />
        </label>
        <label>
          Musician
          <input
            value="musicians"
            type="checkbox"
            checked={eventForm.musicians}
            onChange={toggleState}
          />
        </label>
        <label>
          Photographer
          <input
            value="photographers"
            type="checkbox"
            checked={eventForm.photographers}
            onChange={toggleState}
          />
        </label>
        <label>
          Party Rental
          <input
            value="party_rental"
            type="checkbox"
            checked={eventForm.party_rental}
            onChange={toggleState}
          />
        </label>
        <label>
          Videographer
          <input
            value="videographers"
            type="checkbox"
            checked={eventForm.videographers}
            onChange={toggleState}
          />
        </label>
        <label>
          Venues
          <input
            value="venues"
            type="checkbox"
            checked={eventForm.venues}
            onChange={toggleState}
          />
        </label>
        <label>
          Balloon Services
          <input
            value="balloons"
            type="checkbox"
            checked={eventForm.balloons}
            onChange={toggleState}
          />
        </label>
        <label>
          Floral Designer
          <input
            value="floral"
            type="checkbox"
            checked={eventForm.floral}
            onChange={toggleState}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
    )
}
