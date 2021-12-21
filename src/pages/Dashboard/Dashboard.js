import { useState, useEffect } from "react";
import useToken from "../../auth/useToken";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { token } = useToken();
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
        console.log(res);
      });
  }, [token]);

  return (
    <>
      <h1>hello</h1>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h1>
              {item.name} {item.created_at} {item.count} {item.owner}
            </h1>
          </div>
        );
      })}
    </>
  );
};

export default Dashboard;
