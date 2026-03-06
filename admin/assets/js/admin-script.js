/**
 * Apex Admin Panel - Utility Functions
 * Handles common admin panel functionality
 */

const AdminPanel = {
    // Initialize admin panel
    init: function() {
        this.setupSidebar();
        this.setupForms();
        this.setupModals();
        this.setupAlerts();
        this.setupTabs();
        this.setupImageUpload();
    },

    // Sidebar navigation
    setupSidebar: function() {
        const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't prevent default for actual navigation
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Set active link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        sidebarLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentPage)) {
                link.classList.add('active');
            }
        });
    },

    // Form handling
    setupForms: function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form
                if (!AdminPanel.validateForm(form)) {
                    AdminPanel.showAlert('Please fill all required fields', 'danger');
                    return;
                }

                // Simulate form submission
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                console.log('Form submitted:', data);
                AdminPanel.showAlert('Form submitted successfully! (API will be connected later)', 'success');
                
                // Reset form after 1 second
                setTimeout(() => {
                    form.reset();
                }, 1000);
            });
        });
    },

    // Validate form
    validateForm: function(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                // Skip checkboxes for now
                return;
            }
            
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger)';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        return isValid;
    },

    // Modal management
    setupModals: function() {
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        
        modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal-overlay');
                AdminPanel.closeModal(modal);
            });
        });

        // Close modal on background click
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    AdminPanel.closeModal(this);
                }
            });
        });
    },

    openModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    },

    closeModal: function(modal) {
        if (modal) {
            modal.classList.remove('active');
        }
    },

    // Alert system
    setupAlerts: function() {
        const alertCloseButtons = document.querySelectorAll('.alert-close');
        
        alertCloseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.alert').remove();
            });
        });
    },

    showAlert: function(message, type = 'info') {
        const alertContainer = document.querySelector('.alerts-container') || 
            document.createElement('div');
        
        if (!alertContainer.classList.contains('alerts-container')) {
            alertContainer.className = 'alerts-container';
            alertContainer.style.position = 'fixed';
            alertContainer.style.top = '20px';
            alertContainer.style.right = '20px';
            alertContainer.style.zIndex = '3000';
            alertContainer.style.maxWidth = '400px';
            document.body.appendChild(alertContainer);
        }

        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            danger: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };

        alert.innerHTML = `
            <i class="${icons[type] || icons.info} alert-icon"></i>
            <span>${message}</span>
            <button type="button" class="alert-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        alertContainer.appendChild(alert);

        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);

        // Setup close button
        alert.querySelector('.alert-close').addEventListener('click', function() {
            alert.remove();
        });
    },

    // Tab handling
    setupTabs: function() {
        const tabButtons = document.querySelectorAll('.tab-button');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remove active from all buttons and contents
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });

                // Add active to clicked button and corresponding content
                this.classList.add('active');
                const content = document.getElementById(tabName);
                if (content) {
                    content.classList.add('active');
                }
            });
        });

        // Auto-activate first tab
        const firstTab = document.querySelector('.tab-button');
        if (firstTab) {
            firstTab.classList.add('active');
            const tabName = firstTab.getAttribute('data-tab');
            const firstContent = document.getElementById(tabName);
            if (firstContent) {
                firstContent.classList.add('active');
            }
        }
    },

    // Image upload handling
    setupImageUpload: function() {
        const uploadAreas = document.querySelectorAll('.image-upload-area');
        
        uploadAreas.forEach(area => {
            const input = area.querySelector('input[type="file"]');
            const preview = area.nextElementSibling;

            // Click to upload
            area.addEventListener('click', () => {
                input.click();
            });

            // Drag and drop
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--primary)';
                area.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            });

            area.addEventListener('dragleave', () => {
                area.style.borderColor = '';
                area.style.backgroundColor = '';
            });

            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.style.borderColor = '';
                area.style.backgroundColor = '';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    input.files = files;
                    AdminPanel.handleImageUpload(input, preview);
                }
            });

            // File input change
            if (input) {
                input.addEventListener('change', () => {
                    AdminPanel.handleImageUpload(input, preview);
                });
            }
        });
    },

    handleImageUpload: function(input, preview) {
        const files = input.files;
        
        if (preview) {
            // Clear existing previews
            preview.innerHTML = '';

            // Add new previews
            for (let file of files) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const div = document.createElement('div');
                    div.className = 'image-preview';
                    div.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="image-remove">
                            <i class="fas fa-times"></i>
                        </button>
                    `;

                    div.querySelector('.image-remove').addEventListener('click', () => {
                        div.remove();
                    });

                    preview.appendChild(div);
                };

                reader.readAsDataURL(file);
            }
        }

        AdminPanel.showAlert(`${files.length} image(s) uploaded successfully`, 'success');
    },

    // Table row actions
    setupTableActions: function() {
        const editButtons = document.querySelectorAll('.btn-edit');
        const deleteButtons = document.querySelectorAll('.btn-delete');

        editButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const id = this.getAttribute('data-id');
                window.location.href = `edit-car.html?id=${id}`;
            });
        });

        deleteButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to delete this item?')) {
                    AdminPanel.showAlert('Item deleted successfully', 'success');
                    this.closest('tr').remove();
                }
            });
        });
    },

    // Logout
    logout: function() {
        // Clear any auth data
        localStorage.removeItem('adminToken');
        window.location.href = 'login.html';
    },

    // Get URL parameters
    getUrlParam: function(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    },

    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Format date
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-AE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        AdminPanel.init();
    });
} else {
    AdminPanel.init();
}
