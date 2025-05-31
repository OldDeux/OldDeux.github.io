document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("taskInput");
  const button = document.getElementById("addTaskBtn");

  let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

  // Renderiza cards salvos
  tasks.forEach(task => createCard(task.text, task.status));

  button.addEventListener("click", () => {
    const text = input.value.trim();
    if (text) {
      createCard(text, "em-aberto");
      tasks.push({ text, status: "em-aberto" });
      updateStorage();
      input.value = "";
    }
  });

  function createCard(text, status) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("draggable", true);
    card.textContent = text;

    const btn = document.createElement("button");
    btn.textContent = "X";
    card.appendChild(btn);

    document.getElementById(status).appendChild(card);

    // Drag and drop
    card.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", text);
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    // Remover tarefa
    btn.addEventListener("click", () => {
      card.remove();
      tasks = tasks.filter(t => !(t.text === text && t.status === status));
      updateStorage();
    });
  }

  // Permitir drop nas colunas
  const containers = document.querySelectorAll(".card-container");
  containers.forEach(container => {
    container.addEventListener("dragover", e => e.preventDefault());

    container.addEventListener("drop", e => {
      e.preventDefault();
      const text = e.dataTransfer.getData("text/plain");
      const sourceCard = [...document.querySelectorAll(".card")].find(c => c.textContent.includes(text));

      const newStatus = container.id;
      const oldStatus = tasks.find(t => t.text === text)?.status;

      if (sourceCard && newStatus !== oldStatus) {
        container.appendChild(sourceCard);
        const task = tasks.find(t => t.text === text);
        if (task) task.status = newStatus;
        updateStorage();
      }
    });
  });

  function updateStorage() {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }
});
