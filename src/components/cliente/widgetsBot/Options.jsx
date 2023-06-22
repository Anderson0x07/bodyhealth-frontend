const Options = (props) => {

  return (
    <div className="options">
      <h1 style={{
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "black",

      }}
      >{props.title}</h1>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }} >
        {props.options.map((option) => {
          return (
            <div
              style={{
                padding: "8px 15px",
                border: "1px solid #2898ec",
                borderRadius: "25px",
                color: "#1f91e7",
                fontSize: "0.9rem",
                margin: "3px",
                boxShadow: "inset 0px 0px 0px #2273c4",
                cursor: "pointer",
                width: "300px"

              }}
              onClick={option.handler}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;
