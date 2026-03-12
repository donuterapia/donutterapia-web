/**
 * Franchise Page Module
 * Handles: Franchise form submission, success modal
 */

class FranchiseForm {
    constructor() {
        this.form = document.getElementById('franchiseForm');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupFormSubmission();
    }

    /**
     * Handle franchise form submission
     */
    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                nombre: document.querySelector('input[name="nombre"]').value,
                telefono: document.querySelector('input[name="telefono"]').value,
                email: document.querySelector('input[name="email"]').value,
                ciudad: document.querySelector('input[name="ciudad"]').value,
                mensaje: document.querySelector('textarea[name="mensaje"]').value
            };

            // TODO: In future, send to actual backend instead of simulating
            // For now, this simulates submission
            this.submitForm(formData);
        });
    }

    /**
     * Submit form and show success modal
     */
    submitForm(formData) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '✅ ¡Solicitud Enviada!';
            submitBtn.classList.remove('bg-dt-pink');
            submitBtn.classList.add('bg-green-500');

            // Show success modal
            this.showSuccessModal(formData.nombre);

            // Reset form after showing modal
            setTimeout(() => {
                this.form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-green-500');
                submitBtn.classList.add('bg-dt-pink');
            }, 3000);
        }, 2000);
    }

    /**
     * Show success modal
     */
    showSuccessModal(firstName) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-gradient-to-br from-dt-pink to-rose-500 rounded-2xl p-8 max-w-md w-full animate-scaleIn">
                <div class="text-center">
                    <div class="text-5xl mb-4">🍩</div>
                    <h2 class="text-2xl font-bold text-white mb-2">¡Gracias ${firstName}!</h2>
                    <p class="text-white/90 mb-6">
                        Tu solicitud de franquicia ha sido recibida. 
                        Nos pondremos en contacto pronto.
                    </p>
                    <button onclick="this.closest('.fixed').remove()" class="bg-white text-dt-pink px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Auto close after 5 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5000);
    }
}

// Initialize if on franchise page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('franchiseForm')) {
            window.franchiseForm = new FranchiseForm();
        }
    });
} else {
    if (document.getElementById('franchiseForm')) {
        window.franchiseForm = new FranchiseForm();
    }
}
