import { useState, useEffect } from "react";
import useToken from "../../auth/useToken";
import AddHabitButton from "./AddHabitButton";
import Button from "react-bootstrap/Button";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState([]);
  const [effect, setEffect] = useState(1);

  const { token } = useToken();

  const [postData, setPostData] = useState({
    habit: -1,
    accomplished: "2023-12-22",
  });

  const elements = [0, 1, 2, 3, 4, 5, 6];
  const date = new Date();

  useEffect(() => {
    if (postData.habit === -1) return;
    fetch(`http://127.0.0.1:8000/count/${postData.habit}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...postData,
      }),
    }).then((response) => {
      if (response.ok) {
        setEffect((effect) => effect + 1);
        setPostData({ ...postData, habit: -1 });
      }
    });
  }, [postData, token]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/habits/", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          document.location.href = "/logout";
        }
        return response.json();
      })
      .then((res) => {
        setData(res);
      });
  }, [token, effect]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/count/", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          document.location.href = "/logout";
        }
        return response.json();
      })
      .then((res) => {
        setDays(res);
      });
  }, [token, effect]);

  return (
    <>
      <h1>Your Last 7 Days </h1>

      {data.map((item) => {
        return (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <b>{item.name}</b>
            <Button
              variant="danger"
              onClick={(e) => {
                fetch(`http://127.0.0.1:8000/habits/${item.id}/`, {
                  method: "DELETE",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                }).then((response) => {
                  if (response.ok) {
                    setEffect((effect) => effect + 1);
                  }
                });
              }}
            >
              Delete
            </Button>
            {elements.map((index) => {
              var nextDay = new Date(date - index * 86400000);
              var filtered_days = days
                .filter(
                  (x) =>
                    x.accomplished ===
                    `${nextDay.getFullYear()}-${
                      nextDay.getMonth() + 1
                    }-${nextDay.getDate()}`
                )
                .filter((x) => x.habit === item.id).length;

              return (
                <div>
                  {`${nextDay.getFullYear()}-${
                    nextDay.getMonth() + 1
                  }-${nextDay.getDate()}`}
                  <button
                    value={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setPostData({
                        ...postData,
                        habit: item.id,
                        accomplished: `${nextDay.getFullYear()}-${
                          nextDay.getMonth() + 1
                        }-${nextDay.getDate()}`,
                      });
                    }}
                  >
                    {filtered_days === 0 ? <>Complete</> : <>Uncomplete</>}{" "}
                  </button>
                </div>
              );
            })}
            Total: <b>{item.count}</b>
          </div>
        );
      })}
      <AddHabitButton />
    </>
  );
};

export default Dashboard;
