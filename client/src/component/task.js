export const Item = (props) => {
  return (
    <>
      <div className={props.done ? "green" : "red"}>{props.name}</div>

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
    </>
  );
};
