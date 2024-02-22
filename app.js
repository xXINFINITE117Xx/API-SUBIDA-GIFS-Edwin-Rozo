const apiKey = "1Yr6NC6BgkDbgE4SHeLgfOx6YD29HANq";
const searchInput = document.getElementById("search-bar");
const gifContainer = document.getElementById("gif-container");

searchInput.addEventListener("input", mustunce(searchGifs, 300));

async function searchGifs() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    gifContainer.innerHTML = ""; 
    return;
  }

  try {
    const endpoint = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=10`;
    const response = await fetch(endpoint);
    const data = await response.json();

    showGifs(data.data);
  } catch (error) {
    console.error("Error to search gifs:", error);
  }
}

function showGifs(gifs) {
  gifContainer.innerHTML = "";

  gifs.forEach((gif) => {
    const img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    img.classList.add("gif");
    gifContainer.appendChild(img);
  });
}


function mustunce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
async function showRandomGifs() {
  try {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
    const response = await fetch(endpoint);
    const data = await response.json();

    showGifs(data.data);
  } catch (error) {
    console.error("Error to fetch random gifs:", error);
  }
}


window.addEventListener("load", showRandomGifs);
