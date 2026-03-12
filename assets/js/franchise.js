// Franchise Page JavaScript

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Animate counter numbers
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
                counter.classList.add('count-up');
            }
        };
        
        updateCount();
    });

    // Franchise form submission
    const franchiseForm = document.getElementById('franchiseForm');
    if (franchiseForm) {
        franchiseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                nombre: document.querySelector('input[name="nombre"]').value,
                telefono: document.querySelector('input[name="telefono"]').value,
                email: document.querySelector('input[name="email"]').value,
                ciudad: document.querySelector('input[name="ciudad"]').value,
                mensaje: document.querySelector('textarea[name="mensaje"]').value
            };
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Show success message
            setTimeout(() => {
                submitBtn.innerHTML = '✅ ¡Solicitud Enviada!';
                submitBtn.classList.remove('bg-dt-pink');
                submitBtn.classList.add('bg-green-500');
                
                // Show success modal
                showSuccessModal(formData.nombre);
                
                // Reset form after showing modal
                setTimeout(() => {
                    franchiseForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-green-500');
                    submitBtn.classList.add('bg-dt-pink');
                }, 3000);
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Success modal
function showSuccessModal(firstName) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-gradient-to-br from-dt-pink to-rose-500 rounded-2xl p-8 max-w-md w-full animate-scaleIn">
            <div class="text-center">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="font-konigsberg text-3xl text-white mb-4">¡Gracias, ${firstName}!</h3>
                <p class="text-white mb-6">
                    Tu solicitud de franquicia ha sido recibida. Nuestro equipo revisará tu información y te contactará en las próximas 24 horas.
                </p>
                <div class="bg-white/20 rounded-xl p-4 mb-6">
                    <p class="text-white text-sm">
                        <strong>Próximos Pasos:</strong><br>
                        1. Revisión inicial por nuestro equipo<br>
                        2. Llamada de presentación programada<br>
                        3. Revisión de documentación
                    </p>
                </div>
                <button class="modal-close bg-white text-dt-pink px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                    ¡Entendido!
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes countUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes successPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .count-up {
        animation: countUp 0.8s ease-out;
    }
    
    .success-pulse {
        animation: successPulse 0.6s ease-in-out;
    }
`;
document.head.appendChild(style);
