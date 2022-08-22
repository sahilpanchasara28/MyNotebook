import React from "react";
import Notes from "../Notes/Notes";

export default function Home(props) {
 
  return (
    <>
    <Notes showAlert={props.showAlert} />
    </>
  );
}
