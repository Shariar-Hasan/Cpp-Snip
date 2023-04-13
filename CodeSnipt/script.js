const releaseItemTag = document.querySelector("#releaseItems");
const socialItemTag = document.querySelector("#social");
const scrollItemTag = document.querySelector("#scrollToTop");
const tableOfContentItemTag = document.querySelector("#table-of-content");
const contentDetailsItemTag = document.querySelector("#contents-with-detail");

// version history section
fetch("./jsons/versionHistory.json")
  .then((res) => res.json())
  .then((versions) => {
    versions
      .sort((a, b) => -1)
      .forEach((version) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="release-box">
            <h5>Released version ${version.version} - ${
          version.date
        } <span class="h6">${version.updates.map(
          (i) => "<br> -" + i
        )}</span></h5>
        </div>
        `;
        releaseItemTag.appendChild(li);
      });
  });

// contact icon section
fetch("./jsons/contacts.json")
  .then((res) => res.json())
  .then((contacts) => {
    contacts.forEach((contact) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a class="link social-icon" href=${contact.link} target="_blank">
            <i class="${contact.icon}" title=${contact.contact} aria-hidden="true"></i>
        </a>
        `;
      socialItemTag.appendChild(li);
    });
  });

// contact table of content section
fetch("./jsons/contentTable.json")
  .then((res) => res.json())
  .then((contents) => {
    contents.forEach((content) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="#${content.link}" class="link">
          <h5 onclick="showContent(\'${content.json}\', \'${content.name}\')">${content.name}</h5>
        </a>
        `;
      tableOfContentItemTag.appendChild(li);
    });
  });

// scroll to top section
const scrollToTop = () => {
  window.scrollTo({ top: 10, behavior: "smooth" });
};
document.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollItemTag.classList.add("visible");
  } else {
    scrollItemTag.classList.remove("visible");
  }
});

// banner typewriter section
new Typewriter("#typewriter", {
  strings: [
    "Welcome to Cpp Snip CP Website",
    "Feel Free to browse<br>through the documentation",
  ],
  autoStart: true,
  delay: 80,
  deleteSpeed: 30,
  pauseFor: 2000,
  loop: true,
});

const showContent = (jsonFile, contentName) => {
  fetch(`./../vscode/${jsonFile}`)
    .then((res) => res.json())
    .then((items) => {
      console.log(items);
      let tbody = "";
      Object.keys(items).forEach((key) => {
        tbody += `
        <tr>
          <td>${items[key].prefix}</td>
          <td>${items[key].description}</td>
        </tr>
        `;
      });
      contentDetailsItemTag.innerHTML = `
      <h4 class="heading">${contentName}</h4>
        <table class="table text-white table-borderless">
          <thead class="bg-dark">
            <tr>
              <th class="col-4">KEY</th>
              <th class="col-8">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            ${tbody}
          </tbody>
      </table>
      `;
    });
};
