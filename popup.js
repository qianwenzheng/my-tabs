function load_sites(e) {
  var urlArray;
  chrome.storage.sync.get([e.target.id], function(items) {
    urlArray = items[e.target.id].split('\n');
    console.log(urlArray);
    for (var i = 0; i < urlArray.length; i++) {
      chrome.tabs.create({
        url: urlArray[i]
      });
    }
  })
}

document.addEventListener('DOMContentLoaded', function() {
  var dropdownMenu = document.getElementById('dropdownMenu');
  chrome.storage.sync.get(null, function(items) {
    for (key in items) {
      var collection = document.createElement('a');
      collection.setAttribute('href', '#');
      collection.setAttribute('id', key);
      collection.innerHTML = key;
      dropdownMenu.appendChild(collection);
      console.log(collection.innerHTML);
      collection.addEventListener('click', load_sites);
    }
  });
});
