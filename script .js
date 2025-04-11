
function addTask() {
    const taskName = document.getElementById("taskInput").value;
    const color = document.getElementById("Dropdown").value;

   

    const list = document.getElementById("checkboxList");

   
    list.appendChild(label);

    // Clear inputs
    document.getElementById("taskInput").value = "";
    document.getElementById("Dropdown").value = "";

    updateCount();
  }

  function updateCount() {
    const totalTasks = document.querySelectorAll("#checkboxList input[type='checkbox']").length;
    document.getElementById("taskCount").textContent = `Total Tasks: ${totalTasks}`;
  }
      const label = document.createElement("label");
      label.style.color = color;
      label.innerHTML = `<input type="checkbox" /> ${taskName}`;
      label.style.fontSize = "20px";
      label.style.marginBottom = "10px";
  
      // Add the checkbox to the list
      const list = document.getElementById("checkboxList");
  