import { useState, useEffect } from "react";
import Axios from "axios";
import { Item } from "../component/task";

export const Home = (props) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get("http://localhost:8080/api/task/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        props.modifyList(res.data.tasks);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }
    try {
      await Axios.post(
        "http://localhost:8080/api/task/",
        {
          name: task.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const res = await Axios.get("http://localhost:8080/api/task/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      props.modifyList(res.data.tasks);

      setTask("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleLogout = () => {
    props.handleAuth(false);
    localStorage.clear();
  };

  const deleteItem = async (_id) => {
    console.log("indelete");
    try {
      await Axios.delete(`http://localhost:8080/api/task/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const res = await Axios.get("http://localhost:8080/api/task/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      props.modifyList(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (_id) => {
    console.log("in updateitem");
    await Axios.patch(
      `http://localhost:8080/api/task/${_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const res = await Axios.get("http://localhost:8080/api/task/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res.data.tasks);
    props.modifyList(res.data.tasks);
  };

  return (
    <>
      <div className="mainContainer">
        <div className="navbarContainer">
          <h1>to-do-list</h1>
          <button onClick={handleLogout}>logout</button>
        </div>
        <div className="bodyContainer">
          <form onSubmit={handleSubmit}>
            <div className="inputBar">
              <div>
                <input
                  type="text"
                  name="task"
                  id="task"
                  value={task}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input type="submit" value="addTask" />
              </div>
            </div>
          </form>
          <div className="list">
            {props.list.map((list, index) => {
              return (
                <Item
                  _id={list._id}
                  name={list.name}
                  done={list.done}
                  deleteItem={() => deleteItem(list._id)}
                  updateItem={() => updateItem(list._id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
