import React from 'react'

const Button = ({ type }) => {
    return (
        <div className="relative">
            {
                type === 'Intern' ? (
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer flex items-center"

                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Internship
                    </button>
                ) : (
                    <button
                        id="export-button"
                        onClick={() => {
                            const menu = document.getElementById('export-menu');
                            if (menu) {
                                menu.classList.toggle('hidden');
                            }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer flex items-center"
                    >
                        <i className="fas fa-download mr-2"></i>
                        Export
                    </button>

                )

            }

            {/* Export Menu */}
            <div
                id="export-menu"
                className="hidden absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >

                <div className="p-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                        <select
                            id="export-format"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="csv">CSV</option>
                            <option value="excel">Excel</option>
                            <option value="pdf">PDF</option>
                        </select>
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Export Scope</label>
                        <select
                            id="export-scope"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Applications</option>
                            <option value="selected">Selected Applications Only</option>
                            <option value="filtered">Current Filtered Results</option>
                        </select>
                    </div>


                    <button
                        id="start-export-button"
                        onClick={async () => {
                            const menu = document.getElementById('export-menu');
                            const formatSelect = document.getElementById('export-format');
                            const scopeSelect = document.getElementById('export-scope');
                            const format = formatSelect?.value || 'csv';
                            const scope = scopeSelect?.value || 'all';

                            // if (menu) {
                            //     menu.classList.add('hidden');
                            // }

                            const button = document.getElementById('start-export-button');
                            if (button) {
                                const icon = button.querySelector('i');
                                if (icon) {
                                    icon.className = 'fas fa-spinner fa-spin mr-2';
                                }
                                button.disabled = true;
                            }

                            try {
                                // Simulating export delay
                                await new Promise(resolve => setTimeout(resolve, 1500));

                                // Show success toast
                                const toast = document.createElement('div');
                                toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
                                toast.textContent = `Export started successfully! Format: ${format.toUpperCase()}, Scope: ${scope}`;
                                document.body.appendChild(toast);

                                // Remove toast after 3 seconds
                                setTimeout(() => {
                                    toast.remove();
                                }, 3000);
                            } finally {
                                if (button) {
                                    const icon = button.querySelector('i');
                                    if (icon) {
                                        icon.className = 'fas fa-file-export mr-2';
                                    }
                                    button.disabled = false;
                                    menu.classList.add('hidden');

                                }
                            }
                        }}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer flex items-center justify-center"
                    >
                        <i className="fas fa-file-export mr-2"></i>
                        Start Export
                    </button>



                </div>
            </div>
        </div>

    )
}

export default Button
