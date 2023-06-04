chrome.contextMenus.onClicked.addListener(sendHighlight);

chrome.contextMenus.create({
  id: "Faker",
  title: "Fake or Not",
  contexts: ["selection"],
});

function sendHighlight(info) {
  const highlightedText = info.selectionText;
  const requestData = { data: highlightedText };

  fetch("http://127.0.0.1:8000/api/text", {
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
      if (data.is_fake == 1) {
        base = "fake";
      }
      if (data.is_fake == 2) {
        base = "invalid";
      }
      let link = base + ".html";
      chrome.tabs.create({ url: link });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}