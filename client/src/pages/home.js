import { useState } from "react";
import Axios from "axios";

export const Home = (props) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post();

    setTask("");
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <>
      <h1>to-do-list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={handleChange}
        />
        <input type="submit" value="addTask" />
      </form>
    </>
  );
};
