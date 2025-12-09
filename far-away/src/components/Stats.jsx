function Stats({ records }) {
  const packedItems = records.filter((record) => record.isPacked === true);

  const percent = Math.round((packedItems.length / records.length) * 100);

  if (records.length === 0) return <footer>🌈 Let's get packing! ✨</footer>;

  if (records.length === packedItems.length)
    return <footer>you all packed up 🧳 and ready to go 🏝️ !!</footer>;

  return (
    <footer className="footer">
      {`💼 You have ${records.length} items on your list, and you already
        packed ${packedItems.length} items, ${
        packedItems.length > 0 ? `(${percent}%)` : ""
      }`}
    </footer>
  );
}

export default Stats;
