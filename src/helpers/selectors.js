export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(id => {
        filteredAppointments.push(state.appointments[id]);
      });
    }
  });
  return filteredAppointments;
}

export function getInterview (state, interview) {
  
}