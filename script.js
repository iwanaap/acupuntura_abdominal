const infoFija = {
    'RN12': {
        funcion: 'Fortalece el estómago, regula el bazo y mejora la digestión.',
        profundidad: 'De 0,5 a 1,0 cun.',
        representacion: 'Se relaciona con el punto maestro del estómago.',
    },
    'RN11': {
        funcion: 'Ayuda a eliminar la retención de líquidos y promueve la digestión.',
        profundidad: 'De 0,5 a 0,8 cun.',
        representacion: 'Corresponde a un punto del canal del Ren Mai.',
    },
    'RN8': {
        funcion: 'Fortalece el yang, regula la digestión y controla la diarrea.',
        profundidad: 'No se punciona, solo moxa.',
        representacion: 'Centro del ombligo, punto importante de energía.',
    },
    // Más puntos con sus datos fijos
};

function mostrarInfo(punto) {
    const cun1 = parseFloat(document.getElementById('text-results').innerText.match(/CUN O-AX: (\d+\.\d+)/)[1]);
    const cun2 = parseFloat(document.getElementById('text-results').innerText.match(/CUN O-BL: (\d+\.\d+)/)[1]);
    const cun3 = parseFloat(document.getElementById('text-results').innerText.match(/CUN O-SP: (\d+\.\d+)/)[1]);

    const infoPuntos = {
        'RN12': `Ubicación: RN12. Se encuentra 4 cun por encima del ombligo, equivalente a ${(4 * cun1).toFixed(2)} cm.`,
        'RN11': `Ubicación: RN11. Se encuentra 3 cun por encima del ombligo, equivalente a ${(3 * cun1).toFixed(2)} cm.`,
        'RN8': 'Ubicación: RN8. Se encuentra en el ombligo.',
        'E25':  `Ubicación: Se encuentra 2 cun lateral al ombligo, equivalente a ${(2 * cun2).toFixed(2)} cm.`,
        'E26':  `Ubicación: Se encuentra 2 cun lateral a la linea media anterior (${(2 * cun2).toFixed(2)} cm) y 1 cun debajo de E25 (${(1 * cun1).toFixed(2)} cm).`,
        // Añadir más puntos según sea necesario.
    };

    const info = infoPuntos[punto] || 'Información no disponible para este punto.';
    const fija = infoFija[punto] || { funcion: 'No disponible', profundidad: 'No disponible', representacion: 'No disponible' };
    // Crear o actualizar una ventana emergente
    let popup = document.getElementById('info-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'info-popup';
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        popup.style.color = 'white';
        popup.style.padding = '20px';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2)';
        popup.style.zIndex = '1000';
        popup.style.textAlign = 'left';

        // Fondo para cerrar al hacer clic fuera del popup
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        overlay.onclick = () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        };

        document.body.appendChild(overlay);
        document.body.appendChild(popup);
    }

    // Agregar el contenido al popup
    popup.innerHTML = `
        <div>${info}</div>
        <p><strong>Función:</strong> ${fija.funcion}</p>
        <p><strong>Profundidad:</strong> ${fija.profundidad}</p>
        <p><strong>Representación:</strong> ${fija.representacion}</p>
        <button id="close-popup" style="margin-top: 10px; padding: 5px 10px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer;">Cerrar</button>
    `;

    // Agregar evento para cerrar al botón
    document.getElementById('close-popup').onclick = () => {
        popup.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    };

    popup.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}




function calcularCUN() {
    const unidad = parseFloat(document.getElementById('unidad').value);
    const medicion1 = parseFloat(document.getElementById('medicion1').value) * unidad;
    const medicion2 = parseFloat(document.getElementById('medicion2').value) * unidad;
    const medicion3 = parseFloat(document.getElementById('medicion3').value) * unidad;

    if (isNaN(medicion1) || isNaN(medicion2) || isNaN(medicion3)) {
        alert('Por favor, complete todas las medidas correctamente.');
        return;
    }

    const cun1 = (medicion1 / 8).toFixed(2);
    const cun2 = (medicion2 / 6).toFixed(2);
    const cun3 = (medicion3 / 5).toFixed(2);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="text-results" id="text-results">
            <p>CUN O-AX: ${cun1}</p>
            <p>CUN O-BL: ${cun2}</p>
            <p>CUN O-SP: ${cun3}</p>
        </div>
    `;

    const ingresoDatosDiv = document.getElementById('ingreso-datos');
    const tortugaDiv = document.getElementById('tortuga');

    ingresoDatosDiv.style.display = 'none';
    tortugaDiv.style.display = 'block';

    crearMapa();
}

function crearMapa() {
    const mapa = document.querySelector('.mapa-tortuga');

    const puntos = [
        { id: 'RN13', top: '2%', left: '47.5%' },
        { id: 'RN12', top: '12%', left: '47.5%' },
        { id: 'RN11', top: '22.5%', left: '47.5%' },
        { id: 'RN10', top: '33%', left: '47.5%' },
        { id: 'RN9', top: '44%', left: '47.5%' },
        { id: 'RN8', top: '54%', left: '47.5%' },
        { id: 'RN7', top: '64.5%', left: '47.5%' },
        { id: 'RN6', top: '70%', left: '47.5%' },
        { id: 'RN5', top: '75%', left: '47.5%' },
        { id: 'RN4', top: '85.5%', left: '47.5%' },
        { id: 'RN3', top: '96%', left: '47.5%' },
        { id: 'E25', top: '54%', sides: ['25.5%', '69.5%'], className: 'punto-estomago' },
        { id: 'E24', top: '44%', sides: ['25.5%', '69.5%'], className: 'punto-estomago' },
        { id: 'E26', top: '64.5%', sides: ['25.5%', '69.5%'], className: 'punto-estomago' },
        { id: 'E27', top: '75%', sides: ['25.5%', '69.5%'], className: 'punto-estomago' },
        { id: 'E28', top: '85.5%', sides: ['25.5%', '69.5%'], className: 'punto-estomago' },
        { id: 'E29', top: '96%', sides: ['25.5%', '69.5%'], className: 'punto-estomago' },
        { id: 'R19', top: '12%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'R18', top: '22.5%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'R17', top: '33%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'R16', top: '54.5%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'R15', top: '65%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'R14', top: '76%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'R13', top: '85.8%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'R12', top: '96.5%', sides: ['42.3%', '53.5%'], className: 'punto-riñon' },
        { id: 'Ab1', top: '37.8%', sides: ['20%', '76.5%'], className: 'punto-ab' },
        { id: 'Ab2', top: '44%', sides: ['14%', '83%'], className: 'punto-ab' },
        { id: 'Ab3', top: '33%', sides: ['14%', '83%'], className: 'punto-ab' },
        { id: 'Ab4', top: '70%', sides: ['20%', '76.5%'], className: 'punto-ab' },
        { id: 'Ab5', top: '70%', sides: ['31%', '64%'], className: 'punto-ab' },
        { id: 'Ab6', top: '75%', sides: ['14%', '83%'], className: 'punto-ab' },
        { id: 'Ab7', top: '70%', sides: ['42.3%', '53.5%'], className: 'punto-ab' },
        { id: 'Ab8', top: '70%', sides: ['36.8%', '59%'], className: 'punto-ab' },
        // Añadir más puntos aquí con coordenadas proporcionales
    ];

    mapa.innerHTML = ''; // Limpiar contenido previo

    puntos.forEach(punto => {
        if (punto.sides) {
            // Generar dos puntos para bilaterales
            punto.sides.forEach((side, index) => {
                const divPunto = document.createElement('div');
                divPunto.classList.add('punto');
                if (punto.className) divPunto.classList.add(punto.className);
                divPunto.style.top = punto.top;
                divPunto.style.left = side;
                divPunto.textContent = `${punto.id}`;
                divPunto.onclick = () => mostrarInfo(punto.id);
                mapa.appendChild(divPunto);
            });
        } else {
            const divPunto = document.createElement('div');
            divPunto.classList.add('punto');
            if (punto.className) divPunto.classList.add(punto.className); // Aplica la clase
            divPunto.style.top = punto.top;
            divPunto.style.left = punto.left;
            divPunto.textContent = punto.id;
            divPunto.onclick = () => mostrarInfo(punto.id);
            mapa.appendChild(divPunto);
        }
    });
}
