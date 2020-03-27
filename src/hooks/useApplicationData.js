import { useState, useEffect } from "react";
import axios from "axios";

// function used to update spots
const getSpotsForDay = (day, appointments) =>
  day.appointments.length -
  day.appointments.reduce(
    (count, id) => (appointments[id].interview ? count + 1 : count),
    0);

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   // spots decreases by one once an appointment is added
      const days = state.days.map(day => {
        if (day.appointments.includes(id)) {
      return {...day, spots: getSpotsForDay(day, appointments)}
      }
      return day;
    });

    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   // spots increases by one once an appointment is deleted
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
    return {...day, spots: getSpotsForDay(day, appointments)}
    }
    return day;
  });

    return axios.delete(`api/appointments/${id}`, appointment).then(() =>
      setState({
        ...state,
        appointments,
        days
      })
    );
  }
  return { cancelInterview, bookInterview, state, setDay };
}
