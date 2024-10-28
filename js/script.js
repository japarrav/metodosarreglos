// Array inicial de tareas
let tareas = [
    { id: 16, descripcion: 'Hacer mercado', completada: false },
    { id: 60, descripcion: 'Estudiar para la prueba', completada: false },
    { id: 89, descripcion: 'Sacar a pasear a Tobby', completada: false }
];

// Elementos del DOM
const nuevaTareaInput = document.getElementById('nuevaTarea');
const agregarTareaBtn = document.getElementById('agregarTarea');
const tareasBody = document.getElementById('tareasBody');
const totalSpan = document.getElementById('total');
const realizadasSpan = document.getElementById('realizadas');

// Función para generar un ID único
function generarId() {
    return Math.floor(Math.random() * 100);
}

// Función para actualizar el resumen
function actualizarResumen() {
    totalSpan.textContent = tareas.length;
    realizadasSpan.textContent = tareas.filter(tarea => tarea.completada).length;
}

// Función para renderizar las tareas
function renderizarTareas() {
    tareasBody.innerHTML = '';
    
    tareas.forEach(tarea => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${tarea.id}</td>
            <td class="${tarea.completada ? 'tarea-completada' : ''}">${tarea.descripcion}</td>
            <td>
                <input type="checkbox" ${tarea.completada ? 'checked' : ''} 
                    onchange="toggleTarea(${tarea.id})">
                <button class="eliminar" onclick="eliminarTarea(${tarea.id})">×</button>
            </td>
        `;
        tareasBody.appendChild(tr);
    });
    
    actualizarResumen();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    const descripcion = nuevaTareaInput.value.trim();
    if (descripcion) {
        const nuevaTarea = {
            id: generarId(),
            descripcion: descripcion,
            completada: false
        };
        tareas.push(nuevaTarea);
        nuevaTareaInput.value = '';
        renderizarTareas();
    }
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderizarTareas();
}

// Función para marcar/desmarcar una tarea como completada
function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizarTareas();
    }
}

// Event listeners
agregarTareaBtn.addEventListener('click', agregarTarea);
nuevaTareaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Renderizar tareas iniciales
renderizarTareas();