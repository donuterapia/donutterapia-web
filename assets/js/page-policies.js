/**
 * Policies Page Module
 * Handles: Policy accordion, print functionality
 */

class PolicyAccordion {
    constructor() {
        this.init();
    }

    init() {
        this.setupAccordion();
        this.setupPrintButton();
    }

    /**
     * Policy accordion - expand/collapse functionality
     */
    setupAccordion() {
        const policyQuestions = document.querySelectorAll('.policy-question');
        
        policyQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const content = question.nextElementSibling;
                const icon = question.querySelector('span:last-child');

                if (!content) return;

                // Toggle current content
                content.classList.toggle('open');

                // Update icon
                if (content.classList.contains('open')) {
                    icon.textContent = '−';
                } else {
                    icon.textContent = '+';
                }
            });
        });
    }

    /**
     * Enhance print functionality
     */
    setupPrintButton() {
        window.addEventListener('beforeprint', () => {
            const printStyle = document.createElement('style');
            printStyle.textContent = `
                @media print {
                    header, footer, .policy-nav, .back-to-top, .print-button {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                        color: black !important;
                    }
                    .policy-section {
                        page-break-inside: avoid;
                    }
                }
            `;
            document.head.appendChild(printStyle);
        });
    }
}

// Initialize if on policies page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.policy-question')) {
            window.policyAccordion = new PolicyAccordion();
        }
    });
} else {
    if (document.querySelector('.policy-question')) {
        window.policyAccordion = new PolicyAccordion();
    }
}
