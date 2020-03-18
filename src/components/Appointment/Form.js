import React, { useState } from "react";
import Button from "components/Button.js"
import InterviewerList from "components/InterviewerList.js";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null); // when user clicks save it clears form values
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function save() {
    reset();
    props.onSave(interviewer, name);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off"
    onSubmit={(event) => event.preventDefault()}>
      
      <input
        className="appointment__create-input text--semi-bold"
        name={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={event => setName(event.target.value)}
      />
    </form>

        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          setInterviewer={setInterviewer}
        />
          </section>
          <section className="appointment__card-right">
            <section className="appointment__actions">

              <Button danger onClick={cancel}>Cancel</Button>
              <Button confirm onClick={save}>Save</Button>

            </section>
          </section>
    </main>
  );
}