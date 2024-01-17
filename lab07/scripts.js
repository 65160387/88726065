// เมื่อเอกสาร HTML ถูกโหลดเสร็จแล้ว
document.addEventListener("DOMContentLoaded", function () {
    // รับอ้างอิงขององค์ประกอบที่จำเป็น
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");

    // อาร์เรย์สำหรับเก็บรายการ Todo
    let todos = [];

    // เพิ่มรายการ Todo
    function addTodo() {
        // ดึงข้อความจาก input และตัดช่องว่างที่ไม่จำเป็น
        const todoText = todoInput.value.trim();

        // ตรวจสอบว่า todoText ไม่ใช่ช่องว่าง
        if (todoText !== "") {
            // สร้างออบเจ็กต์รายการ Todo
            const todoItem = {
                text: todoText,
                completed: false,
            };

            // เพิ่มรายการ Todo ลงในอาร์เรย์
            todos.push(todoItem);

            // รีเซ็ตค่า input เป็นค่าว่าง
            todoInput.value = "";

            // แสดงรายการ Todo ใหม่
            renderTodoList();
        }
    }

    // ลบรายการ Todo
    function deleteTodo(index) {
        // ใช้เมธอด splice เพื่อลบรายการที่ index ออกจากอาร์เรย์
        todos.splice(index, 1);

        // แสดงรายการ Todo ใหม่
        renderTodoList();
    }

    // ตรวจสอบ/ยกเลิกการเสร็จสิ้นรายการ Todo
    function toggleComplete(index) {
        // เปลี่ยนสถานะการเสร็จสิ้นของรายการ Todo ที่ index
        todos[index].completed = !todos[index].completed;

        // แสดงรายการ Todo ใหม่
        renderTodoList();
    }

    // แสดงรายการ Todo บนหน้าเว็บ
    function renderTodoList() {
        // เคลียร์รายการ Todo ทั้งหมดใน HTML
        todoList.innerHTML = "";

        // วนลูปผ่านรายการทั้งหมดในอาร์เรย์
        for (let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];

            // สร้าง <li> สำหรับแสดงข้อความ Todo
            const listItem = document.createElement("li");
            listItem.textContent = todoItem.text;

            // ตรวจสอบว่า Todo เสร็จสิ้นหรือไม่
            if (todoItem.completed) {
                listItem.classList.add("completed");
            }

            // สร้างปุ่ม Delete
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            deleteButton.addEventListener("click", () => deleteTodo(i));

            // สร้างปุ่ม Complete/Undo
            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
            completeButton.addEventListener("click", () => toggleComplete(i));

            // เพิ่มปุ่ม Delete และ Complete/Undo ลงใน <li>
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            // เพิ่ม <li> ลงใน <ul>
            todoList.appendChild(listItem);
        }
    }

    // การกดปุ่ม "เพิ่ม"
    addButton.addEventListener("click", addTodo);

    // การกด Enter ใน input
    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // แสดงรายการ Todo ครั้งแรกที่โหลดหน้าเว็บ
    renderTodoList();
});
