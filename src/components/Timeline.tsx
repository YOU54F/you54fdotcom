import React, { useRef } from "react";
import ReactLifeTimeline from "react-life-timeline";
import styled from "styled-components";

const Experience = () => {
  const EVENTS = EXP.event;
  const generate_block = (color: string) => {
    return (
      <div
        style={{
          width: "15px",
          height: "15px",
          background: color,
          marginTop: "10px",
          display: window.innerWidth < 767 ? "" : "inline-block",
          marginRight: "10px",
        }}
      ></div>
    );
  };

  return (
    <ReactLifeTimeline
      subject_name="John"
      birthday={new Date("2017-01-01")}
      events={EVENTS}
    />
  );
};

export default Experience;

export interface ExperienceSection {
  header: string;
  event: ExpEvent[];
}

export interface ExpEvent {
  date_start: Date;
  date_end: Date;
  title: string;
  color: string;
}

export const EXP: ExperienceSection = {
  header: "Experience",
  event: [
    {
      date_start: new Date("2014/09/01"),
      date_end: new Date("2015/04/30"),
      title: "University of Toronto: Learning the basic with python",
      color: "#98dbc6",
    },
    {
      date_start: new Date("2019/08/19"),
      date_end: new Date(),
      title: "Working at Ventmere Inc.",
      color: "#caf1de",
    },
  ],
};

const StyledExperience = styled.div`
  #Experience {
    background: #1e2023;
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding-top: 100px;
    padding-bottom: 100px;
    padding-left: 2%;
  }

  #lifetime_header {
    text-align: center;
    text-transform: uppercase;
  }

  #lifetime_header h1 {
    font-family: "Yantramanav", sans-serif;
    letter-spacing: 15px;
  }

  .LifeTimeline {
    display: block;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 50px;
  }

  .LifeTimeline > .week {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 2px;
    padding: 0;
    opacity: 0.5;
    background: #555;
    transition: 0.4s linear opacity;
    position: relative;
  }

  .LifeTimeline > .week.future {
    opacity: 0.2;
  }

  .LifeTimeline > .week > .singleEvents {
    left: 4px;
    top: 4px;
    border-radius: 3.5px;
    width: 7px;
    height: 7px;
    background: #303030;
    position: absolute;
  }

  .LifeTimeline > .week:hover {
    opacity: 1;
  }

  #indicators {
    padding-left: 10.17%;
    padding-top: 50px;
  }

  @media screen and (max-width: 767px) {
  }
`;
