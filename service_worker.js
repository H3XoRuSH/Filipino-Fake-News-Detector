chrome.contextMenus.onClicked.addListener(sendHighlight);

chrome.contextMenus.create({
  id: "Faker",
  title: "Fake or Not",
  contexts: ["selection"],
});

function sendHighlight(info) {
  const highlightedText = info.selectionText;
  const requestData = { data: highlightedText };

  fetch("http://localhost:8000/api/text", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json"
    }
  })

  .then(response => response.json())

  .then(data => {
    console.log(data.is_fake);
    let base = "not" ;
    let detector = data.is_fake;
    if (detector == 1) {
      base = "fake";
    }
    if (detector == 2) {
      base = "invalid";
    }
    let link = base + ".html";
    chrome.tabs.create({ url: link });
  })

  .catch(error => {
    console.error("Error:", error);
  });
  
}