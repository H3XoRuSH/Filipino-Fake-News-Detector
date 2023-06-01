chrome.contextMenus.onClicked.addListener(sendHighlight);

chrome.contextMenus.create({
  id: "Faker",
  title: "Fake or Not",
  contexts: ["selection"],
});

function sendHighlight(info) {
  const highlightedText = info.selectionText;
  const requestData = { data: highlightedText };

  fetch("https://faker-1-x8868933.deta.app/text", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.fake);
      let base = data.fake ? "fake" : "not"; 
      let link = base + ".html";
      chrome.tabs.create({ url: link });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}