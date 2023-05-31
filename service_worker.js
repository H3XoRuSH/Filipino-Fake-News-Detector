chrome.contextMenus.onClicked.addListener(sendHighlight);

chrome.contextMenus.create({
  id: "Faker",
  title: "Fake or Not",
  contexts: ["selection"],
});

function sendHighlight(info) {
  const highlightedText = info.selectionText;
  const requestData = { data: highlightedText };

  fetch("http://127.0.0.1:5000/post", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);

      var link = data.message + ".html";
      chrome.tabs.create({ url: link });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}