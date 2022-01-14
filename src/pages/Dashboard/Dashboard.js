import { useState, useEffect } from "react";
import useToken from "../../auth/useToken";
import AddHabitButton from "./AddHabitButton";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState([]);
  const [effect, setEffect] = useState(1);

  const { token } = useToken();

  const [postData, setPostData] = useState({
    habit: -1,
    accomplished: "2023-12-22",
  });

  const elements = [6, 5, 4, 3, 2, 1, 0];
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
    <Container>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Your Last 7 Days{" "}
      </h1>
      <div
        style={{ marginBottom: "40px", marginLeft: "15px", textAlign: "right" }}
      >
        <AddHabitButton />
      </div>
      <table>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <thead>
                <div
                  style={{
                    display: "inline-block",
                  }}
                >
                  <tr>
                    <td style={{ width: "100px", textAlign: "center" }}>
                      {item.name}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>
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
                    </td>
                  </tr>
                </div>
                {elements.map((index) => {
                  var nextDay = new Date(date - index * 86400000);

                  var filtered_days = days
                    .filter((x) => {
                      if (nextDay.getDate() < 10 && nextDay.getMonth() < 10) {
                        return (
                          x.accomplished ===
                          `${nextDay.getFullYear()}-0${
                            nextDay.getMonth() + 1
                          }-0${nextDay.getDate()}`
                        );
                      } else if (nextDay.getDate() < 10) {
                        return (
                          x.accomplished ===
                          `${nextDay.getFullYear()}-${
                            nextDay.getMonth() + 1
                          }-0${nextDay.getDate()}`
                        );
                      } else if (nextDay.getMonth() < 10) {
                        return (
                          x.accomplished ===
                          `${nextDay.getFullYear()}-0${
                            nextDay.getMonth() + 1
                          }-${nextDay.getDate()}`
                        );
                      } else {
                        return (
                          x.accomplished ===
                          `${nextDay.getFullYear()}-${
                            nextDay.getMonth() + 1
                          }-0${nextDay.getDate()}`
                        );
                      }
                    })
                    .filter((x) => x.habit === item.id).length;

                  return (
                    <div
                      key={index.id}
                      style={{
                        display: "inline-block",
                      }}
                    >
                      <tr>
                        <td>{`${nextDay.getDate()}`}</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {filtered_days === 0 ? (
                            <>
                              <Button
                                style={{ width: "50px" }}
                                value={item.id}
                                variant="secondary"
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
                                &#9587;
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                style={{ width: "50px" }}
                                variant="success"
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
                                &#10003;
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    </div>
                  );
                })}

                <div
                  style={{
                    display: "inline-block",
                  }}
                ></div>
              </thead>
            </div>
          );
        })}
      </table>
    </Container>
  );
};

export default Dashboard;
