// Clean address row layout for testing
<div style={{
  display: "flex",
  alignItems: "flex-start", 
  gap: "16px",
  width: "100%",
  flexWrap: "nowrap"
}}>
  {/* Address */}
  <div style={{ flex: "1", minWidth: "200px" }}>
    <label>Address (Street Number and Name)</label>
    <input type="text" style={{ width: "100%" }} />
  </div>
  
  {/* Apt Number */}
  <div style={{ width: "120px", flexShrink: 0 }}>
    <label>Apt Number</label>
    <input type="text" style={{ width: "100%" }} />
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
      <input type="checkbox" />
      <span>Check if not applicable</span>
    </div>
  </div>
  
  {/* City or Town */}
  <div style={{ width: "120px", flexShrink: 0 }}>
    <label>City or Town</label>
    <input type="text" style={{ width: "100%" }} />
  </div>
</div>
