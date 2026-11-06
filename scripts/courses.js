const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed:  true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed:  true  },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed:  true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const creditCounter = document.querySelector("#credit-counter");
const filterButtons = document.querySelectorAll(".filter-button");

function displayCourses(filter = "all") {
  const visibleCourses = filter === "all"
    ? courses
    : courses.filter(course => course.subject === filter);

  courseList.replaceChildren();
  visibleCourses.forEach(course => {
    const item = document.createElement("div");
    item.className = `course-item${course.completed ? " completed" : ""}`;
    item.textContent = `${course.subject} ${course.number}`;
    item.title = `${course.title} (${course.credits} credits)${course.completed ? " — Completed" : ""}`;
    courseList.append(item);
  });

  creditCounter.textContent = visibleCourses.reduce((total, course) => total + course.credits, 0);
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(other => {
      const selected = other === button;
      other.classList.toggle("selected", selected);
      other.setAttribute("aria-pressed", String(selected));
    });
    displayCourses(button.dataset.filter);
  });
});

displayCourses();
