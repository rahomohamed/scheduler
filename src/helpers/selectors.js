export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  state.days.forEach(element => {
    console.log(state.days);
    if (element.name === day) {
      element.appointments.forEach(id => {
        filteredAppointments.push(state.appointments[id]);
      });
    }
  });
  return filteredAppointments;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
  }
}

export function getInterviewersForDay(state, day) {
  const filteredAppointments = [];
  state.days.forEach(element => {
    if (element.name === day) {
      element.interviewers.forEach(id => {
        filteredAppointments.push(state.interviewers[id]);
      });
    }
  });
  return filteredAppointments;
}