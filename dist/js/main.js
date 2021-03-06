"strict-mode";
function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}
$(document).ready(function () {
  const names = [],
    codesDB = [];
  let selected_site_names = [];
  let selected_site_coords = [];
  let ES_site = [];
  let alarm_text;
  let codeNOES = [];
  let coords = [];

  $.getJSON("data.json", function (json) {
    for (let i = 0; i < Object.keys(json).length; i++) {
      names[i] = json[i].name;
      codesDB[i] = json[i].code;
      coords.push([json[i].lat, json[i].long]);
    }
  });
  ////////////////////////////////////////////////////////////
  document.getElementsByClassName("alarm-form")[0].style.top = "0";
  document.getElementsByClassName("contact-form")[0].style.top = "-1000px";
  // document.getElementsByClassName("setting-form")[0].style.top = "-1000px";
  $(".nav-item").click(function () {
    selectedID = this.id;
    if (!$(this).hasClass("active")) {
      $(".nav-item").removeClass("active");
      $(this).addClass("active");
      ///////////////
      // $(".nav-item").each(function () {
      //   if (this.id === selectedID) {
      //     animToggler(this.parent);
      //   }
      // });
      ///////////////
      if (this.id == "main-page") {
        animToggler($(".alarm-form")[0], true);
        animToggler($(".contact-form")[0], false);
      }
      if (this.id == "contact-us") {
        animToggler($(".alarm-form")[0], false);
        animToggler($(".contact-form")[0], true);
      }
    }
  });
  function animToggler(item, visibility) {
    // item.style.top = item.style.top == "-1000px" ? 0 : "-1000px";
    if (visibility == true) {
      item.style.top = "0";
    } else {
      item.style.top = "-1000px";
    }
  }
  /////////////////////////////////////////////////////////
  document.getElementById("fullscreen").addEventListener("click", function () {
    if (document.getElementById("title").style.display == "none") {
      document.getElementById("title").style.display = "block";
      document.getElementById("footer").style.display = "block";
      document.getElementById("side-menu").style.display = "block";
      document
        .getElementById("main-grid")
        .style.setProperty(
          "grid-template-areas",
          '"main main main main main main header" "main main main main main main menu" "main main main main main main menu" "main main main main main main footer"',
          "important"
        );
      this.textContent = "???";
    } else {
      document.getElementById("main-grid").style.gridTemplateAreas = '"main"';
      document.getElementById("title").style.display = "none";
      document.getElementById("footer").style.display = "none";
      document.getElementById("side-menu").style.display = "none";
      this.textContent = "???";
    }
  });
  /////////////////////////////////////////////////////////
  function auto_grow(element) {
    console.log(element.style.height);
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }
  ////////////////////////////////////////////////////////////
  //auto-complete of alarms field
  $(function () {
    const alarmtags = [
      "AC Fail",
      "???????? ????????",
      "???????? Uplink",
      "???????? ????????",
      "AC Fail - Module Fail",
      "Module Fail",
      "Module Fail>2",
      "AC Fail - Module Fail - Module Fail>2",
      "AC Phase Loss",
      "AC Undervoltage",
      "RF Unit Maintenance Link Failure",
      "High Temperature",
      "NE Is Disconnected",
      "Power supply DC Output Out Of Range",
      "Low Battery",
      "Door Open",
      "Battery Low Voltage",
      "???????? GSM",
      "???????? LTE",
      "Cell Logical Channel Failure",
      "Battery Disconnect",
      "VSWR - BAND:BBBB - SECTOR:Y - MAIN/DIVER - Value: X.Y",
      "Battery Fan Failure",
    ];

    const nametags = [
      "???????? ??????????",
      "???????? ????????",
      "???????? ????????",
      "???????? ???????????? ??????",
      "???????? ??????????????????",
      "???????? ????????????????",
      "???????? ???????? ??????",
      "???????? ????????????",
      "???????? ??????",
      "???????? ????????????",
      "???????? ??????????",
      "???????? ????????????",
      "???????? ????????????",
      "???????? ??????????????",
      "???????? ??????????",
      "???????? ??????????????",
      "???????? ??????????",
      "???????? ??????????",
      "???????? ????????????",
      "???????? ??????????????????",
      "???????? ????????????????",
      "???????? ????????????",
      "???????? ??????????????????",
      "???????? ???????? ????????",
    ];
    const moretags = [
      "???????? ?????? ??????????",
      "???????? ????????",
      "PM-SITE",
      "???? ?????? ????????????",
      "?????????????????? ???????? ????????????",
      "?????????? ??????????????",
      "CR#Number - ?????????? - ???? ???????? XX ?????? YY - ?????????? ??????????: XXXX",
    ];
    $("#alarminput").autocomplete({
      source: alarmtags,
    });
    $("#rep_to").autocomplete({
      source: nametags,
    });
    $("#more").autocomplete({
      source: moretags,
    });
  });
  ///////////////////////////////
  function copyToClipboard(str) {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    navigator.clipboard.writeText(el.value);
    document.body.removeChild(el);
  }
  ////////////////////////////////////////////////////////////////
  function preview_Maker() {
    // codesite = document.getElementById("site_code").value;
    reportedto = document.getElementById("rep_to").value;
    monitoring = document.getElementById("monitoring").value;
    more_inf = document.getElementById("more").value;
    time = document.getElementById("time").value;

    DatabaseMaker();
    //creates text
    text_maker();
  }
  ////////////////////////////////////////////////////////////////
  function DatabaseMaker() {
    codesite = document.getElementById("site_code").value;
    codeNOES = codesite.trim().split(/\s+/);
    codeNOES = [...new Set(codeNOES)];
    ES_site = codeNOES.map((site) => `ES${site}`);

    //Checks site codesDB and returns corresponding names and coords
    let found;
    ES_site.forEach(function (site) {
      found = codesDB.findIndex((el) => el == site);
      if (found != -1) {
        selected_site_names.push(names[found]);
        selected_site_coords.push(coords[found]);
      } else {
        selected_site_coords.push([null, null]);
        selected_site_names.push("???? ???????? ????????????/?????????????????");
      }
    });
  }
  document.getElementById("clear").addEventListener("click", function () {
    // document.getElementById("site_code").value = "";
    textfield_ClearEffect("site_code");
    textfield_ClearEffect("alarminput");
    textfield_ClearEffect("more");
    textfield_ClearEffect("rep_to");
    textfield_ClearEffect("time");
  });

  function textfield_ClearEffect(str) {
    document.getElementById(`${str}`).style.backgroundColor = "red";
    setTimeout(() => {
      //Run after specified time has passed
      document.getElementById(`${str}`).style.backgroundColor = "#e4ebf5";
    }, 500);
    document.getElementById(`${str}`).value = "";
  }

  // when clicking preview button:
  document.getElementById("preview").addEventListener("click", function () {
    preview_Maker();
  });

  function text_maker() {
    let today = new Date()
      .toLocaleDateString("fa-IR")
      .replace(/([??-??])/g, (token) =>
        String.fromCharCode(token.charCodeAt(0) - 1728)
      );
    seperator = today.split("/");
    today = `${seperator[0]}/${seperator[1].padStart(
      2,
      "0"
    )}/${seperator[2].padStart(2, "0")}`;
    ///////////////////////////////////////////////
    let str = "";
    site_list = `${(function nametocode_appender() {
      for (let i = 0; i < selected_site_names.length; i++) {
        str += `${selected_site_names[i]} - ${codeNOES[i]}\n`;
      }
      return str;
    })()}`;
    // Now preparing the final text
    //////////////////ALARM////////////////////////
    alarm_name = document.getElementById("alarminput").value;
    ///////////////////////////////////////////////
    info_list = `${(function info_visibility() {
      if (!more_inf) {
        //when no inf
        return "";
      } else {
        return `${more_inf}\n`;
      }
    })()}`;
    ///////////////////////////////////////////////
    reportedto = `${(function reportedto_visibility() {
      if (!reportedto) {
        //when no reporting
        return "";
      } else {
        return `?????????? ???? ${reportedto}\n`;
      }
    })()}`;
    //////////////////////////////////////////////////
    siteha = `${(function siteha() {
      if (codeNOES.length < 2) {
        return "????????: ";
      } else {
        return `???????? ??????:\n`;
      }
    })()}`;
    ////////////////////////////////////////////////
    time_stamp = `${(function time_stamper() {
      return `${time}`;
    })()}`;
    ////////////////////////////////////////////////
    IsMonitorong = `${(function IsMonitorong() {
      return `${monitoring}`;
    })()}`;

    ////////////////////////////////////////////////
    if (!codesite.trim()) {
      site_list = "?????????????? ???????? ???????? ??????.\n";
    }
    alarm_text = `${today}\n${siteha}${site_list}??????????: ${alarm_name}
???????? ??????????: ${time_stamp}
${info_list}${reportedto}${monitoring}`;

    document.getElementById("pre_modal").textContent = alarm_text;
    document.getElementById("copybutton").textContent = "?????? ????????";
    $("#prev-modal").modal();
    clearCache();
  }

  function clearLocalStorage() {
    window.localStorage.clear();
    // window.localStorage.removeItem("codesites");
    // window.localStorage.removeItem("coords");
  }
  function writeLocalStorage() {
    // clearLocalStorage();
    localStorage.setItem("codesites", ES_site);
    localStorage.setItem("coords", selected_site_coords);
    localStorage.setItem("names", selected_site_names);
  }
  function clearCache() {
    selected_site_names.length = 0;
    selected_site_coords.length = 0;
    ES_site.length = 0;
  }
  document.getElementById("copybutton").addEventListener("click", function () {
    copyToClipboard(alarm_text);
    document.getElementById("copybutton").textContent = "?????? ????";
    document.getElementById("copybutton").style.color = "green";
    document.getElementById("copybutton").classList.add("btn-pressed");
    setTimeout(() => {
      $("#prev-modal").modal("toggle");
    }, 1000);
  });
  $("#prev-modal").on("hidden.bs.modal", function () {
    document.getElementById("copybutton").classList.remove("btn-pressed");
  });
  // Map
  document.getElementById("showonmap").addEventListener("click", function () {
    DatabaseMaker();
    clearLocalStorage();
    writeLocalStorage();
    clearCache();
    window.open("Map.html");
  });

  // Ideas:

  async function QuoteFetch() {
    try {
      const fetchedData = await fetch("https://api.quotable.io/random");
      const quote = fetchedData.json().then(function (data) {
        document.getElementById(
          "quote-text"
        ).textContent = `${data.content}(${data.author})`;
        // document.getElementById("quote-author").textContent = data.author;
      });
    } catch (err) {
      console.log(err);
    }
  }
  QuoteFetch();
});
