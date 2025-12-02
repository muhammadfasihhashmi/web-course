function PackingList({ records }) {
  console.log(records);

  return (
    <div className="list-container">
      {records.map((record) => (
        <p>{record.item}</p>
      ))}
    </div>
  );
}

export default PackingList;
