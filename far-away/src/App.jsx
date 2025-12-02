import React, { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PackingList from "./components/PackingList";

function App() {
  const [records, setRecords] = useState([]);

  return (
    <div className="app">
      <Header />
      <Form setRecords={setRecords} />
      <PackingList records={records} />
    </div>
  );
}

export default App;
