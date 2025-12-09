import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

function App() {
  const [records, setRecords] = useState([]);

  function handleDelete(id) {
    setRecords(records.filter((record) => record.id !== id));
  }

  function handlePackedStatus(id) {
    setRecords(
      records.map((record) =>
        record.id === id ? { ...record, isPacked: !record.isPacked } : record
      )
    );
  }

  function handleClear() {
    setRecords([]);
  }
  return (
    <div className="app">
      <Header />
      <Form setRecords={setRecords} />
      <PackingList
        records={records}
        handleDelete={handleDelete}
        handlePackedStatus={handlePackedStatus}
        handleClear={handleClear}
      />

      <Stats records={records} />
    </div>
  );
}

export default App;
