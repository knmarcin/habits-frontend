import { useState, useEffect } from "react";
import useToken from "../../auth/useToken";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [effect, setEffect] = useState(1);
  const { token } = useToken();

  const [postData, setPostData] = useState({
    habit: 1,
    accomplished: "2023-12-22",
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/count/${postData.habit}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...postData,
      }),
    }).then((response) => {
      if (response.ok) setEffect((effect) => effect + 1);
    });
  }, [postData, token]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/habits", {
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

  return (
    <>
      <h1>hello</h1>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h1>
              {item.name}
              <button
                value={item.id}
                onClick={(e) => {
                  setPostData({ ...postData, habit: item.id });
                }}
              >
                {item.count}
              </button>
            </h1>
          </div>
        );
      })}
    </>
  );
};

export default Dashboard;
