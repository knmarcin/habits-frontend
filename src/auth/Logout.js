const Logout = () => {
  return (
    <div style={{ visibility: "hidden" }}>
      {localStorage.removeItem("token")}
      {(window.location.href = "/login")}
    </div>
  );
};

export default Logout;
