//Loads up the collections from storage
function load_collections() {
  chrome.storage.sync.get(null, function(items) {
    for (key in items) {
      var addCol = document.createElement('option');
      addCol.innerHTML = key;
      var allCollections = document.getElementById('collection');
      allCollections.appendChild(addCol);
    }
  });
}

// Saves options to chrome.storage for a single name-urls pair
function save_options() {

  //All the collections
  var e = document.getElementById("collection");
  var name, selectedCol;

  //New Collection
  if (e.selectedIndex == 0) {
    name = document.getElementById('inputname').value;
    selectedCol = document.createElement('option');
    selectedCol.innerHTML = name;
    e.appendChild(selectedCol);
    e.selectedIndex = e.length - 1;

  } else {
    selectedCol = e.options[e.selectedIndex];
    name = selectedCol.text;
  }

  var save = {
    [name]: document.getElementById('urls').value
  };

  chrome.storage.sync.set(save);
}

// Restores relevant state using the preferences stored in chrome.storage each time the select element is changed
function restore_options() {

  //For the selected collection collection, restore options
  var e = document.getElementById("collection");
  var selectedCol = e.options[e.selectedIndex];
  var existingName = selectedCol.text;

  chrome.storage.sync.get([existingName], function(items) {
    console.log("the items key is: " + items[existingName]);
    console.log("the existing name is " + existingName);
    document.getElementById("urls").value = items[existingName];
    document.getElementById("inputname").value = existingName;
  });
}

document.addEventListener('load', load_collections());
document.getElementById('delete').addEventListener('click', function() {
  var e = document.getElementById("collection");
  var selectedCol = e.options[e.selectedIndex];
  var existingName = selectedCol.text;
  chrome.storage.sync.remove([existingName]);
  e.selectedIndex = 0;
  e.removeChild(selectedCol);
  restore_options();
});
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('collection').addEventListener('change', restore_options);
