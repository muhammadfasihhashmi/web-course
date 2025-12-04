import { Trash2 } from "lucide-react";

function PackingList({
  records,
  handleDelete,
  handlePackedStatus,
  handleClear,
}) {
  return (
    <div className="list-container">
      {records.map((record) => (
        <div className="list" key={record.id}>
          <div className="list-item">
            <input
              type="checkbox"
              className="checkbox"
              onChange={() => handlePackedStatus(record.id)}
            />
            <div className={`item-text ${record.isPacked ? "packed" : ""}`}>
              {record.quantity}
              {record.item}
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(record.id)}
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
      <button className="clear-button" onClick={handleClear}>
        clear
      </button>
    </div>
  );
}

export default PackingList;
