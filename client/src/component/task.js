export const Item = (props) => {
  return (
    <>
      <div className={props.done ? "itemContainer green" : "red itemContainer"}>
        <div>{props.name}</div>
        <div style={{ display: "flex" }}>
          <button onClick={props.updateItem}>
            {props.done ? "mark as unfinished" : "mark as finished"}
          </button>

          {props.done ? (
            <button onClick={props.deleteItem}>delete</button>
          ) : (
            <button onClick={props.deleteItem} disabled>
              delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};
