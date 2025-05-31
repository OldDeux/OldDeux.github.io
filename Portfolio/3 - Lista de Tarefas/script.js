document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("taskInput");
    const addButton = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Adicionar nova tarefa
    addButton.addEventListener("click", function () {
        const taskText = input.value.trim();
        if (taskText !== "") {
            createTaskElement(taskText);
            input.value = "";
        } else {
            alert("Por favor, digite uma tarefa.");
        }
    });

    // Função para criar elemento de tarefa no DOM
    function createTaskElement(taskText) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remover";
        removeBtn.addEventListener("click", function () {
            taskDiv.remove();
        });

        taskDiv.appendChild(taskContent);
        taskDiv.appendChild(removeBtn);
        taskList.appendChild(taskDiv);
    }
});
