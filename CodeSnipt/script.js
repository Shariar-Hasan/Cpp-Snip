const releaseItemTag = document.querySelector("#releaseItems");
const socialItemTag = document.querySelector("#social");
const scrollItemTag = document.querySelector("#scrollToTop");
const tableOfContentItemTag = document.querySelector("#table-of-content");
const contentDetailsItemTag = document.querySelector("#contents-with-detail");
const codeShowItemTag = document.querySelector("#codeShow");

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
        <span class="link click-pointer">
          <h5 onclick="showContent(\'${content.json}\', \'${content.name}\')">${content.name}</h5>
        </span>
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

const showContent = (jsonFile, contentName) => {
  fetch(`./../vscode/${jsonFile}`)
    .then((res) => res.json())
    .then((items) => {
      let tbody = "";
      Object.keys(items).forEach((key) => {
        tbody += `
        <tr  class="click-pointer" title="Click to View More"   onclick="codeShow(\'${jsonFile}\', \'${contentName}\', \'${key}\')">
          <td data-toggle="modal" data-target=".bd-example-modal-lg"><kbd>${items[key].prefix}</kbd></td>
          <td>${items[key].description}</td>
        </tr>
        `;
      });
      contentDetailsItemTag.innerHTML = `
      <h4 class="heading">${contentName}</h4>
        <table class="table text-white table-borderless">
          <thead class="bg-dark">
            <tr>
              <th class="col-4">Prefix</th>
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
// show code of the prefix
// const codeShow = (prefix, description, body, contentName) => {
const codeShow = (jsonFile, contentName, key) => {
  console.log("f ", key);
  let code = "";
  fetch(`./../vscode/${jsonFile}`)
    .then((res) => res.json())
    .then((items) => {
      console.log(Object.keys(items));
      const { prefix, description, body } =
        items[Object.keys(items).find((k) => k === key)];
      body.forEach((element) => {
        code += `<span class='codeblock'>${element.replace(
          "\t",
          "&emsp;"
        )}</span> <br>`;
      });
      console.log(code);
      codeShowItemTag.innerHTML = `
      <table class="table table-borderless table-dark lead p-5 rounded  w-100">
        <tbody>
          <tr>
            <td class="col-3">Prefix</td>
            <td class="col-9"><kbd>${prefix}<kbd></td>
          </tr>
          <tr>
            <td class="col-3">Section</td>
            <td class="col-9">${contentName}</td>
          </tr>
          <tr>
            <td class="col-3">Description</td>
            <td class="col-9">${description}</td>
          </tr>
          <tr>
            <td class="col-3">Code</td>
            <td class="col-9 language-cpp-parent">
                <code class="language-cpp">
                  ${code}
                </code>
            </td>
          </tr>
          <tr>
            <td class="col-3">Tutorial</td>
            <td class="col-9">
                Not Added YET
            </td>
          </tr>
        </tbody>
      </table>
        `;
      // document.querySelectorAll("span.codeblock").forEach((el) => {
      //   // then highlight each
      //   hljs.highlightElement(el, {language : "cpp"});
      // });
    });
};
