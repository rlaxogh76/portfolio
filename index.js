// 텍스트 타이핑 효과
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.isDeleting = false;
  this.isFirst = true;
  this.tick();
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  if (this.isFirst) {
    this.el.innerHTML = '<span class="wrap">' + fullTxt + "</span>";
  } else {
    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
  }

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    if (this.isFirst) {
      this.isFirst = false;
    }
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

const sidebar = document.querySelector(".side-bar");
const icon = document.querySelectorAll(".side-bar__icon-1 > div");

if (sidebar) {
  sidebar.addEventListener("mouseover", () => {
    console.log("Sidebar hovered"); // 디버깅용 로그
    icon[0].style.transform = "translateX(41%)";
    icon[1].style.transform = "rotate(45deg)";
    icon[2].style.transform = "rotate(-45deg)";
  });

  sidebar.addEventListener("mouseout", () => {
    console.log("Sidebar unhovered"); // 디버깅용 로그
    icon[0].style.transform = "translateX(0)";
    icon[1].style.transform = "rotate(0)";
    icon[2].style.transform = "rotate(0)";
  });
} else {
  console.error("Sidebar element not found");
}

// 메뉴 클릭 시 부드러운 스크롤 이동
document.querySelectorAll(".menu-text a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작 중지
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const yOffset = -160; // 10rem = 160px 상단 패딩 보정
      const yPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 부모 요소 선택
  const parentTargets = document.querySelectorAll("#project-section");

  // 관찰 옵션 설정
  const observerOptions = {
    root: null, // 뷰포트 기준
    rootMargin: "0px", // 뷰포트와의 여백
    threshold: 0.1, // 10% 이상 화면에 나타나면 표시
  };

  // IntersectionObserver 생성
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 화면에 들어오면 'visible' 클래스 추가
        entry.target.classList.add("visible");
      } else {
        // 화면에서 벗어나면 'visible' 클래스 제거
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  // 각 부모 요소에 대해 관찰자 등록
  parentTargets.forEach((parent) => {
    parent.classList.add("fade-in-out"); // 초기 상태 추가
    observer.observe(parent); // 관찰 시작
  });
});

// 페이지 로드 시 초기 상태 설정
document.addEventListener("DOMContentLoaded", () => {
  const miniTitle = document.querySelector("#mini-title");
  if (miniTitle) {
    miniTitle.style.opacity = "1"; // 초기 표시 설정
  }
});

const observerOptions = {
  root: null, // 기본 뷰포트
  rootMargin: "0px 0px -20% 0px", // 하단 20% 영역 제외
  threshold: 0.5, // 50% 이상 화면에 나타나야 동작
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      // visible 클래스를 제거하지 않아 깜박임 방지
      // entry.target.classList.remove("visible");
    }
  });
}, observerOptions);
