import { useState, useEffect } from "react";
import axios from "axios";

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
      Promise.resolve(axios.get("api/days")),
      Promise.resolve(axios.get("api/appointments")),
      Promise.resolve(axios.get("api/interviewers"))
    ]).then(all => {
      console.log(all);
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

    const updateSpots = state.days.forEach(day => {
    if (day.name === state.day) {
    day.spots--;
  }
  return day;
});

    return axios.put(`api/appointments/${id}`, appointment).then(() =>
      setState({
        ...state,
        appointments
      })
    );
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

    const updateSpots = state.days.forEach(day => {
      if (day.name === state.day) {
      day.spots--;
    }
    return day;
  });

    return axios.delete(`api/appointments/${id}`, appointment).then(() =>
      setState({
        ...state,
        appointments
      })
    );
  }
  console.log(state.interviewers);
  return { cancelInterview, bookInterview, state, setDay };
}
