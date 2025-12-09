import { Trash2 } from "lucide-react";
import { useState } from "react";

function PackingList({
  records,
  handleDelete,
  handlePackedStatus,
  handleClear,
}) {
  const [sortBy, setSortBy] = useState("default");
  let sortedRecords;

  if (sortBy === "default") {
    sortedRecords = records;
  }
  if (sortBy === "description") {
    sortedRecords = records
      .slice()
      .sort((a, b) => a.item.localeCompare(b.item));
  }
  if (sortBy === "packed") {
    sortedRecords = records
      .slice()
      .sort((a, b) => Number(a.isPacked) - Number(b.isPacked));
  }
  return (
    <div className="list-container">
      {sortedRecords.map((record) => (
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
      <div className="controls">
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">By default</option>
          <option value="description">By description</option>
          <option value="packed">By packed status</option>
        </select>
        <button className="clear-button" onClick={handleClear}>
          clear
        </button>
      </div>
    </div>
  );
}

export default PackingList;
